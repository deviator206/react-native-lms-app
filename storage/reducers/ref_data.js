const ref_data = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_REF_DATA':
            const refInfo = {};
            if (action && action.data) {
                action.data.forEach((element) => {
                    if (element && element.type) {
                        if (!refInfo[element.type]) {
                            refInfo[element.type] = [];
                        }
                        refInfo[element.type].push(element);
                    }
                });
            }
            return [
                ...state,
                {
                    ref_info: refInfo
                }
            ]

        default:
            return state
    }
}

export default ref_data