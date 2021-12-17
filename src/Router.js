
import Home from "./views/Home";
import AddClient from "./views/AddClient";
import Flights from "./views/Flights";
import MyOrder from "./views/MyOrder";
import Order from "./views/Order";
import OrderDetail from "./views/OrderDetail";
import Station from "./views/Station";
import Check from './views/Check'

const routes = [

    { path: '/check' , component: Check }, //  确认客户乘车页面
    { path: '/Flights' , component: Flights }, //  航班列表页
    { path: '/AddClient' , component: AddClient }, // 添加乘车人
    { path: '/MyOrder' , component: MyOrder }, // 我的订单
    { path: '/Order' , component: Order }, // 下单页面
    { path: '/OrderDetail' , component: OrderDetail },  // 订单详情
    { path: '/Station' , component: Station }, // 站点选择页
    { path: '/' , component: Home  ,exact: true}, // 首页
]

export default  routes;



