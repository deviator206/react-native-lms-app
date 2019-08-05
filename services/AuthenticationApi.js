import ServiceClass from "./Services";

class AuthenticationApi {
    constructor() {

    }

  proceedLoginApi ({successHandler, errorHandler }) {
      ServiceClass.loginService().then((data)=>{
          console.log(data);
          successHandler(data);
      }).catch((err)=>{
           console.log(err);
           if(errorHandler) {
            errorHandler(err)
           }
      })
  }
}

export default AuthenticationApi;