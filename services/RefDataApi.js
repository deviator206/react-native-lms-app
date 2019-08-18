import ServiceClass from "./Services";


class RefDataApi {
    constructor({ state }) {
        this.reducerName = 'ref_data';
        this.getRefInfo = this.getRefInfo.bind(this);
        this.fetchRefData = this.fetchRefData.bind(this);
    }

    getRefInfo(state) {
        if (!state) {
            const currentReduxStore = window.storeInstance.getState();
            return (currentReduxStore && currentReduxStore[this.reducerName] && currentReduxStore[this.reducerName].ref_info) ? currentReduxStore[this.reducerName].ref_info : {};
        }
       
        return (state && state[this.reducerName] && state[this.reducerName].ref_info) ? state[this.reducerName].ref_info : {};
    }

    fetchRefData({ params }) {
        const refInfo = this.getRefInfo();
        
        if (refInfo && refInfo.query === params) {
            return Promise.resolv(refInfo);
        } else {
            return new Promise(function (resolve, reject) {
                ServiceClass.getRefData(params).then((resp) => {
                    if (resp && resp.data) {
                       resolve(resp);
                        // window.storeInstance.dispatch({ type: 'FETCH_REF_DATA', dataResp: {  data: resp.data, query: params } });
                        
                    } else {
                        alert("VALIDATE THE RESPONSE")
                    }
                }).catch((err) => {
                    if (err && err.response && err.response.data) {
                        reject(err.response.data)
                    } else {
                        reject({ message: "NORMALIZED ERROR", error: "FORBIDDEN" })
                    }
                })
            });
        }
    }
}

export default RefDataApi;