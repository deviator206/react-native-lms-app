import ServiceClass from "./Services";

class UserApi {
    constructor() {
    }

    getUserList() {
        return new Promise(function (resolve, reject) {
            ServiceClass.getUsers().then((resp) => {
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

export default UserApi;