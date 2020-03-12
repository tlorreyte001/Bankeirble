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
    return axios.post(burl + "/user/signup", {
      mail_perso: email,
      password: password
    });
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },

  add_loan: function(user, amount, num_months, expiration_date) {
    return axios.post(
      `${burl}/loan/add`,
      {
          user,
          amount,
          num_months,
          expiration_date
      },
      {
        headers: headers
      }
    );
  },

  get_loans: function(user){
    return axios.post(
        `${burl}/loan/get_all_available`,
        {
            user
        },
        {
          headers: headers
        })
  }
};
