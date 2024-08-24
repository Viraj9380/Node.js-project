# Resilient Email Sending Service

## Overview
This is a resilient email sending service implemented in JavaScript. It uses two mock email providers with fallback, retry logic with exponential backoff, idempotency, and rate limiting.

### Features
- **Retry Mechanism**: Retries sending the email with exponential backoff in case of failures.
- **Fallback Mechanism**: Switches to the next provider if the current one fails.
- **Idempotency**: Prevents duplicate sends of the same email.
- **Rate Limiting**: Limits the number of emails sent per minute.
- **Status Tracking**: Tracks the status of each email send attempt.

### Bonus Features
- **Circuit Breaker Pattern**: Prevents repeated calls to a failing provider.
- **Simple Logging**: Logs every action and decision.
- **Basic Queue System**: Queues emails when rate limit is hit and processes them later.

## Setup
1. Clone the repository.
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Run the example: `node src/index.js`

## Assumptions
- The email service is intended for demonstration and testing purposes.
- Mock providers are used instead of actual email sending providers.
- Rate limiting is set to 5 emails per minute.

## Unit Tests
Unit tests are provided using Jest. Run them with `npm test`.
