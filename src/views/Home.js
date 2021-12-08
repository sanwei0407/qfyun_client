
// 样式的导入
import style from '../assets/css/home.module.css'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {Input ,Button} from 'antd-mobile'
const Home = ()=>{

    // 起点城市
    const [startCity,setStartCity]  = useState('')
    const [arriveCity,setArriveCity]  = useState('')

    // 热门线路
    const [hotList,setHotList] = useState([])

    // 得到history对象
    const history = useHistory()

    // 切换起始点
    const exCity = () => {
        setStartCity(arriveCity)
        setArriveCity(startCity)
    }

    // 点击搜索
    const handleSearch = ()=>{
         // 把我们的起终点 设置到 redux

        // 跳转
        history.push({ pathname:'Flights', search:`?startCity=${startCity}&arriveCity=${arriveCity}`  })

    }
    return (
        <div className={style.main}>
              <div className={style.ct}>
                  {/*  起始点处理  */}
                  <div  className={style.cityZone}>
                      <div>
                          <div className={style.ipt}>
                              <input type="text"  value={startCity} onInput={ev=> setStartCity(ev.target.value) }  placeholder="选择上车地址" />
                          </div>
                          <div>
                              <input type="text" value={arriveCity} onInput={ev=> setArriveCity(ev.target.value) }  placeholder="选择下车地址"  />
                          </div>
                      </div>
                      <div className={style.ex} onClick={ exCity  }>
                          <i className="iconfont icon-24gl-swapVertical2"></i>
                      </div>

                  </div>

              {/*    搜索按键  */}
                  <button className={style.searchBt} onClick={ handleSearch } >  立即搜索  </button>


              {/*    推荐线路  */}
                  <div className={style.hotBox}>
                      <div className={style.hotTitle}> 推荐线路 </div>

                      <div style={{display:'flex',flexWrap:'wrap',justifyContent:"space-between"}}>
                          <div className={style.hotItem}>
                                <div className={style.dot}>  </div>
                                <div> 深圳市 </div>
                                <div> 广州市 </div>
                          </div>
                          <div className={style.hotItem}>
                              <div className={style.dot}>  </div>
                              <div> 深圳市 </div>
                              <div> 广州市 </div>
                          </div>
                          <div className={style.hotItem}>
                              <div className={style.dot}>  </div>
                              <div> 深圳市 </div>
                              <div> 广州市 </div>
                          </div>
                          <div className={style.hotItem}>
                              <div className={style.dot}>  </div>
                              <div> 深圳市 </div>
                              <div> 广州市 </div>
                          </div>

                      </div>

                  </div>

              </div>
              <div className={style.nav}>
                  <div className={style.navItem}>
                      <div> <i className=" iconfont icon-menpiao "></i> </div>
                      <div>班车</div>
                  </div>

                  <div className={style.navItem}>
                      <div> <i className=" iconfont icon-qichepiao "></i> </div>
                      <div> 乘车</div>
                  </div>
                  <div className={style.navItem}>
                      <div> <i className=" iconfont   icon-ertongpiao "></i> </div>
                      <div> 我的 </div>

                  </div>

              </div>
        </div>
    )
}
export default  Home;
