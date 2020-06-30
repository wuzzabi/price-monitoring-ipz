import * as nodemailer from 'nodemailer'
import 'dotenv/config'

export default class MailService {
    private _transporter: nodemailer.Transporter

    constructor() {
        this._transporter = nodemailer.createTransport(
            `smtps://econd.monitoring%40gmail.com:v93DVvUsnnznytbpOxHW@smtp.gmail.com`
        )
    }

    public async sendVerificationMail(email: string, url: string) {
        let options: nodemailer.SendMailOptions = { 
            from: `${process.env.EMAIL_USERNAME}`,
            to: email,
            subject: 'Verify Signup',
            text: `Click on this link to verify:\n\n${url}\n\n`,
            html: `<p>Click on this link to verify:</p><p>${url}</p>`
        }

        this._transporter.sendMail(options)
    }

    public async sendNewPassword(email: string, password: string) {
        let options: nodemailer.SendMailOptions = { 
            from: `${process.env.EMAIL_USERNAME}`,
            to: email,
            subject: 'New password',
            text: `Your password has been changed.\n\nNew password: ${password}\n\n`,
            html: `<p>Your password has been changed.</p><p>New password: <b>${password}</b></p>`
        }

        this._transporter.sendMail(options)
    }

    public sendMail(to: string, subject: string, content: string) { 
        let options: nodemailer.SendMailOptions = { 
            from: `${process.env.EMAIL_USERNAME}`,
            to: to,
            subject: subject,
            text: content
        }
        
        this._transporter.sendMail(options)
      }
}