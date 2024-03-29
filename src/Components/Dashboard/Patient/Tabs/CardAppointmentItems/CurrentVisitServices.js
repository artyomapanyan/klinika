import {Button, Form, Input} from "antd";
import {t} from "i18next";
import FormInput from "../../../../Fragments/FormInput";
import React, {useState} from "react";
import dark_delete_icon from "../../../../../dist/icons/dark_delete_icon.png";
import {safePreventDefault} from "react-slick/lib/utils/innerSliderUtils";


function CurrentVisitServices() {

    const [servisesState, setServisesState] = useState([])


    const onAdd = () => {
        setServisesState((prevState) => ([
            ...prevState,

            {
                id: Math.random(),
                name: 'aaa'
            }
        ]))
    }

    const onDelete = (e, element, key) => {

        setServisesState(
            servisesState?.filter((el, prevKey) => {
                return element?.id !== el?.id
            })

        )
    }



    return <div style={{marginTop: 30}}>
        <Form>
            <div className={'current_visit_text'}>
                {t('Current visit Services')}
            </div>
            <div className={'current_visit_item'}>
                <div style={{width: '85%'}}>
                    <FormInput label={t('Invoice item')}
                               name={'item'}
                               inputType={'resourceSelect'}
                               rules={[{required: true}]}
                        //inputProps={{onChange: (e,data) => handleInvoiceSelect(e, key,data)}}
                               resource={'InvoiceItem'}
                    />
                </div>
                <div>
                    <FormInput label={t('Qnt')} name={'qnt'} initialValue={1} inputType={'number'}
                               rules={[

                                   {
                                       validator:(rule,value)=>{
                                           if(+value < 0){
                                               return Promise.reject('Value cannot be less than 0')
                                           }
                                           return Promise.resolve();
                                       }
                                   }

                               ]}
                               min={0}
                    />
                </div>
                <div>
                    <Button onClick={onAdd} className={"current_visit_add_btn"} type={'primary'}>{t('Add')}</Button>
                </div>
            </div>

            <div style={{marginTop: 10}}>
                {
                    servisesState?.map((el, key) => {
                        return <div key={key} className={'current_visit_name'}>

                            <div style={{width: '90%', marginTop: -20}} className={'aass'}>
                                <Form.Item>
                                    <Input/>
                                </Form.Item>
                            </div>
                            <div style={{marginTop: -8}}>
                                x1
                            </div>
                            <div  style={{marginTop: -9}}>
                                <img src={dark_delete_icon} alt={'dark_delete_icon'} onClick={(e)=>onDelete(e, el, key)} style={{cursor: 'pointer'}}/>
                            </div>
                        </div>
                    })
                }
            </div>




        </Form>
    </div>
}
export default CurrentVisitServices;