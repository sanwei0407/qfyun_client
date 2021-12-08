
// 样式的导入
import style from '../assets/css/home.module.css'
import { useState } from 'react'

import {Input } from 'antd-mobile'
const Home = ()=>{

    // 起点城市
    const [startCity,setStartCity]  = useState('')
    const [arriveCity,setArriveCity]  = useState('')

    // 热门线路
    const [hotList,setHotList] = useState([])

    return (
        <div className={style.main}>
              <div className={style.ct}>
                  <div  className={style.cityZone}>
                      <div>
                          <div className={style.ipt}> <Input /> </div>
                          <div> <Input /> </div>
                      </div>

                  </div>
              </div>
              <div className={style.nav}></div>
        </div>
    )
}
export default  Home;
