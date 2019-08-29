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
        LEAD_STATUS: 'LEAD_STATUS'
    },
    LEAD_STATUS: {
        APPROVED: 'APP',
        REJECTED: 'REJ',
        PENDING: 'DRAFT',
        NEED_MORE: 'NMI'
    },
    DECODED_LEAD_STATUS: {
        APP: 'Approved',
        REJ: 'Rejected',
        DRAFT: 'Pending',
        NMI: 'Need More Info',
    },
    UPDATE_LEAD: {
        BUDGET: 'BUDGET',
        ASSIGN_REP: 'ASSIGN_REP',
        MODIFY_BU: 'MODIFY_BU',
        NOTIFY_BU: 'NOTIFY_BU',
        NOTIFY_TEXT: 'NOTIFY_TEXT'
    },
    MI_STATUS: {
        CLOSED: 'CLOSED',
        OPEN: 'OPEN'
    },
    MI_TYPE_CONST: {
        PROJECT: 'PROJECT',
        INVESTMENT: 'INVESTMENT',
        NEWSITEM: 'NEWSITEM'
    },
    MI_STATUS_DROP_DOWN: [
        {
            name: 'Open For Discussion',
            code: 'open'
        },
        {
            name: 'Converted to Lead',
            code: 'closed'
        }
    ],
    MI_TYPE: [
        {
            name: 'Project',
            code: 'project'
        },
        {
            name: 'Investment',
            code: 'investment'
        },
        {
            name: 'News Item',
            code: 'newsitem'
        }
    ],
    MI_INFO: {
        ADD_MORE_INFO: 'ADD_MORE_INFO',
        CONVERT_TO_LEAD: 'CONVERT_TO_LEAD',
        CTL_CUSTOMER_NAME: 'CTL_CUSTOMER_NAME',
        CTL_REQUIREMENT: 'CTL_REQUIREMENT',
    },
    USER_TYPE_RADIO_GROUP: [
        {
            "name": "Sales Rep",
            "code": "SR"
        },
        {
            "name": "Buniess Head",
            "code": "BH"
        },
        {
            "name": "Business Development",
            "code": "BD"
        }
    ],
    ROLES_USER_TYPE_MAPPING:{
        "SR":"SALES_REP",
        "BD":"ADMIN",
        "BH":"BU_HEAD"
    }

}

export default appconstant;