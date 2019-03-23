const request = require('request');

module.exports = {

  actualRates: async () => {
    return new Promise((resolve, reject) => {
      request.get({
        url: 'http://www.nbrb.by/API/ExRates/Rates?Periodicity=0'
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else if (response.statusCode !== 200) {
          reject(response.statusCode + ' ' + response.statusMessage);
        } else {
          try {
            resolve(JSON.parse(body).map(rate => {
              return {
                name: rate.Cur_Name,
                currency: rate.Cur_Abbreviation,
                inCurrency: 'BYN',
                scale: rate.Cur_Scale,
                value: rate.Cur_OfficialRate,
              }
            }));
          } catch (e) {
            reject(e);
          }
        }
      });
    });
  },

  actualRate: async (currency) => {
    return new Promise((resolve, reject) => {
      request.get({
        url: `http://www.nbrb.by/API/ExRates/Rates/${currency}?ParamMode=2`
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else if (response.statusCode !== 200) {
          reject(response.statusCode + ' ' + response.statusMessage);
        } else {
          try {
            let rate = JSON.parse(body);
            resolve({
              name: rate.Cur_Name,
              currency: rate.Cur_Abbreviation,
              inCurrency: 'BYN',
              scale: rate.Cur_Scale,
              value: rate.Cur_OfficialRate,
            });
          } catch (e) {
            reject(currency + ' ' + e);
          }
        }
      });
    });
  },

};
