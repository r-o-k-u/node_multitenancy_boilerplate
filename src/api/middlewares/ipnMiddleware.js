const organizationsDataProvider = require("../services/organization/organizations_dataprovider");
const { errorHelper, ipHelper } = require("../../utils/index");
const dbConnector = require("../../db/index");
const dbRepo = require("../../db/models");
const { db } = require("../../config/index");
const common = require("../../utils/common");
const organization_service = require("../../api/services/organization/organizations_service");

module.exports = async (request, res, next) => {
  console.log("received mpesa request", request.body);
  //console.log(JSON.stringify(request.body, null, 2));

  let paymentMode = "MPESA";

  /*{
      "TrxID": "PEQ0EGF87A",
      "Amount": "1.00",
      "ShortCode": "565656",   PAYBILL NUMBER
      "RefNumber": "OL/368917",  //accountNumber//student/adm number
      "MobileNumber": "254720117033",
      "FirstName": null
  }*/

  // TODO CHECK IF REQUEST is from MPESA/ EQUITY / AIRTEL / ANY OTHER BANK IPN

  try {
    let paymentData = request.body;

    const payment = {
      id: paymentData.RefNumber,
      phoneNumber: paymentData.MobileNumber,
      amount: paymentData.Amount,
    };

    request.payment = payment;

    next();
  } catch (error) {
    console.error("Payments:CONTROLLER:Callback => ", error);
    throw error;
  }
};
