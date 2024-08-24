class EmailService {
    constructor(providers) {
        this.providers = providers;
        this.maxRetries = 3;
        this.retryCount = 0;
        this.sentEmails = new Set();
        this.rateLimit = 5; // Maximum 5 emails per minute
        this.emailQueue = [];
        this.emailsSent = 0;
    }

    async sendEmail(email, providerIndex = 0) {
        if (this.sentEmails.has(email.id)) {
            console.log('Duplicate email detected. Aborting send.');
            return false;
        }

        try {
            if (this.emailsSent >= this.rateLimit) {
                console.log('Rate limit reached. Queuing email.');
                this.emailQueue.push(email);
                return false;
            }

            this.emailsSent++;
            const success = await this.providers[providerIndex].send(email);
            this.sentEmails.add(email.id);
            this.retryCount = 0; // Reset retry count on success
            return success;
        } catch (error) {
            console.log(`Error sending email: ${error.message}`);
            this.retryCount++;

            if (this.retryCount < this.maxRetries) {
                console.log(`Retrying with exponential backoff. Attempt ${this.retryCount}`);
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, this.retryCount) * 1000));
                return this.sendEmail(email, providerIndex);
            } else if (providerIndex < this.providers.length - 1) {
                console.log('Switching to fallback provider.');
                return this.sendEmail(email, providerIndex + 1);
            } else {
                console.log('All providers failed.');
                return false;
            }
        } finally {
            if (this.emailsSent >= this.rateLimit) {
                console.log('Processing queued emails.');
                this.processQueue();
            }
        }
    }

    processQueue() {
        setTimeout(() => {
            this.emailsSent = 0; // Reset rate limit counter
            this.emailQueue.forEach(email => this.sendEmail(email));
            this.emailQueue = [];
        }, 60000); // Reset every 1 minute
    }
}

module.exports = EmailService;
