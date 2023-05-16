const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
		
			port: 587,
			secure: false,
			auth: {
				user: "team1btlpython@gmail.com",
				pass: "ijqdqosdmjaupmym",
			},
		});

		await transporter.sendMail({
			from: "team1btlpython@gmail.com",
			to: email,
			subject: subject,
			html: text
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
