var axios = require("axios");
const _ = require("lodash");
const minAge = 45;
const FEE_TYPE = "Free"; // leave empty to search both free and paid
const PINCODE = 248001;
const DATE = "10-05-2021";

const showResult = (data, callback) => {
  const filteredList = [];
  _.map(data.centers, (row) => {
    if (!FEE_TYPE || row.fee_type === FEE_TYPE) {
      _.map(row.sessions, (sec) => {
        if (sec.min_age_limit == minAge) {
          filteredList.push({
            name: row.name,
            address: row.address,
            fee_type: row.fee_type,
            ...sec,
          });
        }
      });
    }
  });
  console.info(`${filteredList.length} ${FEE_TYPE} slots found`);
  return filteredList;
};
const fetchCalender = async (pincode, date, callback) => {
  var config = {
    method: "get",
    url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}`,
    headers: {
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      accept: "application/json",
      Referer: "https://apisetu.gov.in/public/marketplace/api/cowin",
      DNT: "1",
      "Accept-Language": "hi_IN",
      "sec-ch-ua-mobile": "?0",
      "User-Agent": "Chrome",
    },
  };
  try {
    const response = await axios(config);
    return {
      status: 200,
      data: response.data,
    };
  } catch (err) {
    return {
      status: 500,
      err,
    };
  }
};

const execScript = async () => {
  const { status, data, err } = await fetchCalender(PINCODE, DATE);
  let message = "Success";
  let listOfCenters;
  if (status == 200) listOfCenters = showResult(data);
  else message = err;
  return {
    status,
    body: message,
  };
};
exports.handler = async (event) => {
  return await execScript();
};
