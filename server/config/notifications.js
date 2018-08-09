const nodemailer = require('nodemailer');
const CONFIG = require('./config');

// US

const notifyLessThanUS = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume less than 500,000</strong> that impacts <strong>LS US</strong> has been created!</p>'

    // An array of attachments
    // attachments: [
    //     // String attachment
    //     {
    //         filename: 'notes.txt',
    //         content: 'Some notes about this e-mail',
    //         contentType: 'text/plain' // optional, would be detected from the filename
    //     },
    //
    //     // Binary Buffer attachment
    //     {
    //         filename: 'image.png',
    //         content: Buffer.from(
    //             'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
    //                 '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
    //                 'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
    //             'base64'
    //         ),
    //
    //         cid: 'note@example.com' // should be as unique as possible
    //     },
    //
    //     // File Stream attachment
    //     {
    //         filename: 'nyan cat ✔.gif',
    //         path: __dirname + '/assets/nyan.gif',
    //         cid: 'nyan@example.com' // should be as unique as possible
    //     }
    // ]
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  console.log('email info: ', nodemailer.getTestMessageUrl(info));
  transporter.close();
}
module.exports.notifyLessThanUS = notifyLessThanUS

const notifyGreaterThanUS = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume greater than 500,000</strong> that impacts <strong>LS US</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyGreaterThanUS = notifyGreaterThanUS

 // UK AU

const notifyLessThanUKAU = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  // TODO: will notify David Taylor
  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume less than 500,000</strong> that impacts <strong>LS UK/AU</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyLessThanUKAU = notifyLessThanUKAU

const notifyGreaterThanUKAU = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume greater than 500,000</strong> that impacts <strong>LS UK/AU</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyGreaterThanUKAU = notifyGreaterThanUKAU


// CoreSource

const notifyGreaterThanCoreSource = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume greater than 500,000</strong> that impacts <strong>LS UK/AU</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyGreaterThanCoreSource = notifyGreaterThanCoreSource

const notifyLessThanCoreSource = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume less than 500,000</strong> that impacts <strong>CoreSource</strong> has been created.</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyLessThanCoreSource = notifyLessThanCoreSource

// CMS

const notifyGreaterThanCMS = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume greater than 500,000</strong> that impacts <strong>CMS</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyGreaterThanCMS = notifyGreaterThanCMS

const notifyLessThanCMS = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume less than 500,000</strong> that impacts <strong>CMS</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyLessThanCMS = notifyLessThanCMS


// EOM

const notifyGreaterThanEOM = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume greater than 500,000</strong> that impacts <strong>EOM</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyGreaterThanEOM = notifyGreaterThanEOM

const notifyLessThanEOM = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume less than 500,000</strong> that impacts <strong>EOM</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyLessThanEOM = notifyLessThanEOM

// SparkGlobal

const notifyGreaterThanSparkGlobal = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume greater than 500,000</strong> that impacts <strong>SparkGlobal</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyGreaterThanSparkGlobal = notifyGreaterThanSparkGlobal

const notifyLessThanSparkGlobal = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume less than 500,000</strong> that impacts <strong>SparkGlobal</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyLessThanSparkGlobal = notifyLessThanSparkGlobal

// WEBADMIN

const notifyGreaterThanWebAdmin = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume greater than 500,000</strong> that impacts <strong>WebAdmin</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyGreaterThanWebAdmin = notifyGreaterThanWebAdmin

const notifyLessThanWebAdmin = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume less than 500,000</strong> that impacts <strong>WebAdmin</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyLessThanWebAdmin = notifyLessThanWebAdmin


// AERIO

const notifyGreaterThanAerio = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume greater than 500,000</strong> that impacts <strong>Aerio</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyGreaterThanAerio = notifyGreaterThanAerio

const notifyLessThanAerio = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume less than 500,000</strong> that impacts <strong>Aerio</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyLessThanAerio = notifyLessThanAerio


// DMS

const notifyGreaterThanDMS = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume greater than 500,000</strong> that impacts <strong>DMS</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyGreaterThanDMS = notifyGreaterThanDMS

const notifyLessThanDMS = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume less than 500,000</strong> that impacts <strong>DMS</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyLessThanDMS = notifyLessThanDMS

// Other

const notifyGreaterThanOther = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume greater than 500,000</strong> that impacts <strong>Other (Insights, IQ, IPage)</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyGreaterThanOther = notifyGreaterThanOther

const notifyLessThanOther = async function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: CONFIG.email_user,
      pass: CONFIG.email_pw
    },
    tls: { rejectUnauthorized: false }
  });

  let message = {
    to: 'Stephen Szpak <srszpak@live.com>',
    subject: 'Email sent from Project Tracker API',
    html: '<p>A project with a <strong>volume less than 500,000</strong> that impacts <strong>Other (Insights, IQ, IPage)</strong> has been created!</p>'
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  transporter.close();
}
module.exports.notifyLessThanOther = notifyLessThanOther
