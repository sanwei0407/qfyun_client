import style from '../assets/css/flights.module.css'
import { NavBar ,DatePicker} from 'antd-mobile/2x'
import { useHistory } from 'react-router-dom'
import { useState } from "react";
import dayjs from 'dayjs'

const Flights = ()=>{

    const history = useHistory();

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
                    <div className={style.fbox}>
                        {/* 时间票价 */}
                        <div className={style.ft}>
                            <div className={style.ftime}> 17:30</div>
                            <div className={style.fprice}> ￥50 </div>
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
                        <div className={style.fb}>
                            <div> 余票充足  </div>
                            <div className={style.fbbt}>  选择班次  </div>
                        </div>




                    </div>
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
