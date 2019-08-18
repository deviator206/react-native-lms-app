const ref_data = (state = {}, action) => {
    console.log("### action ",action);
    switch (action.type) {
        case 'FETCH_REF_DATA':
            const refInfo = {};
            if (action && action.dataResp && action.dataResp.data) {
                action.dataResp.data.forEach((element) => {
                    if (element && element.type) {
                        if (!refInfo[element.type]) {
                            refInfo[element.type] = [];
                        }
                        refInfo[element.type].push(element);
                    }
                });
            }

            
            return {
                ...state,
                ref_info: {
                    refInfo,
                    query: action.dataResp.query
                }
            }
        default:
            return state
    }
}

export default ref_data