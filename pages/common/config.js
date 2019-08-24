const appConfig = {
    version: "0.0.1",
    BU_LIST: [
        "SPECTRO",
        "LAND",
        "ATLAS",
        "CM"
    ],
    INDUSTRY_LIST: [
        "Engineering",
        "Quality",
        "Marketing"
    ],
    SUPPORTED_CURRENCY: [
        "USD",
        "INR"
    ],
    SALES_REP_LIST: [
        "Sahil",
        "Samir",
        "Sashank"
    ],
    LEAD_SOURCE_TYPE: [
        "web",
        "media",
        "marketing"
    ],
    LEAD_TENURE: [
        "Less than 1 month",
        "Less than 6 month",
        "Less than 1 year"
    ],
    LEAD_STATUS: [
        {
            name: "PENDING",
            code: "DRAFT"
        },
        {
            name: "REJECTED",
            code: "REJ"
        },
        {
            name: "APPROVED",
            code: "APP"
        },
        {
            name: "NEED MORE INFO",
            code: "NMI"
        }
    ]
}

export default appConfig;