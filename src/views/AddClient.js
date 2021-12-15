
import style from '../assets/css/addclient.module.css'
import { NavBar ,DatePicker,Form,Selector,Input,Button,Toast} from 'antd-mobile/2x'
import {useHistory} from "react-router-dom";
import { useState } from "react";
import $api from '../api'

const AddClient = ()=>{

    const history = useHistory()

    const [ type,setType] =useState()
    const [ realName,setRealName] =useState()
    const [ phone,setPhone] =useState()
    const [ idNum,setIdNum] =useState()

    const doadd = async ()=>{
        const res = await  $api.post('/linkman/add',{
            realName,idNum,phone,type
        })
        const { success,data } = res.data;
        if(success){
            Toast.show({
                content:'添加成功',
            })

            setTimeout(()=> history.goBack() ,1500)
        }

    }

    return (
        <div className={style.main}>
            <NavBar onBack={()=> history.goBack() }>新增乘车人</NavBar>
            <div className={style.ct}>
                <Form
                    layout={'horizontal'}
                >
                    <Form.Item name='type' label='乘车人类型'>
                        <Selector
                            onChange={(v)=>setType(v[0])}
                            columns={2}
                            options={[
                                { label: '成人', value: 'adult' },
                                { label: '儿童', value: 'child' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item   name='realname' label='乘客姓名'>
                       <Input placeholder={"请填写乘车人的真实姓名"}  onChange={val => setRealName(val) }/>
                    </Form.Item>
                    <Form.Item   name='phone' label='联系电话'  >
                        <Input placeholder={"请填写乘车人的联系电话"} onChange={val => setPhone(val) } />
                    </Form.Item>
                    <Form.Item   name='idtype' label='证件类型'>
                         当前仅支持身份证
                    </Form.Item>
                    <Form.Item   name='idnum' label='证件号码'  >
                        <Input placeholder={"请填写乘车人的证件号码"} onChange={val => setIdNum(val) } />
                    </Form.Item>
                </Form>
            </div>
            <Button  color='warning' size={'large'} onClick={doadd}> 立即添加 </Button>
        </div>
    )
}
export default  AddClient;

