import {Button, Form, Input} from "antd";
import {t} from "i18next";
import FormInput from "../../../../Fragments/FormInput";
import React, {useEffect, useRef, useState} from "react";
import dark_delete_icon from "../../../../../dist/icons/dark_delete_icon.png";
import {safePreventDefault} from "react-slick/lib/utils/innerSliderUtils";
import {postResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import Preloader from "../../../../Preloader";


function CurrentVisitServices({id, bigData}) {
    let token = useSelector((state) => state.auth.token);
    let itemRef = useRef()
    const [servisesState, setServisesState] = useState([])
    const [sendState, setSendState] = useState({})
    const [qntState, setQntState] = useState(1)
    const [itemsState, setItemsState] = useState([])
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)


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
        setDeleteLoading(true)
        console.log(e, element, key)
        let deleteValues = {
            "item": element?.item,
            "qnt": element?.qnt,
            "discount": element?.discount
        }

        postResource('Appointment', 'SaveServiceItems', token, `${id}/removeServiceItem`, deleteValues).then((response) => {
            setItemsState(response?.service_invoice?.items)
            setDeleteLoading(false)

        })
    }

    const onFinish = (values) => {
        setLoading(true)
        console.log(sendState)
        postResource('Appointment', 'SaveServiceItems', token, `${id}/saveServiceItems`, sendState).then((response) => {
            setItemsState(response?.service_invoice?.items)
            setQntState(1)

            setLoading(false)

        })
    }

    useEffect(() => {
        postResource('Appointment', 'AppointmentServices', token, `${id}/services`).then((response) => {
            setItemsState(response?.service_invoice?.items)

        })
    }, [])

    const handleInvoiceSelect = (e,data) => {
        const selected_item = data.find(u=>u.id===e);


        setSendState({

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




            }

        )




    }

    const qntChange = (value) => {

        setQntState(value)
        setSendState((prevState)=>(
            {
                ...prevState,
                qnt: value,

            }
        )

        )

    }

    console.log(bigData)

    return <div style={{marginTop: 30}}>
        <div className={'current_visit_text'}>
            {t('Current visit Services')}
        </div>
        {
            loading ? <Preloader small={20}/> : bigData?.status != 2 ? <Form ref={itemRef} onFinish={onFinish}>


                <div className={'current_visit_item'}>
                    <div style={{width: '85%'}} >
                        <FormInput label={t('Invoice item')}
                                   name={'item'}
                                   inputType={'resourceSelect'}
                                   rules={[{required: true}]}
                                   inputProps={{onChange: (e,data) => handleInvoiceSelect(e,data)}}
                                   resourceParams={{
                                       clinic: bigData.clinic.id
                                   }}
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
                        <Button htmlType={'submit'} className={"current_visit_add_btn"} type={'primary'}>{t('Add')}</Button>
                    </div>
                </div>

                <div style={{marginTop: 10}}>
                    {
                        loading ? <Preloader small={40}/> :  itemsState?.map((el, key) => {

                            return <div key={key} className={'current_visit_name'}>

                                <div style={{width: '90%', marginTop: -20}} className={'aass'}>
                                    <Form.Item >
                                        <Input value={el?.item_object?.name}/>
                                    </Form.Item>
                                </div>
                                <div style={{marginTop: -8}}>
                                    x{el?.qnt}
                                </div>
                                <Button className={'delete_button_current_service'} loading={deleteLoading}  onClick={(e)=>onDelete(e, el, key)} >
                                    <img src={dark_delete_icon} alt={'dark_delete_icon'}/>
                                </Button>
                            </div>
                        })
                    }
                </div>




            </Form> : <div style={{marginTop: 10}}>
                <table style={{width: '100%'}}>
                    <tbody style={{width: '100%'}}>

                    {
                        itemsState?.map((el, key) => {
                            console.log(el)
                            return<tr key={el.item} style={{width: '100%', padding: 30, height: 48, borderBottom: '1px dashed #A6A7BA'}} className={'current_visit_table_tr'}>

                                <td>
                                    {el?.item_object?.name}
                                </td>

                                <td align={'right'}>
                                    x{el?.qnt}
                                </td>

                                <td style={{width: 100}} align={'right'}>
                                    {el?.price} SAR
                                </td>
                            </tr>


                        })
                    }


                    </tbody>
                </table>
            </div>
        }

    </div>
}
export default CurrentVisitServices;