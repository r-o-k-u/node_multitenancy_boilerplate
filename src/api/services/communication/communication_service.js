const {
  communicationDataProvider,
  smsSettingDataProvider,
} = require("./communication_dataprovider");

let SmsService = {
  getSms: async (dbkey, limit, offset) => {
    let smss = await communicationDataProvider.getSms(dbkey, limit, offset);
    return smss;
  },
  findSms: async (dbkey, condition, limit, offset) => {
    let smss = await communicationDataProvider.findSms(dbkey, condition, limit, offset);
    return smss;
  },

  getSms: async (smsId, dbkey) => {
    let sms = await communicationDataProvider.getSms(smsId, dbkey);
    return sms;
  },

  createSms: async (body, dbkey, tenant) => {
    let sms = await communicationDataProvider.createSms(body, dbkey, tenant);
    return sms;
  },

  updateSms: async (dbkey) => {
    let sms = await communicationDataProvider.updateSms();
    return sms;
  },

  deleteSms: async (smsId, dbkey) => {
    let sms = await communicationDataProvider.deleteSms(smsId, dbkey);
    return sms;
  },
  deactivateSms: async (smsId, dbkey) => {
    let sms = await communicationDataProvider.deactivateSms(smsId, dbkey);
    return sms;
  },

  getSmsTemplate: async (dbkey, limit, offset) => {
    let smss = await communicationDataProvider.getSmsTemplate(dbkey, limit, offset);
    return smss;
  },
  findSmsTemplate: async (dbkey, condition, limit, offset) => {
    let smss = await communicationDataProvider.findSmsTemplate(dbkey, condition, limit, offset);
    return smss;
  },

  getSmsTemplate: async (smsId, dbkey) => {
    let sms = await communicationDataProvider.getSmsTemplate(smsId, dbkey);
    return sms;
  },

  createSmsTemplate: async (body, dbkey) => {
    let sms = await communicationDataProvider.createSmsTemplate(body, dbkey);
    return sms;
  },

  updateSmsTemplate: async (dbkey) => {
    let sms = await communicationDataProvider.updateSmsTemplate();
    return sms;
  },

  deleteSmsTemplate: async (smsId, dbkey) => {
    let sms = await communicationDataProvider.deleteSmsTemplate(smsId, dbkey);
    return sms;
  },
  deactivateSmsTemplate: async (smsId, dbkey) => {
    let sms = await communicationDataProvider.deactivateSmsTemplate(smsId, dbkey);
    return sms;
  },
};

let EmailService = {
  getEmail: async (dbkey, limit, offset) => {
    let emails = await emailDataProvider.getEmail(dbkey, limit, offset);
    return emails;
  },
  findEmail: async (dbkey, condition, limit, offset) => {
    let emails = await emailDataProvider.findEmail(dbkey, condition, limit, offset);
    return emails;
  },

  getEmail: async (emailId, dbkey) => {
    let email = await emailDataProvider.getEmail(emailId, dbkey);
    return email;
  },

  createEmail: async (body, dbkey) => {
    let email = await emailDataProvider.createEmail(body, dbkey);
    return email;
  },

  updateEmail: async (dbkey) => {
    let email = await emailDataProvider.updateEmail();
    return email;
  },

  deleteEmail: async (emailId, dbkey) => {
    let email = await emailDataProvider.deleteEmail(emailId, dbkey);
    return email;
  },
  deactivateEmail: async (emailId, dbkey) => {
    let email = await emailDataProvider.deactivateEmail(emailId, dbkey);
    return email;
  },

  getEmailTemplate: async (dbkey, limit, offset) => {
    let emails = await emailDataProvider.getEmailTemplate(dbkey, limit, offset);
    return emails;
  },
  findEmailTemplate: async (dbkey, condition, limit, offset) => {
    let emails = await emailDataProvider.findEmailTemplate(dbkey, condition, limit, offset);
    return emails;
  },

  getEmailTemplate: async (emailId, dbkey) => {
    let email = await emailDataProvider.getEmailTemplate(emailId, dbkey);
    return email;
  },

  createEmailTemplate: async (body, dbkey) => {
    let email = await emailDataProvider.createEmailTemplate(body, dbkey);
    return email;
  },

  updateEmailTemplate: async (dbkey) => {
    let email = await emailDataProvider.updateEmailTemplate();
    return email;
  },

  deleteEmailTemplate: async (emailId, dbkey) => {
    let email = await emailDataProvider.deleteEmailTemplate(emailId, dbkey);
    return email;
  },
  deactivateEmailTemplate: async (emailId, dbkey) => {
    let email = await emailDataProvider.deactivateEmailTemplate(emailId, dbkey);
    return email;
  },
};
let smsSettingsService = {
  getSms: async (dbkey, limit, offset) => {
    let smsSettings = await smsSettingDataProvider.getSms(null, limit, offset);
    return smsSettings;
  },
  findSms: async (dbkey, condition, limit, offset) => {
    let smsSettings = await smsSettingDataProvider.findSms(null, condition, limit, offset);
    return smsSettings;
  },

  getSms: async (smsSettingId, dbkey) => {
    let smsSetting = await smsSettingDataProvider.getSms(smsSettingId, null);
    return smsSetting;
  },

  createSms: async (body, dbkey) => {
    let smsSetting = await smsSettingDataProvider.createSms(body, null);
    return smsSetting;
  },

  updateSms: async () => {
    let smsSetting = await smsSettingDataProvider.updateSms();
    return smsSetting;
  },

  deleteSms: async (smsSettingId, dbkey) => {
    let smsSetting = await smsSettingDataProvider.deleteSms(smsSettingId, null);
    return smsSetting;
  },
  deactivateSms: async (smsSettingId, dbkey) => {
    let smsSetting = await smsSettingDataProvider.deactivateSms(smsSettingId, null);
    return smsSetting;
  },
};

module.exports = { SmsService, EmailService, smsSettingsService };
