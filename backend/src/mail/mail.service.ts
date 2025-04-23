// // src/mail/mail.service.ts
// import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class MailService {
//   private transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'jemilshikuri00@gmail.com',
//       pass: 'xblq pmxx kkzl xgtg', // Use Gmail App Password if 2FA is on
//     },
//   });

//   async sendMail(to: string, subject: string, text: string) {
//     await this.transporter.sendMail({
//       from: '"MS League" jemilshikuri00@gmail.com',
//       to,
//       subject,
//       text,
//     });
//   }

//   async sendApprovalEmail(to: string) {
//     await this.sendMail(to, 'Registration Approved', '🎉 Your registration has been approved. You can now log in.');
//   }

//   async sendRejectionEmail(to: string) {
//     await this.sendMail(to, 'Registration Rejected', '😞 Sorry, your registration has been rejected.');
//   }
// }























// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jemilshikuri00@gmail.com',
      pass: 'xblq pmxx kkzl xgtg', // Use Gmail App Password if 2FA is on
    },
  });

  // Helper method for sending emails
  private async sendMail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: '"MS League" jemilshikuri00@gmail.com',
      to,
      subject,
      text,
    });
  }

  // User Registration Emails (keep existing)
  async sendApprovalEmail(to: string) {
    await this.sendMail(to, 'Registration Approved', '🎉 Your registration has been approved. You can now log in.');
  }

  async sendRejectionEmail(to: string) {
    await this.sendMail(to, 'Registration Rejected', '😞 Sorry, your registration has been rejected.');
  }

  // Event Registration Emails (new - similar style)
  async sendEventApprovalEmail(to: string, eventTitle: string) {
    await this.sendMail(
      to, 
      'Event Registration Approved',
      `🎉 Your registration for "${eventTitle}" has been approved.`
    );
  }

  async sendEventRejectionEmail(to: string, eventTitle: string) {
    await this.sendMail(
      to, 
      'Event Registration Not Approved',
      `😞 Sorry, your registration for "${eventTitle}" has not been approved.`
    );
  }

  async sendEventRegistrationEmail(to: string, eventTitle: string) {
    await this.sendMail(
      to, 
      'Event Registration Received',
      `We've received your registration for "${eventTitle}". We'll review it and notify you soon.`
    );
  }
}