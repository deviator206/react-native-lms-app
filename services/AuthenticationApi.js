import ServiceClass from "./Services";

class AuthenticationApi {
    constructor() {

    }
  proceedLoginApi ({successHandler}) {
      ServiceClass.loginService().then((data)=>{
          console.log(data);
          successHandler(data);
      }).catch((err)=>{
           console.log(err);
      })
  }
}

export default AuthenticationApi;