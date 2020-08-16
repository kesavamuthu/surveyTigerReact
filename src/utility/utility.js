import axios from "axios";
import Connect from "../config";
const util = {};

util.parser = (tmp) => {
  /**
   * @input as array
   * parser is used to convert value into string because while reading the excel data from that
   * files are received as object that is not able to rendered by react.
   */
  let out = tmp.map((e) => JSON.parse(JSON.stringify(e)));
  return out;
};

util.requestMaker = (data, method, path, dataType = "application/json") => {
  /**
   * @input passing data, http method, endpoint, media type
   */
  return axios({
    method,
    headers: {
      "Content-Type": dataType,
    },
    data,
    url: Connect.url + path,
  });
};

export default util;
