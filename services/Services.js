import axios from 'axios';
const SERVER_CONFIG = {
    hostPort:'http://52.66.240.20:8080/',
    basePath: 'lms-rest-services-0.1.0/'
};

const SERVICE_URL = {
    'LOGIN':'user/'
}
class ServiceClass {
    static localErrorHandler ()  {
        
    }

    static localSuccessHandler ()  {
        
    }

    static createServiceURL (serviceKey)  {
        return SERVER_CONFIG.hostPort+SERVER_CONFIG.basePath+SERVICE_URL[serviceKey];
    }

    static async loginService (params) {
        return await axios.get(ServiceClass.createServiceURL('LOGIN'));
    }
}
export default ServiceClass;