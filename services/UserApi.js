import ServiceClass from "./Services";

class UserApi {
    constructor() {
    }

    createUser(params) {
        return new Promise(function (resolve, reject) {
            ServiceClass.createNewUser(params).then((resp) => {
                if (resp && resp.data) {
                    resolve({"status":"YES"})
                } else {
                    reject({ message: "RESPONSE IS NOT AS EXPECTED", error: "INVALID" });
                }
            }).catch((err) => {
                reject({ message: "RESPONSE IS NOT AS EXPECTED", error: "INVALID" });
            })
        }); 
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