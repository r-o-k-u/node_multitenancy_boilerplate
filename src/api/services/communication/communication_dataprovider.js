const dbRepo = require("../../../db/models");
const { db } = require("../../../config/index");
const { sendEmail, sendSms } = require("../../../utils/index");
let communicationDataProvider = {
  getSms: async (dbkey, limit, offset) => {
    const Sms = dbRepo[dbkey].sms_sent;
    return new Promise(function (resolve, reject) {
      Sms.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: [""] },
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  findSms: async (dbkey, condition, limit, offset) => {
    if (dbkey == null) dbkey = db.database;
    const Sms = dbRepo[dbkey].sms_sent;

    return new Promise(function (resolve, reject) {
      Sms.findAndCountAll({
        where: condition,
        limit,
        offset,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  createSms: async (body, dbkey, tenant) => {
    if (dbkey == null) dbkey = db.database;
    const Sms = dbRepo[dbkey].sms_sent;
    const sms_settings = dbRepo[dbkey].sms_settings;
    return new Promise(async function (resolve, reject) {
      const message = body.message;
      sms_settings
        .findAndCountAll({
          where: { organization_id: tenant.id },
          limit: 10000,
          offset: 0,
        })
        .then(async (data) => {
          let config = {};
          if (data.count > 0) {
            //console.log("data", data.rows[0]);
            config.AccessKey = data.rows[0].api_access_key;
            config.SenderId = data.rows[0].sender_id;
            config.ApiKey = data.rows[0].api_key;
            config.ClientId = data.rows[0].api_secret;
          }
          resolve({});
          await sendSms({ recipients: body.contacts, message }, config).then((response) => {
            if ((response.status = 200)) {
              body.contacts.map((item) => {
                body.status = "processed";
                body.contact = item.phoneNo;
                delete body.contacts;
                Sms.create(body)
                  .then((data) => {
                    resolve([]);
                  })
                  .catch((err) => {
                    console.log("err", err);
                    reject(err);
                  });
              });
            } else {
              body.contacts.map((item) => {
                body.status = "failed";
                body.contact = item.phoneNo;
                delete body.contacts;
                // console.log("bosy", body);
                Sms.create(body)
                  .then((data) => {
                    resolve(data);
                  })
                  .catch((err) => {
                    reject(err);
                  });
              });
            }
          });
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  updateSms: async () => {
    return null;
  },
  deactivateSms: async (smsId, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;

    const Sms = dbRepo[dbkey].sms_outbound;

    return new Promise(function (resolve, reject) {
      Sms.update({ deactivated: true, dateDeactivated: new Date() }, { where: { id: smsId } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteSms: async (smsId, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;

    const Sms = dbRepo[dbkey].sms_outbound;

    return new Promise(function (resolve, reject) {
      Sms.destroy({ where: { id: smsId } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSmsTemplate: async (dbkey, limit, offset) => {
    const SmsTemplate = dbRepo[dbkey].template;
    return new Promise(function (resolve, reject) {
      SmsTemplate.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: [""] },
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  findSmsTemplate: async (dbkey, condition, limit, offset) => {
    if (dbkey == null) dbkey = db.database;
    const SmsTemplate = dbRepo[dbkey].template;

    return new Promise(function (resolve, reject) {
      SmsTemplate.findAndCountAll({
        where: condition,
        limit,
        offset,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },

  createSmsTemplate: async (body, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;
    const SmsTemplate = dbRepo[dbkey || db.database].template;
    return new Promise(function (resolve, reject) {
      SmsTemplate.create(body)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateSmsTemplate: async () => {
    return null;
  },

  deactivateSmsTemplate: async (smsTemplateId, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;

    const SmsTemplate = dbRepo[dbkey].template;

    return new Promise(function (resolve, reject) {
      SmsTemplate.update(
        { deactivated: true, dateDeactivated: new Date() },
        { where: { id: smsTemplateId } }
      )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteSmsTemplate: async (smsTemplateId, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;

    const SmsTemplate = dbRepo[dbkey].template;

    return new Promise(function (resolve, reject) {
      SmsTemplate.destroy({ where: { id: smsTemplateId } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getEmail: async (dbkey, limit, offset) => {
    const Email = dbRepo[dbkey].email;
    return new Promise(function (resolve, reject) {
      Email.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: [""] },
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  findEmail: async (dbkey, condition, limit, offset) => {
    if (dbkey == null) dbkey = db.database;
    const Email = dbRepo[dbkey].email;

    return new Promise(function (resolve, reject) {
      Email.findAndCountAll({
        where: condition,
        limit,
        offset,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },

  createEmail: async (body, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;
    const Email = dbRepo[dbkey || db.database].email;
    return new Promise(function (resolve, reject) {
      Email.create(body)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateEmail: async () => {
    return null;
  },

  deactivateEmail: async (emailId, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;
    const Email = dbRepo[dbkey].email;

    return new Promise(function (resolve, reject) {
      Email.update({ deactivated: true, dateDeactivated: new Date() }, { where: { id: emailId } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteEmail: async (emailId, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;
    const Email = dbRepo[dbkey].email;

    return new Promise(function (resolve, reject) {
      Email.destroy({ where: { id: emailId } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getEmailTemplate: async (dbkey, limit, offset) => {
    const EmailTemplate = dbRepo[dbkey].template;
    return new Promise(function (resolve, reject) {
      EmailTemplate.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: [""] },
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  findEmailTemplate: async (dbkey, condition, limit, offset) => {
    if (dbkey == null) dbkey = db.database;
    const EmailTemplate = dbRepo[dbkey].template;

    return new Promise(function (resolve, reject) {
      EmailTemplate.findAndCountAll({
        where: condition,
        limit,
        offset,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },

  createEmailTemplate: async (body, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;
    const EmailTemplate = dbRepo[dbkey || db.database].template;
    return new Promise(function (resolve, reject) {
      EmailTemplate.create(body)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateEmailTemplate: async () => {
    return null;
  },

  deactivateEmailTemplate: async (emailTemplateId, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;
    const EmailTemplate = dbRepo[dbkey].template;

    return new Promise(function (resolve, reject) {
      EmailTemplate.update(
        { deactivated: true, dateDeactivated: new Date() },
        { where: { id: emailTemplateId } }
      )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteEmailTemplate: async (emailTemplateId, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;
    const EmailTemplate = dbRepo[dbkey].template;

    return new Promise(function (resolve, reject) {
      EmailTemplate.destroy({ where: { id: emailTemplateId } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
let smsSettingDataProvider = {
  getSms: async (dbkey, limit, offset) => {
    const Sms = dbRepo[dbkey].sms_settings;
    return new Promise(function (resolve, reject) {
      Sms.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: [""] },
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  findSms: async (dbkey, condition, limit, offset) => {
    if (dbkey == null) dbkey = db.database;
    const Sms = dbRepo[dbkey].sms_settings;

    return new Promise(function (resolve, reject) {
      Sms.findAndCountAll({
        where: condition,
        limit,
        offset,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  createSms: async (body, dbkey) => {
    if (dbkey == null) dbkey = db.database;
    console.log("d", dbkey);
    const Sms = dbRepo[dbkey].sms_settings;
    return new Promise(async function (resolve, reject) {
      Sms.create(body)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateSms: async () => {
    return null;
  },
  deactivateSms: async (smsId, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;

    const Sms = dbRepo[dbkey].sms_settings;

    return new Promise(function (resolve, reject) {
      Sms.update({ deactivated: true, dateDeactivated: new Date() }, { where: { id: smsId } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteSms: async (smsId, dbkey) => {
    dbkey == null ? (dbkey = db.database) : dbkey;

    const Sms = dbRepo[dbkey].sms_settings;

    return new Promise(function (resolve, reject) {
      Sms.destroy({ where: { id: smsId } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
module.exports = { communicationDataProvider, smsSettingDataProvider };
