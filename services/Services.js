import axios from 'axios';
const SERVER_CONFIG = {
    hostPort: 'http://52.66.240.20:8080/',
    basePath: 'be_lms_app/'
};

const SERVICE_URL = {
    'LOGIN': 'login/'
}

const axiosInstance = axios.create({
    timeout: 1000,
    baseURL: SERVER_CONFIG.hostPort + SERVER_CONFIG.basePath,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
class ServiceClass {
    static localErrorHandler() {

    }
    static localSuccessHandler() {

    }
    static updateHeaderInformation(headerInfo) {
        axiosInstance.defaults.headers = {
            Accept: 'application/json',
            accessToken: headerInfo['accessToken'],
            tokenType: headerInfo['tokenType'],
            'Content-Type': 'application/json'
        };
    }
    static createServiceURL(serviceKey) {
        return SERVER_CONFIG.hostPort + SERVER_CONFIG.basePath + SERVICE_URL[serviceKey];
    }

    static async loginService(params) {
        return await axiosInstance.post(SERVICE_URL['LOGIN'], params);
    }
}
export default ServiceClass;