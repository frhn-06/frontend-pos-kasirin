import instance from "@/libs/axios";
import endpoint from "./endpoint";

const dashboardService = {
    summary: () => instance.get(`${endpoint.DASHBOARD}/summary`),

    trendSales: () => instance.get(`${endpoint.DASHBOARD}/sales-trend`),

    topProducts: () => instance.get(`${endpoint.DASHBOARD}/top-products`),

    lastOrders: () => instance.get(`${endpoint.DASHBOARD}/last-orders`)
}

export default dashboardService;