import { BACKEND_URL } from './../constants';

class HTTP {
  static headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': ``,
    };
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT');
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST');
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE');
  }

  static xhr(route, params, verb) {
    const url = `${BACKEND_URL}${route}`;
    const options = { method: verb };
    options.headers = HTTP.headers();

    if (params) options.body = JSON.stringify(params);

    return fetch(url, options)
      .then(response => {
        const json = response.json();
        if (response.status >= 200 && response.status < 300) {
          return json;
        }
        return json.then(Promise.reject.bind(Promise));
      })
      .then(json => json)
      .catch(error => Promise.reject(error));
  }
}

export default HTTP;
