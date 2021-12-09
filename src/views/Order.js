import style from '../assets/css/order.module.css'
import { NavBar ,DatePicker ,Dialog,Checkbox} from 'antd-mobile/2x'
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";

const Order = ()=>{

    const history = useHistory();
    const [ rideMan,setRideMan ] = useState([
        { realname:'dixon',idNum:'123******333'  }
    ])

    useEffect(()=>{
        Dialog.alert({
            content: ( <>
                我是文字提醒内容
                        <div>
                            <Checkbox
                                style={{
                                    '--icon-size': '18px',
                                    '--font-size': '14px',
                                    '--gap': '6px',
                                }}
                            >
                                不在提示
                            </Checkbox>
                        </div>

              </>),
            onConfirm: () => {
                console.log('Confirmed')
            },
        })
    },[])

    return (
        <div className={style.main}>
            <NavBar onBack={()=> history.goBack() }> 订单信息</NavBar>
            <div className={style.ct}>

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

                {/*  添加乘车人 */}

                <div className={style.ccr}>
                    <div className={style.hotTitle}> 请选择乘车人 </div>
                    <div className={style.rideZone}>
                        <div className={style.rideManBox}>
                                dixon
                        </div>
                        <div className={style.addRide}  onClick={()=>history.push('/AddClient')} > 新增</div>
                    </div>

                    <div className={style.rideManList}>
                        <div className={style.rideMan}>
                            <div> Dixon </div>
                            <div> 123******333 </div>
                            <div> 35.00 </div>
                        </div>

                    </div>
                </div>

                <div className={style.readme}>
                    这里是放置文字提示的地方
                </div>
            </div>

             <div className={style.orderBottom}>
                 <div className={style.orderinfo}>
                     <div >订单金额: <span > ￥35.00 </span> </div>
                     <div> 明细 </div>
                 </div>
                 <div className={style.payit}> 立即下单</div>
             </div>
        </div>
        )
}
export default  Order;
