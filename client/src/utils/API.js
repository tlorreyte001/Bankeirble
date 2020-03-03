import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
  login: function(email, password) {
    return axios.post(
      `${burl}/user/login`,
      {
        email,
        password
      },
      {
        headers: headers
      }
    );
  },
  signup: function(send) {
    return axios.post(`${burl}/user/signup`, send, { headers: headers });
  },

  logout: function() {
  },

  add_loan: function(amount, num_months, expiration_date) {
    return axios.post(
      `${burl}/loan/add`,
      {
        amount,
        num_months,
        expiration_date
      },
      {
        headers: headers
      }
    );
  }
};
