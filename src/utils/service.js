import axios from "axios";

class Service {
  constructor() {
    let service = axios.create({
      headers: {
        Authorization: localStorage.getItem("acessToken")
      }
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = error => {
    switch (error.response.status) {
      case 401:
        this.redirectTo(document, "/");
        break;
      case 404:
        this.redirectTo(document, "/404");
        break;
      case 400:
        break;
      default:
        this.redirectTo(document, "/500");
        break;
    }
    return Promise.reject(error);
  };

  redirectTo = (document, path) => {
    document.location = path;
  };

  get(path, callback) {
    return this.service
      .get(path)
      .then(response => callback(response.status, response.data))
      .catch(err => callback(err.response.status, err.response.data.message));
  }

  patch(path, payload, callback) {
    return this.service
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload
      })
      .then(response => callback(response.status, response.data));
  }

  post(path, payload, callback) {
    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload
      })
      .then(response => callback(response.status, response.data))
      .catch(error =>
        callback(error.response.status, error.response.data.message)
      );
  }
}

export default new Service();
