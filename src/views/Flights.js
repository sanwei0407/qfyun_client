import style from '../assets/css/flights.module.css'
import { NavBar ,DatePicker,Toast} from 'antd-mobile/2x'
import { useHistory } from 'react-router-dom'
import { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import $api from '../api'
import dayjs from 'dayjs'

const Flights = ()=>{

    const history = useHistory();

    // 从redux当中读取 出发城市和达到城市名称

    const st = useSelector(state=>state);
    // 选择的日期
    const [sDate,setSdate] = useState(dayjs());
    const [visible,setVisible] = useState(false)

    // 线路信息
    const [ flights,setFlights ] = useState([])

    const preDay =()=>{
        setSdate( sDate.subtract(1,'day') )
    }
    const nextDay =()=>{
        setSdate( sDate.add(1,'day') )
    }

    useEffect(()=>{
        getFlightList()
    },[])


    // 获取航线信息

    const  getFlightList = async ()=>{

            if(!st.startCity || !st.arriveCity) {
                Toast.show({
                    content: '请正确的选贼开始城市和接达到城市'
                })
                return  setTimeout(()=>{
                    history.goBack()
                },1500)
            }
            const res = await $api.post('/flight/getAll',{
                startCity:st.startCity,
                arriveCity: st.arriveCity
            })
            const { data,success } = res.data;
            if(!success) return       Toast.show({ content: '获取出错' })

           setFlights(data)
    }

    return (
        <div className={style.main}>

            <NavBar onBack={()=> history.goBack() }> 班次选择</NavBar>
            <div className={style.date}>
                <div onClick={preDay}> 前一天 </div>
                <div onClick={()=>setVisible(true)}>   <i className={"iconfont icon-rili"}></i> { sDate.format('YYYY-MM-DD') }  </div>
                <div onClick={nextDay}> 后一天 </div>
            </div>
            {/*列表*/}
            <div className={style.ct}>
                { flights.map(item=>(
                    <div className={style.fbox} key={item._id}>
                        {/* 时间票价 */}
                        <div className={style.ft}>
                            <div className={style.ftime}>  { item.startTime.slice(0,5)  } </div>
                            <div className={style.fprice}> ￥{ item.ticketPrice/100 } 元 </div>
                        </div>
                        {/* 上下车站点 */}
                        <div className={style.fstation}>
                            <div className={style.fs}>
                                { item.startCity }
                            </div>
                            <div className={style.fe}>
                                { item.arriveCity }
                            </div>
                        </div>
                        <div className={style.fb}>
                            <div> 余票充足  </div>
                            <div className={style.fbbt} onClick={()=>{
                                history.push({
                                    pathname:'/Order',
                                    search:'id='+item._id + '&date='+sDate.format("MM-DD"),

                                })
                            }}>  选择班次  </div>
                        </div>




                    </div>
                )) }

            </div>



            {/* 日期选择器 */}

            <DatePicker
                title='时间选择'
                visible={visible}
                onClose={() => {
                    setVisible(false)
                }}
                min={ new Date() }
                defaultValue={ sDate.$d }
                onConfirm={val => {
                    setSdate(dayjs(val))
                }}
            />

        </div>
    )
}
export default  Flights;
