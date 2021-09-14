const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.EMAIL_DOMAIN,
  },
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));
// SEND EMAIL
const user = {
  email: "anitabangali@yahoo.com",
  name: "Anita",
  age: "23",
};
module.exports.sendMail = (user, req, res) => {
nodemailerMailgun
  .sendMail({
    from: "no-reply@example.com",
    to: user.email,
    subject: "Hey you, awesome!",
    template: {
      name: "email.handlebars",
      engine: "handlebars",
      context: user,
    },
  })
  .then((info) => {
    console.log("Response: " + info);
  })
  .catch((err) => {
    console.log("Error: " + err);
    res.redirect(`/pets/${req.params.id}`);
  });
}

