import {Button, Form, Input} from "antd";
import {t} from "i18next";
import FormInput from "../../../../Fragments/FormInput";
import React, {useState} from "react";
import dark_delete_icon from "../../../../../dist/icons/dark_delete_icon.png";
import {safePreventDefault} from "react-slick/lib/utils/innerSliderUtils";
import {postResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";


function CurrentVisitServices({id}) {
    let token = useSelector((state) => state.auth.token);
    const [servisesState, setServisesState] = useState([])
    const [sendState, setSendState] = useState({})
    const [qntState, setQntState] = useState(1)
    const [itemsState, setItemsState] = useState([])


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

    const onFinish = (values) => {
        postResource('Appointment', 'SaveServiceItems', token, `${id}/saveServiceItems`, sendState).then((response) => {
            setItemsState(response?.service_invoice?.items)
            console.log(response, 'rrr')
        })
    }

    const handleInvoiceSelect = (e,data) => {
        const selected_item = data.find(u=>u.id===e);

        console.log(selected_item, 'item')
        console.log(+qntState * (+selected_item?.price + (selected_item?.price / 100 * selected_item?.tax_percentage)), 'amount')
        setSendState({
                items: [{
                    "qnt": qntState,
                    "tax": selected_item?.tax_percentage,
                    "price": selected_item?.price,
                    "amount": +qntState * (+selected_item?.price + (selected_item?.price / 100 * selected_item?.tax_percentage)),
                    "discount": selected_item?.tax_percentage,
                    "item_object": {
                        "id": selected_item?.id,
                        "name": selected_item?.name,
                    },
                    item: selected_item?.id,


                }]

            }

        )




    }
    console.log(sendState)
    const qntChange = (value) => {

        setQntState(value)
        setSendState((prevState) => ({




        }))
    }


    return <div style={{marginTop: 30}}>
        <Form >
            <div className={'current_visit_text'}>
                {t('Current visit Services')}
            </div>
            <div className={'current_visit_item'}>
                <div style={{width: '85%'}}>
                    <FormInput label={t('Invoice item')}
                               name={'item'}
                               inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               inputProps={{onChange: (e,data) => handleInvoiceSelect(e,data)}}
                               resource={'InvoiceItem'}
                    />
                </div>
                <div>
                    <FormInput label={t('Qnt')} name={'qnt'} initialValue={qntState} inputType={'number'}
                               onChange={(e)=>{qntChange(e.target.value) }}
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
                    <Button onClick={onFinish} className={"current_visit_add_btn"} type={'primary'}>{t('Add')}</Button>
                </div>
            </div>

            <div style={{marginTop: 10}}>
                {
                    itemsState?.map((el, key) => {
                        console.log(el)
                        return <div key={key} className={'current_visit_name'}>

                            <div style={{width: '90%', marginTop: -20}} className={'aass'}>
                                <Form.Item >
                                    <Input value={el?.item_object?.name}/>
                                </Form.Item>
                            </div>
                            <div style={{marginTop: -8}}>
                                x{el?.qnt}
                            </div>
                            <div  style={{marginTop: -10}}>
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