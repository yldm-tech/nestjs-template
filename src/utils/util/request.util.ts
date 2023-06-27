import axios from 'axios';

interface IpifyResponse {
  ip: string;
}

export const getIpAddress = async () => {
  const response = await axios.get('https://api.ipify.org?format=json');
  const data = response.data as IpifyResponse;
  return data.ip;
};
