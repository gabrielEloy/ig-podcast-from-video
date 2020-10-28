const axios = require('axios');

const alertStatus = async (videoId, status) => {
    const baseURL = ' http://localhost:7777'
    axios.post(`${baseURL}?videoId=${videoId}`, status)
};

module.exports = alertStatus;