"use strict";

const axios = require("axios");
const { SMS_API_KEY, SMS_CLIENT_ID, SMS_SENDER_ID, SMS_ACCESS_KEY } = require("../config/index");
const sendSms = async (body, config) => {
  console.log("config", config);
  const { message, recipients, type, scheduleTime } = body;
  // check if recipients have been well defined
  if (!recipients || !recipients.length) return "Provide an array of valid sms recipients";
  let messageParameters;
  try {
    messageParameters = generateMessageParams(recipients, message);
  } catch (error) {
    return {
      status: "Error",
      message: error.message,
    };
  }

  try {
    console.log("messageParameters", messageParameters);
    const { data: smsResponse } = await axios({
      url: "https://api.onfonmedia.co.ke/v1/sms/SendBulkSMS",
      method: "POST",
      headers: {
        AccessKey: config.AccessKey || SMS_ACCESS_KEY,
      },
      data: {
        SenderId: config.SenderId || SMS_SENDER_ID,
        IsUnicode: true,
        IsFlash: true,
        MessageParameters: messageParameters,
        ApiKey: config.ApiKey || SMS_API_KEY,
        ClientId: config.ClientId || SMS_CLIENT_ID,
      },
    });
    console.log("sms_data", smsResponse);
    return {
      status: 200,
      message: "SMS request processed successfully",
      generatedParams: messageParameters,
      rsponse: smsResponse,
    };
  } catch (error) {
    console.log("error message: ", error.message);
    console.log(
      "error.response: ",
      error.response ? (error.response.data ? error.response.data : error.response) : error
    );
    return { error };
  }
};

const generateMessageParams = (recipients, message, template) => {
  const isSimpleMessage = !!message;
  if (!template && !isSimpleMessage)
    throw new Error("template needs to be provided if message is missing");
  let messageParams = [];
  for (const recipient of recipients) {
    const { phoneNo, personalizations } = recipient;
    if (!isSimpleMessage && !personalizations)
      throw new Error("templated messages require personalization for each recipient");
    let recipientMessageParam;
    if (isSimpleMessage) {
      recipientMessageParam = {
        Number: verifyNumber(phoneNo),
        Text: message,
      };
    } else {
      // generate an array of keys required by template
      const replacerRegEx = new RegExp(/##(.*?)##/);
      let generatedMessage = template;
      do {
        generatedMessage = generatedMessage.replace(
          replacerRegEx,
          (match, p1, p2, p3, offset, string) => {
            // p1: non-alphanumeric match
            const requiredKey = p1;
            const replacerText = personalizations[requiredKey];
            // throw an error if personalization doesn't have the required field
            if (!replacerText) throw new Error(`We couldn\'t find ${requiredKey} for ${phoneNo}`);
            return replacerText;
          }
        );
      } while (replacerRegEx.test(generatedMessage));
      recipientMessageParam = {
        Number: phoneNo,
        Text: generatedMessage,
      };
    }
    messageParams.push(recipientMessageParam);
  }
  return messageParams;
};

const verifyNumber = (n) => {
  n = n + "";
  if (n[0] + n[1] + n[2] === "254") {
    return parseInt(n);
  } else {
    return parseInt("254" + parseInt(n));
  }
};

const getSmsBalance = async () => {
  try {
    const { data: smsResponse } = await axios({
      url: `https://api.onfonmedia.co.ke/v1/sms/Balance?ApiKey=${SMS_API_KEY}&ClientId=${SMS_CLIENT_ID}`,
      method: "GET",
      headers: {
        AccessKey: SMS_ACCESS_KEY,
      },
    });
    return smsResponse.Data[0];
  } catch (error) {
    console.log("error message: ", error.message);
    console.log(
      "error.response: ",
      error.response ? (error.response.data ? error.response.data : error.response) : error
    );
    return { error };
  }
};

module.exports = { sendSms, getSmsBalance };
