const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const router = express.Router();

// 5 messages per IP per hour is plenty for a real person.
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many messages. Please try again in an hour.' },
});

const escapeHtml = s =>
    String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const mailer =
    process.env.EMAIL_USER && process.env.EMAIL_PASS
        ? nodemailer.createTransport({
              service: 'gmail',
              auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
          })
        : null;

// POST /api/contact
router.post(
    '/',
    limiter,
    [
        body('name').isString().trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
        body('email').isString().trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
        body('message').isString().trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.array()[0].msg });
        }
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ success: false, message: 'The server is waking up. Please email me directly.' });
        }

        const { name, email, message } = req.body;
        try {
            const contact = await Contact.create({ name, email, message });

            // The message is already saved, so a mail failure shouldn't fail the request.
            if (mailer) {
                mailer
                    .sendMail({
                        from: `"Portfolio" <${process.env.EMAIL_USER}>`,
                        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
                        replyTo: email,
                        subject: `Portfolio message from ${name.slice(0, 60)}`,
                        text: `${name} <${email}>\n\n${message}`,
                        html: `<p><b>${escapeHtml(name)}</b> &lt;${escapeHtml(email)}&gt;</p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
                    })
                    .catch(err => console.error('Mail failed:', err.message));
            }

            res.status(201).json({ success: true, message: 'Thanks, I got your message.', data: { id: contact._id } });
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;
