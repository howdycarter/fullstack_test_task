import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
 
  async sendMail(email: string, subject: string, message: string) {
    const transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'test123@gmail.com',
        pass: 'qwerty123',
      },
    });

    const mailOptions = {
      from: 'test123@gmail.com',
      to: email,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
  }
}
