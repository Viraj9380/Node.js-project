class EmailProviderMock {
    constructor(name) {
        this.name = name;
        this.failureRate = 0.2; // 20% failure rate
    }

    send(email) {
        return new Promise((resolve, reject) => {
            if (Math.random() > this.failureRate) {
                console.log(`Email sent successfully via ${this.name}`);
                resolve(true);
            } else {
                console.log(`Email sending failed via ${this.name}`);
                reject(new Error(`Failed to send email via ${this.name}`));
            }
        });
    }
}

module.exports = EmailProviderMock;
