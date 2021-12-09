
import style from '../assets/css/addclient.module.css'
import { NavBar ,DatePicker,Form,Selector,Input,Button} from 'antd-mobile/2x'
import {useHistory} from "react-router-dom";
import { useState } from "react";


const AddClient = ()=>{

    const history = useHistory()

    const [ type,setType] =useState()
    const [ realname,setRealName] =useState()
    const [ phone,setPhone] =useState()
    const [ idnum,setIdNum] =useState()

    return (
        <div className={style.main}>
            <NavBar onBack={()=> history.goBack() }>新增乘车人</NavBar>
            <div className={style.ct}>
                <Form
                    layout={'horizontal'}
                >
                    <Form.Item name='type' label='乘车人类型'>
                        <Selector
                            columns={2}
                            options={[
                                { label: '成人', value: 'adult' },
                                { label: '儿童', value: 'child' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item   name='realname' label='乘客姓名'>
                       <Input placeholder={"请填写乘车人的真实姓名"} />
                    </Form.Item>
                    <Form.Item   name='phone' label='联系电话'>
                        <Input placeholder={"请填写乘车人的联系电话"} />
                    </Form.Item>
                    <Form.Item   name='idtype' label='证件类型'>
                         当前仅支持身份证
                    </Form.Item>
                    <Form.Item   name='idnum' label='证件号码'>
                        <Input placeholder={"请填写乘车人的证件号码"} />
                    </Form.Item>
                </Form>
            </div>
            <Button  color='warning' size={'large'}> 立即添加 </Button>
        </div>
    )
}
export default  AddClient;
