import axios from 'axios';

import { BASE_URL } from '../../config/API';

axios.defaults.baseURL = BASE_URL;

class AuthService {
  login({ email, password }, signal) {
    return axios.post('/users/login', { email, password }, { signal });
  }

  // register({ name, email, password }) {
  //   return axios.post('/users/new', { email, password, name });
  // }
}

export default new AuthService();
