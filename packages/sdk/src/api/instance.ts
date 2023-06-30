import axios from 'axios';

import { apiUrl } from '../constants';

const apiInstance = axios.create({
  baseURL: apiUrl,
});

export default apiInstance;
