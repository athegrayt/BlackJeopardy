const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const receiptTemplate = require('../services/emailTemplates/receiptTemplate');

const Receipt = mongoose.model('receipts');

module.exports = (app) => {
  app.get('/api/receipts', (req, res)=>{
    res.send('Thanks for voting')
  })
  
  app.post('/api/receipts', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipient } = req.body;

    const receipt = new Receipt({
      title,
      subject,
      body,
      recipient,
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send an email!
    const mailer = new Mailer(receipt, receiptTemplate(receipt));

    try {
      await mailer.send();
      await receipt.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
