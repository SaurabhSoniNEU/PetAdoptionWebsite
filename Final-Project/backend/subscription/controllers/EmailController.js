// controllers/EmailController.js
const EmailService = require('../services/EmailService');
const Email = require('../models/Email');

class EmailController {
  constructor() {
    this.emailService = new EmailService();
  }

  async subscribe(req, res) {
    const { email } = req.body;
    const subscriptionEmail = new Email({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Subscription Confirmation',
      text: 'Thank you for subscribing to our newsletter!',
    });

    try {
      const result = await this.emailService.sendEmail(subscriptionEmail);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = EmailController;
