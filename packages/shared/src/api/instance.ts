import { apiUrl } from '@shared/constants';
import axios from 'axios';

const apiInstance = axios.create({
  baseURL: apiUrl,
});

export default apiInstance;
