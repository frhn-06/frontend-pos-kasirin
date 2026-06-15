import instance from "@/libs/axios";
import endpoint from "./endpoint";

const dashboardService = {
    summaryOwner: () => instance.get(`${endpoint.DASHBOARD}/owner-summary`),

    trendSales: () => instance.get(`${endpoint.DASHBOARD}/sales-trend`),

    topProductsOwner: () => instance.get(`${endpoint.DASHBOARD}/owner-top-products`),

    lastOrdersOwner: () => instance.get(`${endpoint.DASHBOARD}/owner-last-orders`),




    summaryCashier: () => instance.get(`${endpoint.DASHBOARD}/cashier-summary`),

    paymentSummary: () => instance.get(`${endpoint.DASHBOARD}/payment-summary`),

    topProductsCashier: () => instance.get(`${endpoint.DASHBOARD}/cashier-top-products`),
   
    lastOrdersCashier: () => instance.get(`${endpoint.DASHBOARD}/cashier-last-orders`),
}

export default dashboardService;