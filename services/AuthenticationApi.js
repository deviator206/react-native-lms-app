import ServiceClass from "./Services";

class AuthenticationApi {
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


    proceedLoginApi({ params, successHandler, errorHandler }) {
        ServiceClass.loginService(params).then((resp) => {
            if (resp && resp.data && successHandler) {
                ServiceClass.updateHeaderInformation(resp.data);
                successHandler(resp.data);
            } else {
                alert("VALIDATE THE RESPONSE")
            }
        }).catch((err) => {
            if (errorHandler) {
                errorHandler({message:"NORMALIZED ERROR",error:"FORBIDDEN"})
            }
        })
    }
}

export default AuthenticationApi;