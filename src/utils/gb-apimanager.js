import 'whatwg-fetch';

class GBAPIManager {

  constructor(height, width) {
    if (process.env.NODE_ENV === 'production') {
      this.baseURL = 'https://goobouffebo.danyellow.net';
    } else {
      this.baseURL = 'http://localhost:8000';
    }
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

    const url = `${this.baseURL}/survey/create`;
    return fetch(url, myInit)
      .then(function(response) {
        return response.json();
      }).catch((error) => {
        return error
      })
  }

  getSurvey(hash) {
    const myInit = { 
      method: 'GET',
      headers: new Headers()
    };

    const url = `${this.baseURL}/survey/${hash}`;
    return fetch(url, myInit)
      .then(function(response) {
        return response.json();
      }).catch((error) => {
        return error
      })
  }

  vote(hash, id) {
    const myInit = { 
      method: 'POST',
      body: JSON.stringify({vote: {hash, id}}),
      headers: new Headers()
    };

    const url = `${this.baseURL}/survey/${hash}/${id}`;
    return fetch(url, myInit)
      .then(function(response) {
        return response.json();
      }).catch((error) => {
        return error
      })
  }

  getResults(hash) {
    const myInit = { 
      method: 'GET',
      headers: new Headers()
    };

    const url = `${this.baseURL}/survey/results/${hash}`;
    return fetch(url, myInit)
      .then(function(response) {
        return response.json();
      }).catch((error) => {
        return error
      })
  }
}

export let gbapimanager = new GBAPIManager();