import { FeedSharp } from '@mui/icons-material';
import axioss from 'axios';
// export const API_URL = 'http://192.168.3.146:4000/api/v1/'; //dawood
export const API_URL = 'http://localhost:4000/api/v1/'; //local
// export const API_URL = 'https://app.galileoprotocol.io/api/v1/';
// export const API_URL = 'http://192.168.0.79:4000/api/v1/'; //zain
// export const API_URL = 'https://demo.galileoprotocol.io/api/v1/';
// export const API_URL = 'http://192.168.0.79:4000/api/v1/'; //zain
// export const API_URL = 'http://192.168.1.190:4000/api/v1/'; //talha
// export const API_URL = 'http://192.168.1.190/api/v1/'; //talha
// export const API_URL = 'https://5ae8-182-178-193-104.ngrok-free.app/api/v1/'; //zain
// export const API_URL = 'http://galileoargon.tk/api/v1';
const axios = axioss.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

axios.interceptors.response.use(
  function (response) {
    // Do something with response data

    return response;
  }
  // , function (error, response) {
  //   if(error.response.status === 401){
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('role');
  //     window.location = '/'
  //     }
  // }
);

export default axios;
