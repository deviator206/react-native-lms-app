import ServiceClass from "./Services";

class RefDataApi {
    constructor() {

    }

    forgotPasswordApi({ params={userName:"test01",password:"abc"}, successHandler, errorHandler }) {
        ServiceClass.loginService(params).then((resp) => {
            if (resp && resp.data && successHandler) {
                ServiceClass.updateHeaderInformation(resp.data);
                successHandler(resp.data);
            } else {
                alert("VALIDATE THE RESPONSE")
            }
        }).catch((err) => {
            if (err && err.response && err.response.data && errorHandler) {
                errorHandler(err.response.data)
            } else if(errorHandler) {
                errorHandler({message:"NORMALIZED ERROR",error:"FORBIDDEN"})
            }
        })
    }


    fetchRefData({ params }) {
        return new Promise(function(resolve, reject) {
            ServiceClass.getRefData(params).then((resp) => {
                if (resp && resp.data) {
                    resolve(resp.data);
                } else {
                    alert("VALIDATE THE RESPONSE")
                }
            }).catch((err) => {
                if (err && err.response && err.response.data) {
                    reject(err.response.data)
                } else {
                    reject({message:"NORMALIZED ERROR",error:"FORBIDDEN"})
                }
            })
          });

       
    }
}

export default RefDataApi;