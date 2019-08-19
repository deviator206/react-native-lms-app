import ServiceClass from "./Services";

class LeadApi {
    constructor() {
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