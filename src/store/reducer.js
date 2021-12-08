
const initState = {
    startCity: '',
    arriveCity:''
}

// 声明 actionCreator
const actions = {
    setStartCity(payload) {
        return { type:'setStartCity',payload }
    },
    setArriveCity(payload) {
        return { type:'arriveCity',payload }
    }
}


const reducer = (state=initState,action)=>{

    const newState =  {...state }



    return newState

}

export  const  { setStartCity,setArriveCity} = actions
export  default  reducer
