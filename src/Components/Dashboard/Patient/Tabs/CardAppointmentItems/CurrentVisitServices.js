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

    const onDelete = (element, key) => {
        setServisesState((prevState) => ([
            prevState?.filter((el, prevKey) => {
                return element?.id !== el?.id
            })

        ]))
    }



    return <div style={{marginTop: 30}}>
        <Form>
            <div className={'current_visit_text'}>
                Current visit Services
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
                    <FormInput label={t('Qnt')} name={'qnt'} initialValue={1} inputType={'number'}/>
                </div>
                <div>
                    <Button onClick={onAdd} className={"current_visit_add_btn"} type={'primary'}>Add</Button>
                </div>
            </div>

            {
                servisesState?.map((el, key) => {
                    return <div key={key} className={'current_visit_item'}>

                        <div style={{width: '90%'}}>
                            <Form.Item>
                                <Input/>
                            </Form.Item>
                        </div>
                        <div>
                            x1
                        </div>
                        <div onClick={()=>onDelete(el, key)}>
                            <img src={dark_delete_icon} alt={'dark_delete_icon'} />
                        </div>
                    </div>
                })
            }


        </Form>
    </div>
}
export default CurrentVisitServices;