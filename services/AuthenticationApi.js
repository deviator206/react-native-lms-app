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
            if (errorHandler) {
                errorHandler(err.response.data)
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
                errorHandler(err.response.data)
            }
        })
    }
}

export default AuthenticationApi;