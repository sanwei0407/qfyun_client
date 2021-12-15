import {act} from "@testing-library/react";

const initState = {
    startCity: '',
    arriveCity:'',
    preOrderInfo: null
}

// 声明 actionCreator
const actions = {
    chaneStartCity(payload) {
        return { type:'chaneStartCity',payload }
    },
    changeArriveCity(payload) {
        return { type:'changeArriveCity',payload }
    },
    setPreOrderInfo(payload) {
        return { type:'setPreOrderInfo',payload }
    }
}


const reducer = (state=initState,action)=>{

    const newState =  {...state }

    const { type } = action;

    console.log(type,action)
    switch (type){
        case 'chaneStartCity':
            newState.startCity = action.payload;
            break
        case 'changeArriveCity':
            newState.arriveCity = action.payload;
        case 'setPreOrderInfo':
            newState.preOrderInfo = action.payload;
        default:

    }


    return newState

}

export  const  { chaneStartCity,changeArriveCity,setPreOrderInfo} = actions
export  default  reducer
