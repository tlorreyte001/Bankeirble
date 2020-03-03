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
        email,
        password
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

  logout: function() {
  }
};