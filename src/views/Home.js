
// 样式的导入
import style from '../assets/css/home.module.css'
import { useEffect, useState } from 'react'
import { useHistory ,useLocation} from 'react-router-dom'
import  { useDispatch } from 'react-redux'
import {Input ,Button,Toast} from 'antd-mobile/2x'
import { chaneStartCity,changeArriveCity} from "../store/reducer";
import $api from '../api'

const Home = (props)=>{
  
    
    // 首页需要去从 query参数当中得到 token 并把token保存到 localstore当中
    const location = useLocation();
    const token = new URLSearchParams(location.search).get("token");
    window.localStorage.setItem('token',token)

    // 起点城市
    const [startCity,setStartCity]  = useState('')
    const [arriveCity,setArriveCity]  = useState('')

    // 热门线路
    const [hotList,setHotList] = useState([])

    // 得到history对象
    const history = useHistory()
    const dispatch = useDispatch()

    // 获取首页的热门线路

    useEffect(()=>{
        gethot()
    },[])

    const gethot = async ()=>{
        const res = await $api.post('/common/hotline');
        const{ data } = res.data;
        setHotList(data)
    }

    // 切换起始点
    const exCity = () => {
        setStartCity(arriveCity)
        setArriveCity(startCity)
    }

    
    // 点击搜索
    const handleSearch = ()=>{
         // 把我们的起终点 设置到 redux
        dispatch( chaneStartCity(startCity) )
        dispatch( changeArriveCity(arriveCity) )
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
                         
                         { hotList.map((item,idx)=>(
                            <div className={style.hotItem} key={idx}  onClick={()=>{
                                const {startCity, arriveCity} = item;
                                setStartCity(item.startCity);
                                setArriveCity(item.arriveCity);

                                 // 把我们的起终点 设置到 redux
                                dispatch( chaneStartCity(startCity) )
                                dispatch( changeArriveCity(arriveCity) )
                                // 跳转
                                history.push({ pathname:'Flights', search:`?startCity=${startCity}&arriveCity=${arriveCity}`  })

                            }}>
                                <div className={style.dot}>  </div>
                                <div> {item.startCity} </div>
                                <div> {item.arriveCity} </div>
                            </div>
                         ))}
                         
                      

                      </div>

                  </div>

              </div>
              <div className={style.nav}>
                  <div className={style.navItem}>
                      <div> <i className=" iconfont icon-menpiao "></i> </div>
                      <div>班车</div>
                  </div>

                  <div className={style.navItem} onClick={()=>history.push('/MyOrder')}>
                      <div> <i className=" iconfont icon-qichepiao "></i> </div>
                      <div> 乘车</div>
                  </div>

                  <div className={style.navItem} onClick={()=>{
                      Toast.show({content:'功能即将上线'})
                  }} >
                      <div> <i className=" iconfont   icon-ertongpiao "></i> </div>
                      <div> 我的 </div>

                  </div>

              </div>
        </div>
    )
}
export default  Home;
