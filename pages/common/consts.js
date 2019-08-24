const appconstant = {
    version: "0.0.1",
    primaryBlue: "#44C1EE",
    primaryRed: "#EC2227",
    primaryOrange: "#F37C57",
    primaryGreen: "#8BBF45",
    mediumGrey: "#616161",
    DROP_DOWN_TYPE: {
        TENURE: 'TENURE',
        SOURCE: 'SOURCE',
        CURRENCY: 'CURRENCY',
        INDUSTRY: 'INDUSTRY',
        COUNTRY: 'COUNTRY',
        BU_NAME: 'BU',
        STATE: 'STATE',
        SALES_REP: 'SALES_REP',
        LEAD_STATUS:'LEAD_STATUS'
    },
    LEAD_STATUS: {
        APPROVED: 'APP',
        REJECTED: 'REJ',
        PENDING: 'DRAFT',
        NEED_MORE:'NMI'
    },
    DECODED_LEAD_STATUS:{
        APP:'Approved',
        REJ:'Rejected',
        DRAFT:'Pending',
        NMI:'Need More Info',
    },
    UPDATE_LEAD: {
        BUDGET: 'BUDGET',
        ASSIGN_REP: 'ASSIGN_REP',
        MODIFY_BU: 'MODIFY_BU',
        NOTIFY_BU: 'NOTIFY_BU',
        NOTIFY_TEXT:'NOTIFY_TEXT'
    }

}

export default appconstant;