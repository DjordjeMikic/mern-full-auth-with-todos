class Mail {
  constructor() {
    this.nodemailer = require('nodemailer');
    this.transport = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    };
  }
  
  // Send mail for password reset
  async sendMail(a, b, c) {
    let transporter = this.nodemailer.createTransport(this.transport);
    let anchor = process.env.HOST + ':' + (process.env.PORT || '3000');
    try {
      let info = await transporter.sendMail({
        from: 'Site name',
        to: a,
        subject: 'Reset Password Token',
        html: `<div>
            <h4>Your token for password reset:</h4><br />
            <b>${b}</b>
            <p>Type token on following
             <a href=${'http://' + anchor + '/reset-token/' + c} target="_blank">Link</a>
            </p>
          </div>`
      });
      return true;
    } catch(e) {
      return !true;
    }
  }

  // Send mail for account activation
  async register(a, b) {
    let transporter = this.nodemailer.createTransport(this.transport);
    let anchor = process.env.HOST + ':' + (process.env.PORT || '3000');
    try {
      let info = await transporter.sendMail({
        from: 'Site name',
        to: a,
        subject: 'Verify your account',
        html: `<div>
          <h4>Your link fo verification is:</h4>
          <a href="${'http://' + anchor + '/confirm-account/' + b}" target="_blank">Link</a>
        </div>`
      });
      return true;
    } catch(e) {
      return !true;
    }
  }
}

module.exports = Mail;
