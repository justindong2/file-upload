const axios = require('axios');

// const url = 'http://localhost:5000';
const url = '/api';

const getFiles = async () => {
  try {
    const response = await axios.get(`${url}/file`);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

export default getFiles;