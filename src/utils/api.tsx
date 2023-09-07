import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reach-industries-candidate-tests.s3.eu-west-2.amazonaws.com'
});

export default instance;
