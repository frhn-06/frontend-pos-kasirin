interface ISummaryDashboardOwner {
    totalPemasukanToday?: number;
    totalOrderToday?: number;
    totalProdukKeluarToday?: number;
    rataRataPemasukanToday?: number;
}

interface ITrendSalesDashboardOwner {
    date?: string;
    totalSales?: number; 
}

interface ITopProductsDashboardOwner {
    productName?: string;
    totalSold?: number;
    price?: number;
}


interface ILastOrdersDashoardOwner {
    orderNumber?: string;
    totalAmount?: string;
    paymentMethod?: string;
    cashierSnapshot?: {
        name: string;
    };
    createdAt?: string;
}

export type {ISummaryDashboardOwner, ITrendSalesDashboardOwner, ITopProductsDashboardOwner, ILastOrdersDashoardOwner}