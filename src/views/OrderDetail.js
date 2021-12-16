import style from '../assets/css/orderDetail.module.css'
import { NavBar ,List ,Toast} from 'antd-mobile/2x'
import {useHistory, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import $api from '../api'
import dayjs from 'dayjs'

const OrderDetail = ()=>{
    const history = useHistory()
    const location = useLocation(); // 通过id 去获取航线信息  也可以从上个页面跳转的之后直接通过state传递
    let id = new URLSearchParams(location.search).get('id');
    const [order,setOrder] = useState({})

    useEffect(()=>{
        getOrderInfo()
    },[])

    const getOrderInfo = async ()=>{

        const _res = await $api.post('/order/getOne',{orderId:id})
        const { success ,data} = _res.data;
        if(!success) Toast.show({content:'获取失败'})
        setOrder(data)
    }

    // 用户取消订单

    const handleCancel = async ()=>{
        const res = await $api.post('/order/changeOrder',{ orderId:id,state:9  })
        const { success,data} = res;
        if(success) Toast.show({content:'取消成功'})
        getOrderInfo()
    }

    const orderStateTxt = ()=>{
        if(order.orderState == 1) return '已下单未支付'
        if(order.orderState == 2) return '已支付待确认'
        if(order.orderState == 3) return '已确认待核销'
        if(order.orderState == 4) return '用户已乘车'
        if(order.orderState == 5) return '用户未乘车单已过期'
        if(order.orderState == 6) return '用户退票申请中'
        if(order.orderState == 7) return '用户退票成功'
        if(order.orderState == 8) return '用户退票失败'
        if(order.orderState == 9) return '取消'
    }
    return (
        <div className={style.main}>
            <NavBar onBack={()=> history.goBack() }>订单详情</NavBar>
            <div className={style.ct}>
                <div className={style.orderInfo}>
                    订单当前状态:  {orderStateTxt()}
                </div>

                <List>
                    <List.Item  extra={ dayjs(order.orderDate).format('YYYY-MM-DD HH:mm') }> 乘车时间</List.Item>

                </List>

                {/* 基本信息 */}
                <div className={style.fbox}>


                    {/* 上下车站点 */}
                    <div className={style.fstation}>
                        <div className={style.fs}>
                            { order.startCity  + ' ' + order.startStationId }
                        </div>
                        <div className={style.fe}>
                            { order.arriveCity  + ' ' + order.arriveStationId }
                        </div>
                    </div>




                </div>

                <div className={style.mblock}> </div>
                <List>
                    <List.Item  extra='次要信息'> 客服电话</List.Item>
                    <List.Item  extra='xxx'> 现场指导员</List.Item>
                </List>
                <div className={style.mblock}> </div>

                <List>
                    <List.Item  extra={ order.linkMan &&  order.linkMan.length + '人' } > 乘车人</List.Item>

                    {  order.linkMan && order.linkMan.map(item=>(
                        <List.Item  extra={item.phone} description='成人'> {item.realName}</List.Item>
                    )) }


                </List>
                <div className={style.mblock}> </div>
                <List>
                    <List.Item  extra={ dayjs(order.createdAt).format('YYYY-MM-DD HH:mm')  } > 购票时间</List.Item>
                </List>

                <div className={style.mblock}> </div>
                <List>

                    <List.Item  extra={ '￥' + ( order.amount/100 ) } > 订单总金额</List.Item>
                </List>
            </div>
            <div className={style.orderBottom}>
                <div className={style.cancel} onClick={ handleCancel }> 取消</div>
                <div className={style.payit}>立即支付</div>
            </div>
        </div>
    )
}
export default  OrderDetail;
