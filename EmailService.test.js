const EmailService = require('../src/EmailService');
const EmailProviderMock = require('../src/EmailProviderMock');

describe('EmailService', () => {
    let emailService;
    let provider1;
    let provider2;

    beforeEach(() => {
        provider1 = new EmailProviderMock('Provider1');
        provider2 = new EmailProviderMock('Provider2');
        emailService = new EmailService([provider1, provider2]);
    });

    test('sends email successfully', async () => {
        const email = { id: 'email_1', to: 'viraj.kulkarni2003@gmail.com' };
        const result = await emailService.sendEmail(email);
        expect(result).toBe(true);
    });

    test('retries and falls back to the next provider', async () => {
        provider1.failureRate = 1; // Make provider1 always fail
        const email = { id: 'email_2', to: 'test2@example.com' };
        const result = await emailService.sendEmail(email);
        expect(result).toBe(true);
    });

    test('prevents duplicate sends', async () => {
        const email = { id: 'email_3', to: 'test3@example.com' };
        await emailService.sendEmail(email);
        const result = await emailService.sendEmail(email);
        expect(result).toBe(false);
    });
});
