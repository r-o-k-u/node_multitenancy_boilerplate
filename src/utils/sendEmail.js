const { createTransport } = require("nodemailer");
const getText = require("./lang/get-text.js");
const errorHelper = require("./helpers/error-helper.js");
const {
  companyContactEmail,
  SMTP_HOST,
  SMTP_USERNAME,
  SMTP_PASSWORD,
} = require("../config/index.js");

module.exports = async (email, subject, body, lang, type, req, res) => {
  //console.log("companyContactEmail ,SMTP_HOST , SMTP_USERNAME , SMTP_PASSWORD ", companyContactEmail ,SMTP_HOST , SMTP_USERNAME , SMTP_PASSWORD )
  new Promise(async (resolve, reject) => {
    if (!email || !subject || !body || (lang !== "sw" && lang !== "en")) {
      // console.log("email, subject, body, lang", email, subject, body, lang)
      return res.status(400).send(errorHelper("00005", req)).end();
    }
    //console.log("email, subject, body, lang, type, req, res", email, subject, body, lang, type, req, res)
    /*  console.log({
      host: SMTP_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: SMTP_USERNAME, // generated ethereal user
        pass: SMTP_PASSWORD, // generated ethereal password
      },
    }) */
    const emailTransfer = createTransport({
      host: SMTP_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: SMTP_USERNAME, // generated ethereal user
        pass: SMTP_PASSWORD, // generated ethereal password
      },
    });

    const emailInfo = {
      from: SMTP_USERNAME,
      to: email,
      subject: subject,
      html: body,
    };

    try {
      await emailTransfer.sendMail(emailInfo);
      return resolve("Success");
    } catch (err) {
      return reject(err);
    }
  });
};
