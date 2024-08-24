const EmailService = require('./EmailService');
const EmailProviderMock = require('./EmailProviderMock');

// Mock providers
const provider1 = new EmailProviderMock('Provider1');
const provider2 = new EmailProviderMock('Provider2');

// Create Email Service
const emailService = new EmailService([provider1, provider2]);

// Example email
const email = {
    id: 'email_1',
    to: 'viraj.kulkarni2003@gmail.com',
    subject: 'Test Email',
    body: 'This is a test email.'
};

// Send email
emailService.sendEmail(email);
