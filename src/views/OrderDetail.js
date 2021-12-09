import style from '../assets/css/orderDetail.module.css'
import { NavBar ,List} from 'antd-mobile/2x'
import {useHistory} from "react-router-dom";
import { useState } from "react";

const OrderDetail = ()=>{
    const history = useHistory()
    return (
        <div className={style.main}>
            <NavBar onBack={()=> history.goBack() }>订单详情</NavBar>
            <div className={style.ct}>
                <div className={style.orderInfo}>
                </div>

                <List>
                    <List.Item  extra='2021-12-25 11:22:11'> 乘车时间</List.Item>
                    <List.Item  extra='车牌号：xxx'> 班次号</List.Item>
                </List>

                {/* 基本信息 */}
                <div className={style.fbox}>
                    {/* 时间票价 */}
                    <div className={style.ft}>
                        <div className={style.ftime}> 12-25 17:30</div>
                        <div className={style.fprice}>  </div>
                    </div>
                    {/* 上下车站点 */}
                    <div className={style.fstation}>
                        <div className={style.fs}>
                            出发地点
                        </div>
                        <div className={style.fe}>
                            到达地点
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
                    <List.Item  extra='1人' > 乘车人</List.Item>
                    <List.Item  extra='xxx' description='成人 座位号1'> Dixon</List.Item>
                </List>
                <div className={style.mblock}> </div>
                <List>
                    <List.Item  extra='2021/12/25' > 购票时间</List.Item>
                </List>

                <div className={style.mblock}> </div>
                <List>
                    <List.Item  extra='￥35' > 车票金额</List.Item>
                    <List.Item  extra='￥35' > 订单总金额</List.Item>
                </List>
            </div>
            <div className={style.orderBottom}>
                <div className={style.cancel}>取消</div>
                <div className={style.payit}>立即支付</div>
            </div>
        </div>
    )
}
export default  OrderDetail;
