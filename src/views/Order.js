import style from '../assets/css/order.module.css'
import {NavBar, DatePicker, Dialog, Checkbox, Toast, Selector, CheckList, Form, Input } from 'antd-mobile/2x'
import {useHistory,useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { setPreOrderInfo  } from '../store/reducer'
import $api from '../api'
const Order = ()=>{

    const history = useHistory();
    const location = useLocation(); // 通过id 去获取航线信息  也可以从上个页面跳转的之后直接通过state传递

    let id = new URLSearchParams(location.search).get('id');
    let date = new URLSearchParams(location.search).get('date');




    const [ linkMan,setLinkMan ] = useState([ ]) // 乘车人列表
    const [flightInfo ,setFlightInfo] = useState({}) // 航班详细信息
    const [startStation,setStartStation] = useState(''); // 出发站点
    const [arriveStation,setArriveStation] = useState(''); // 到达站点
    const [who,setWho] = useState([])
    const [phone,setPhone] =useState('')
    const [code,setCode] = useState('')



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


    useEffect(()=>{
        console.log('flightinfo',flightInfo)
    },[flightInfo])
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

    const st = useSelector(state=>state) // 获取redux的state
    const dispatch = useDispatch(); // redux 分发器
  //  下单
    const handleOrder = async()=>{

        const { startCity,arriveCity } = st;

        const startStationId = startStation;
        const arriveStationId = arriveStation;
        const orderDate = new Date().getFullYear() + '-'+date +' ' +flightInfo.startTime;
        console.log('orderDta',orderDate)
        const flightNum = flightInfo.flightNum;
        const linkMan =  who

        // 数据过滤
        if(!/^1[2-9]\d{9}$/.test(phone)) return Toast.show({content:'请填写正确的手机号码'})
        if(linkMan.length === 0 ) return Toast.show({content:'请选择乘车人'})
        if(!startStationId ) return Toast.show({content:'请选出出发站点'})
        if(!arriveStationId ) return Toast.show({content:'请选择到达站点'})
        if(!code ) return Toast.show({content:'请获取短信验证码'})

        const postData = {
            startCity,
            arriveCity,
            startStationId,
            arriveStationId,
            orderDate: new Date(orderDate),
            flightNum,
            linkMan,
            phone,
            code
        }

       const _res = await $api.post('/order/preOrder',postData);

        const { success,data, } = _res.data;
        if(!success) return Toast.show({content:'下单有误'})
         Toast.show({content:'下单成功请立即支付'})
         dispatch(setPreOrderInfo(postData))
         history.push('/OrderDetail?id='+data )

    }

  //  获取验证码

  const handleGetCode = async()=>{

    if(!phone) return Toast.show({content:'请输入手机号码'})
      let res = await $api.post('/common/sendSms',{
        phone
      })

      const { success,info,code} = res.data;
      if(success) return Toast.show({content: code})
      Toast.show({content: '获取有误'})
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
                        <div className={style.fs}>   {flightInfo.startCity}   </div>

                        <div>
                                { flightInfo.startStations &&  <Selector
                                    onChange={val=>  setStartStation(val[0])  }
                                    options={ flightInfo.startStations.map(item=>(
                                    {
                                        label:item,
                                        value:item
                                    }
                                )) } /> }
                        </div>

                        <div className={style.fe}>
                            {flightInfo.arriveCity}
                        </div>
                        <div>
                            { flightInfo.arriveStations &&    <Selector
                                onChange={val=> setArriveStation(val[0]) }
                                options={ flightInfo.arriveStations.map(item=>(
                                {
                                    label:item,
                                    value:item
                                }
                            )) } /> }
                        </div>


                    </div>




                </div>

                <div style={{marginBottom:'15px'}}>
                    <Form
                        layout={'horizontal'}
                    >
                        <Form.Item name='phone' label='联系电话' extra={ <button onClick={handleGetCode}>获取验证码</button> }>
                            <Input  placeholder="请填写订单联系电话" onChange={val=>setPhone(val)} />
                            
                        </Form.Item>
                        <Form.Item name='code' label='短信验证码'>
                            <Input  placeholder="填写短信验证码" onChange={val=>setCode(val)} />
                        </Form.Item>


                    </Form>
                </div>

                {/*  添加乘车人 */}

                <div className={style.ccr}>
                    <div className={style.hotTitle}> 请选择乘车人 </div>
                    <div className={style.rideZone}>
                        {
                            who.map(item=>(
                                <div className={style.rideManBox} key={item.realName}>
                                    {item.realName}
                                </div>
                            ))
                        }

                        <div className={style.addRide}  onClick={()=>history.push('/AddClient')} > 新增</div>
                    </div>

                    <div className={style.rideManList}>
                        <CheckList multiple onChange={ val => setWho(val) }>
                            { linkMan.map(item=>(
                                <CheckList.Item  value={item} key={item._id}>
                                    <div className={style.rideMan}>
                                        <div> {item.realName} </div>
                                        <div> { item.idNum.slice(0,3) } *** { item.idNum.slice(-3) } </div>
                                        <div>  { flightInfo.ticketPrice/100 } </div>
                                    </div>
                                </CheckList.Item>

                            ))  }
                        </CheckList>



                    </div>
                </div>

                <div className={style.readme}>
                    这里是放置文字提示的地方
                </div>
            </div>

             <div className={style.orderBottom}>
                 <div className={style.orderinfo}>
                     <div >订单金额: <span > { who.length * flightInfo.ticketPrice /100 } </span> </div>

                 </div>
                 <div className={style.payit} onClick={ handleOrder }> 立即下单</div>
             </div>
        </div>
        )
}
export default  Order;
