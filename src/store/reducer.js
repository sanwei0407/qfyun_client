import {act} from "@testing-library/react";

const initState = {
    startCity: '',
    arriveCity:''
}

// 声明 actionCreator
const actions = {
    chaneStartCity(payload) {
        return { type:'chaneStartCity',payload }
    },
    changeArriveCity(payload) {
        return { type:'changeArriveCity',payload }
    }
}


const reducer = (state=initState,action)=>{

    const newState =  {...state }

    const { type } = action;

    switch (type){
        case 'chaneStartCity':
            newState.startCity = action.payload;
            break
        case 'changeArriveCity':
            newState.arriveCity = action.payload;
        default:

    }


    return newState

}

export  const  { chaneStartCity,changeArriveCity} = actions
export  default  reducer
