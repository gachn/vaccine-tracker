var axios = require("axios");
const _ = require("lodash");
const minAge = 45;
const showResult = (data) => {
  const filteredList = [];
  _.map(data.centers, (row) => {
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
  });
  console.info(`${filteredList.length} slots found`);
  console.info(filteredList);
};
const fetchCalender = (pincode, date, callback) => {
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

  axios(config)
    .then(function (response) {
      callback(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
fetchCalender("248001", "10-05-2021", showResult);
