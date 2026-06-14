import instance from "@/libs/axios";
import endpoint from "./endpoint";

const dashboardService = {
    summary: () => instance.get(`${endpoint.DASHBOARD}/owner-summary`),

    trendSales: () => instance.get(`${endpoint.DASHBOARD}/sales-trend`),

    topProducts: () => instance.get(`${endpoint.DASHBOARD}/owner-top-products`),

    lastOrders: () => instance.get(`${endpoint.DASHBOARD}/owner-last-orders`)
}

export default dashboardService;