const nodemailer = require("nodemailer");
import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from "../config";

class MailService {
	private transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: SMTP_HOST,
			port: SMTP_PORT,
			secure: false,
			auth: {
				user: SMTP_USER,
				pass: SMTP_PASSWORD,
				ssl: true,
			},
		});
	}

	public sendActivationMail = async (to: string, link: string) => {
		await this.transporter.sendMail({
			from: SMTP_USER,
			to,
			subject: "Account activation on " + process.env.CLIENT_URL,
			text: "",
			html: `
				<div>
					<h1>For account activation follow this link</h1>
					<a href="${link}">${link}</a>
				</div>
			`,
		});
	};
}

export default new MailService();
