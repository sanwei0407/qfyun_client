import style from '../assets/css/order.module.css'
import {NavBar, DatePicker, Dialog, Checkbox, Toast} from 'antd-mobile/2x'
import {useHistory,useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import $api from '../api'
const Order = ()=>{

    const history = useHistory();
    const location = useLocation(); // 通过id 去获取航线信息  也可以从上个页面跳转的之后直接通过state传递

    let id = new URLSearchParams(location.search).get('id');
    let date = new URLSearchParams(location.search).get('date');




    const [ linkMan,setLinkMan ] = useState([ ])
    const [flightInfo ,setFlightInfo] = useState({})


    useEffect(()=>{
        if(!id) {
            Toast.show({
                content: '获取信息参数有误'
            })
            return  setTimeout(()=>{
                history.goBack()
            },1500)
        }
        getFlightInfo(); // 获取航线信息
        getLinkMans();  // 获取联系人信息

    },[])

    const getFlightInfo = async ()=>{
            const res = await $api.post('/flight/getOne',{id})
            const {data,success } = res.data;
            if(!success) return       Toast.show({ content: '获取出错' })
            setFlightInfo(data)
    }

    const getLinkMans = async ()=>{
        const res = await $api.post('/linkman/getAll')
        const {data,success } = res.data;
        if(!success) return       Toast.show({ content: '获取出错' })
        setLinkMan(data)
    }

  /*  useEffect(()=>{
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
*/
    return (
        <div className={style.main}>
            <NavBar onBack={()=> history.goBack() }> 订单信息</NavBar>
            <div className={style.ct}>

                {/* 基本信息 */}
                <div className={style.fbox}>
                    {/* 时间票价 */}
                    <div className={style.ft}>
                        <div className={style.ftime}> { date } { flightInfo.startTime }</div>
                        <div className={style.fprice}>  </div>
                    </div>
                    {/* 上下车站点 */}
                    <div className={style.fstation}>
                        <div className={style.fs}>
                            {flightInfo.startCity}
                        </div>
                        <div className={style.fe}>
                            {flightInfo.arriveCity}
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

                        { linkMan.map(item=>(
                            <div className={style.rideMan}>
                                <div> {item.realName} </div>
                                <div> { item.idNum.slice(0,3) } *** { item.idNum.slice(-3) } </div>
                                <div>  { flightInfo.ticketPrice/100 } </div>
                            </div>
                        ))  }


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
