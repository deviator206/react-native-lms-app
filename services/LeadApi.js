import ServiceClass from "./Services";

class LeadApi {
    constructor() {
    }

    getStats(params) {
        return new Promise(function (resolve, reject) {
            ServiceClass.postLeadStats(params).then((resp) => {
                if (resp && resp.data) {
                    resolve(resp.data)
                } else {
                    reject({ message: "RESPONSE IS NOT AS EXPECTED", error: "INVALID" });
                }
            }).catch((err) => {
                reject({ message: "RESPONSE IS NOT AS EXPECTED", error: "INVALID" });
            })
        }); 
    }

    updateLead(params) {
        return new Promise(function (resolve, reject) {
            ServiceClass.postUpdateLead(params).then((resp) => {
                if (resp && resp.data) {
                    resolve(resp.data)
                } else {
                    reject({ message: "RESPONSE IS NOT AS EXPECTED", error: "INVALID" });
                }
            }).catch((err) => {
                reject({ message: "RESPONSE IS NOT AS EXPECTED", error: "INVALID" });
            })
        }); 
    }

    getLeadDetails(params) {
        return new Promise(function (resolve, reject) {
            ServiceClass.getLeadDetails(params).then((resp) => {
                if (resp && resp.data) {
                    resolve(resp.data)
                } else {
                    reject({ message: "RESPONSE IS NOT AS EXPECTED", error: "INVALID" });
                }
            }).catch((err) => {
                reject({ message: "RESPONSE IS NOT AS EXPECTED", error: "INVALID" });
            })
        }); 
    }


    getLeads({params}) {
        return new Promise(function (resolve, reject) {
            ServiceClass.getLeads(params).then((resp) => {
                if (resp && resp.data) {
                    resolve(resp.data)
                } else {
                    reject({ message: "RESPONSE IS NOT AS EXPECTED", error: "INVALID" });
                }
            }).catch((err) => {
                reject({ message: "RESPONSE IS NOT AS EXPECTED", error: "INVALID" });
            })
        }); 
    }

    createLead({ params}) {
        return new Promise(function (resolve, reject) {
            ServiceClass.createLead(params).then((resp) => {
                if (resp && resp.data) {
                    resolve(resp.data)
                } else {
                    reject({ message: "RESPONSE IS NOT AS EXPECTED", error: "INVALID" });
                }
            }).catch((err) => {
                reject({ message: "RESPONSE IS NOT AS EXPECTED", error: "INVALID" });
            })
        });
    }
}

export default LeadApi;