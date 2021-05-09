const _ = require("lodash");

module.exports.run = ({ title, filteredList }) => {
  let htmlStart =
    "<table width='100%' cellpadding='0' cellspacing='0' style='min-width:100%;'> <thead><tr>";
  let keys;
  if (filteredList) keys = Object.keys(filteredList[0]);

  _.map(keys, (key) => {
    htmlStart += `<th scope='col'style='padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;line-height:30px'>${key}</th>`;
  });
  htmlStart += "</tr></thead><tbody>";

  _.map(filteredList, (data) => {
    htmlStart += `<tr>`;
    _.map(keys, (key) => {
      htmlStart += `<td valign='top' style='padding:5px; font-family: Arial,sans-serif; font-size: 16px; line-height:20px;'> ${data[key]}</td>`;
    });
    htmlStart += `</tr>`;
  });
  htmlStart += "</tbody> </table>";
  return htmlStart;
};
