import { Input,Form } from 'antd-mobile/2x'
import style from '../assets/css/orderDetail.module.css'
import { NavBar ,List ,Toast,Modal,Button} from 'antd-mobile/2x'

import {useHistory, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import $api from '../api'
import dayjs from 'dayjs'

const Check  = ()=>{
    const history = useHistory()
    const location = useLocation(); // 通过id 去获取航线信息  也可以从上个页面跳转的之后直接通过state传递
    let id = new URLSearchParams(location.search).get('id');

    const [order,setOrder] = useState({}) // 订单信息
    const [pwd,setPwd] = useState('')
    
    useEffect(()=>{
        getOrderInfo()
    },[])


    const getOrderInfo = async ()=>{
        const _res = await $api.post('/order/getOne',{orderId:id})
        const { success ,data} = _res.data;
        if(!success) Toast.show({content:'获取失败'})
        setOrder(data)
    
    }

    const checkOrder = async ()=>{
        const _res = await $api.post('/order/checkOrder',{orderId:id,pwd})
        const { success ,data,info} = _res.data;
        if(success)  return  Toast.show({content:'核销成功'})
        Toast.show({content:info})
      
    }
    return (
            <div>

                <div> 
                <List>
                    <List.Item  extra={ '￥' + ( order.amount/100 ) } > 订单总金额</List.Item>
                </List>
                <List>
                    <List.Item  extra={ order.linkMan &&  order.linkMan.length + '人' } > 乘车人</List.Item>

                    {  order.linkMan && order.linkMan.map(item=>(
                        <List.Item  extra={item.phone} description='成人'> {item.realName}</List.Item>
                    )) }


                </List>
                
                <List>
                    <List.Item  extra={ dayjs(order.orderDate).format('YYYY-MM-DD HH:mm') }> 乘车时间</List.Item>
                </List>
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
                    
                    </div> 
               

                    <Form
                        layout={'horizontal'}
                    >
                        <Form.Item name='phone' label='确认密码' >
                            <Input  placeholder="请输入六位数确认密码" onChange={val=>setPwd(val)} />
                       </Form.Item>
                    </Form>


                <Button block color='primary' onClick={checkOrder}> 核销按钮</Button>      

            </div>
    )
}
export default Check;