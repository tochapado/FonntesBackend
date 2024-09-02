import axios from 'axios';

class RolasApi {
    constructor() {
        this._apiUrl = 'http://localhost:6969/api/rolas'
    };

    getRolas() {
        return axios.get(this._apiUrl);
    };

    createRola(data) {
        return axios.post(this._apiUrl, data);
    };
};

export default new RolasApi();