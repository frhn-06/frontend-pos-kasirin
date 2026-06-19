interface Isummarysales {
    totalSales: number;
    totalOrders: number;
    averegeOrderValue: number;
}

interface Isalesbyday  {
    date: string;
    totalSales: number;
    totalOrders: number;
}

interface IReportSales {
    summary: Isummarysales;
    salesByDay: Isalesbyday[]
} 





interface IReportProduct {
    productId: string;
    productName: string;
    qtySold: number;
    totalPemasukan: number;
    totalOrders: number;
}

export type {IReportSales, Isummarysales, Isalesbyday, IReportProduct}