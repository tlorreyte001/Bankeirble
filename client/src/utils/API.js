import axios from "axios";
const headers = {
  "Content-Type": "application/json",
};
const burl = "http://localhost:8800";

export default {
  login: function(email, password) {
    return axios.post(
      `${burl}/user/login`,
      {
        mail_perso: email,
        password: password
      },
      {
        headers: headers
      }
    );
  },
  
  signup: function(email, password) {
    console.log(burl + "/user/signup");
    return axios.post(burl + "/user/signup", {
      mail_perso: email,
      password: password
    });
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
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
