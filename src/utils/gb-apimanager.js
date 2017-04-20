import 'whatwg-fetch';

class GBAPIManager {

  constructor(height, width) {
    this.baseURL = 'http://localhost:8000';
  }

  /**
   * Creates survey
   * @param  {Array}  params Array of restaurants
   * @return {[type]}        [description]
   */
  createSurvey(params = []) {
    const myInit = { 
      method: 'POST',
      body: JSON.stringify({restaurants: params}),
      headers: new Headers()
    };
    console.log('fz', JSON.stringify({restaurants: params}));
    const url = `${this.baseURL}/survey/create?id=45`;
    return fetch(url, myInit)
      .then(function(response) {
        return response.json();
      }).catch((error, foo) => {
        return error
      })
  }
}


export let gbapimanager = new GBAPIManager();