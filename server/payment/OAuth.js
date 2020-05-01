const axios = require('axios');

async function ask (key) {
    try {
        const {data} = await axios({
            method: 'post',
            url: 'https://api.sandbox.mangopay.com/v2.01/oauth/token/',
            data: 'grant_type=client_credentials',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + key
            }
        })
        console.log("Connecté à MangoPay !");
        return data.access_token;
    }
    catch (e){
        console.log(e);
    }
}

exports.ask = ask;