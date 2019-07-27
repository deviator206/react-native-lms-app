import ServiceClass from "./Services";

class AuthenticationApi {
    constructor() {

    }
  proceedLoginApi () {
      ServiceClass.loginService().then((data)=>{
          console.log(data);
      }).catch((err)=>{
           console.log(err);
      })
  }
}

export default AuthenticationApi;