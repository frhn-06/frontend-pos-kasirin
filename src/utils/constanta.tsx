export const PAGE_DEFAULT = 1;
export const LIMIT_DEFAULT = 12;

export const LIST_LIMIT = [
    {key: "6", label: "6"},
    {key: "12", label: "12"},
    {key: "18", label: "18"},
    {key: "24", label: "24"},
]



export const LIST_STATUS_ORDER = [
    {
        label: "Semua",
        id: ""
    },
    {
        label: "Completed",
        id: "paid"
    },
    {
        label: "Cancelled",
        id: "cancelled"
    }
];

export const LIST_PAYMENT_ORDER = [
    {
        label: "Semua",
        id: ""
    },
    {
        label: "Cash",
        id: "cash"
    },
    {
        label: "Qris",
        id: "qris"
    },
    {
        label: "Transfer",
        id: "transfer"
    }
];