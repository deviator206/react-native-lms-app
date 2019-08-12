const ref_data = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_REF_DATA':
            return [
                ...state,
                {
                    id: action.id,
                    
                }
            ]

        default:
            return state
    }
}

export default ref_data