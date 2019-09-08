import axios from 'axios';
const SERVER_CONFIG = {
    hostPort: 'http://52.66.164.208:8080/',
    basePath: 'lmsApp-0.1.0/'
};

const SERVICE_URL = {
    'LOGIN': 'login/',
    'REF_DATA': 'refdata/',
    'CREATE_LEAD': 'rootlead/',
    'GET_LEADS': 'leads/',
    'GET_MI': 'marketIntelligence/',
    'LEAD_DETAILS': 'lead/',
    'MI_DETAILS':'marketIntelligence/',
    'GET_USERS': 'users/',
    'UPDATE_LEAD': 'lead/',
    'UPDATE_MI':'marketIntelligence/',
    'CREATE_NEW_MI': 'marketIntelligence/',
    'CREATE_NEW_USER':'user/',
    'SEARCH_MI': 'search/marketIntelligence/',
    'GET_LEAD_STATS': 'statistics/lead?'
}

const axiosInstance = axios.create({
    timeout: 30000,
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
    static async getRefData(params) {
        return await axiosInstance.get(SERVICE_URL['REF_DATA'] + '?' + params);
    }

    static async createLead(params) {
        return await axiosInstance.post(SERVICE_URL['CREATE_LEAD'], params);
    }


    static async createNewMI(params) {
        return await axiosInstance.post(SERVICE_URL['CREATE_NEW_MI'], params);
    }

    static async getLeads(params) {
        return await axiosInstance.get(SERVICE_URL['GET_LEADS']);
    }

    static async getLeadDetails({ itemId }) {
        return await axiosInstance.get(SERVICE_URL['LEAD_DETAILS'] + itemId);
    }

    static async getMIDetails({ itemId }) {
        return await axiosInstance.get(SERVICE_URL['MI_DETAILS'] + itemId);
    }

    static async postUpdateLead({ itemId, payload }) {
        return await axiosInstance.put(SERVICE_URL['UPDATE_LEAD'] + itemId, payload);
    }

    static async postUpdateMI({ itemId, payload }) {
        return await axiosInstance.post(SERVICE_URL['UPDATE_MI'] + itemId, payload);
    }

    static async getUsers() {
        return await axiosInstance.get(SERVICE_URL['GET_USERS']);
    }

    static async getMI() {
        return await axiosInstance.get(SERVICE_URL['GET_MI']);
        // return await axiosInstance.post(SERVICE_URL['SEARCH_MI'], params);
    }

    static async searchMIList(filterPayload) {
        return await axiosInstance.post(SERVICE_URL['SEARCH_MI'], filterPayload);
    }

    static async createNewUser(params) {
        return await axiosInstance.post(SERVICE_URL['CREATE_NEW_USER'], params);
    }

    static async postLeadStats({payload, queryParams}) {
        return await axiosInstance.post(SERVICE_URL['GET_LEAD_STATS']+queryParams, payload);
    }
}
export default ServiceClass;