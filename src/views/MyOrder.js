import style from '../assets/css/myorder.module.css'
import { NavBar } from 'antd-mobile/2x';
import { useState ,useEffect} from 'react';
import $api from '../api'
import dayjs from 'dayjs'
const MyOrder = (props)=>{
    const { history}= props

    // 订单信息
    const [order,setOrder]= useState([])

    useEffect(()=>{
        getData()
       
    },[])


    // 请求获取参数
    const getData = async ()=>{
        let _res = await $api.post('/order/getAll')
        const { success,data} = _res.data;
        if(success){
            setOrder(data)
        }
    }

    const orderTxt = (orderState)=>{
        if(orderState == 1) return '已下单未支付'
        if(orderState == 2) return '已支付待确认'
        if(orderState == 3) return '已确认待核销'
        if(orderState == 4) return '用户已乘车'
        if(orderState == 5) return '用户未乘车单已过期'
        if(orderState == 6) return '用户退票申请中'
        if(orderState == 7) return '用户退票成功'
        if(orderState == 8) return '用户退票失败'
        if(orderState == 9) return '取消'
    }
    return (
        <div className={style.main}>

         <NavBar onBack={()=> history.goBack() }> 我的订单 </NavBar>
                {/*列表*/}
            <div className={style.ct}>
            { order.map(item=>(
                    <div className={style.fbox} key={item._id} onClick={()=> history.push('/OrderDetail?id='+item._id) }>
                        {/* 时间票价 */}
                        <div className={style.ft}>
                            <div className={style.ftime}>出发时间：  { dayjs(item.orderDate).format("YYYY-MM-DD") + ' '+item.flightinfo.startTime } </div>
                            <div className={style.fprice}> ￥{ item.amount/100 } 元 </div>
                        </div>
                        {/* 上下车站点 */}
                        <div className={style.fstation}>
                            <div className={style.fs}>
                                { item.flightinfo.startCity } - {item.startStationId}
                            </div>
                            <div className={style.fe}>
                                { item.flightinfo.arriveCity } - {item.arriveStationId}
                            </div>
                        </div>
                        <div className={style.fb}>
                            <div> 取消订单  </div>
                            <div> 当前订单状态: { orderTxt(item.orderState)} </div>
                        </div>
                    </div>
                )) }

            </div>
        </div>
    )
}
export default  MyOrder;
