const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// POST /api/contact
router.post(
    '/',
    [
        body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
        body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
        body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { name, email, message } = req.body;

        try {
            // Save to MongoDB
            const contact = await Contact.create({ name, email, message });

            // Send email via Nodemailer
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
                to: process.env.EMAIL_TO || process.env.EMAIL_USER,
                replyTo: email,
                subject: `New Portfolio Message from ${name}`,
                html: `
          <div style="font-family: Inter, sans-serif; max-width: 600px; margin: auto; padding: 24px; background: #12121a; color: #e2e8f0; border-radius: 12px;">
            <h2 style="color: #6c63ff;">New Message from Portfolio</h2>
            <p><strong style="color:#00f5d4;">Name:</strong> ${name}</p>
            <p><strong style="color:#00f5d4;">Email:</strong> ${email}</p>
            <p><strong style="color:#00f5d4;">Message:</strong></p>
            <p style="background:#0a0a0f; padding:16px; border-radius:8px; border-left:3px solid #6c63ff;">${message}</p>
            <p style="font-size:12px; color:#64748b; margin-top:24px;">Sent from portfolio contact form • ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
        `,
            });

            res.status(201).json({
                success: true,
                message: 'Message received! I will get back to you soon.',
                data: { id: contact._id },
            });
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;
