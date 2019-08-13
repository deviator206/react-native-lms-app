import ServiceClass from "./Services";


class RefDataApi {
    constructor({state}) {
        this.reducerName ='ref_data';
        this.currentState = state;
    }

    getRefInfo(state) {
        return (state[this.reducerName] && state[this.reducerName].ref_info ) ? state[this.reducerName].ref_info: {}
    }
   
    fetchRefData({ params }) {
        const ref = this.getRefInfo(this.currentState);
        // if(ref.has)
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