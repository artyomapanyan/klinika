import {Button, Form, Input, Table} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";
import dark_delete_icon from "../../../../dist/icons/dark_delete_icon.png";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";


function ProvidedServices({appointmentId}) {
    let token = useSelector((state) => state.auth.token);
    const formRef = useRef();

    const [totalItem, setTotalItem] = useState(0)

    const [servisesState, setServisesState] = useState([{
        key: 1,
        name: 'Urology',
        qty: 1,
        price: 500,
        doctor: 'Dr. Fox',
        status: 'paid'

    },
        {
            key: 2,
            name: 'jkldddd ddddddddd',
            qty: 2,
            price: 500,
            doctor: 'Dr. Robert Fox',
            status: 'pending'

        }]);



    useEffect(() => {
        postResource('Appointment', 'AppointmentServices', token, `${appointmentId}/services`).then((response) => {

            console.log(response, 'rrr')
        })
    }, [])

    const addService = () => {
        setServisesState((prevState) => ([
            ...prevState,

            {
                key: prevState[prevState.length-1].key + 1,
                name: '',
                qty: 1,
                price: '',
                doctor: 'Dr. Fox',
                status: 'paid',
                amount: 0
            }
        ]))
    }

    const onDelete = (e, element) => {

        setServisesState(
            servisesState?.filter((el, prevKey) => {
                return element?.key !== el?.key
            })

        )
    }

    const handleInvoiceSelect = (e, key,data) => {



        postResource('InvoiceItem', 'single', token, e).then((response) => {
            console.log(response, e, 'res')
            const selected_item = data.find(u=>u.id===e);

            formRef?.current?.setFieldValue(['servisesState', key, 'qty'], 1)
            // formRef?.current?.setFieldValue(['items', key, 'item_object'], {
            //     id:selected_item.id,
            //     name:selected_item.name
            // })
            formRef?.current?.setFieldValue(['servisesState', key, 'price'], response?.price)
            // formRef?.current?.setFieldValue(['items', key, 'tax'], response?.tax_percentage)
             formRef?.current?.setFieldValue(['servisesState', key, 'amount'], response?.price)
            //
            // formRef?.current?.getFieldValue(['items', key, 'amount'])

            setTimeout(() => {
                console.log(formRef?.current?.getFieldValue(['servisesState', key, 'amount']), 'ref')
                setTotalItem(formRef?.current?.getFieldValue(['servisesState', key, 'amount']))
            }, 1000)


        })

    }

    const changeAny = (value, obj, key) => {
        console.log(+value)
        if (obj === 'qnt') {
            formRef?.current?.setFieldValue(['servisesState', key, value],)
            formRef?.current?.setFieldValue(['servisesState', key, 'amount'], +value * (+formRef?.current?.getFieldValue(['servisesState', key, 'price'])))

        } else if (obj === 'price') {
            formRef?.current?.setFieldValue(['servisesState', key, value],)
            formRef?.current?.setFieldValue(['servisesState', key, 'amount'], +value * (+formRef?.current?.getFieldValue(['servisesState', key, 'qty'])))

        }

        setTotalItem(formRef?.current?.getFieldValue(['servisesState', key, 'amount']))
        console.log(formRef?.current?.getFieldValue(['servisesState', key, 'amount']), 'ref1')
    }

    // console.log(formRef?.current?.getFieldsValue(['servisesState', key, 'qty']))

    return<div style={{background:"#ffffff", margin:'24px 24px', borderRadius: 12}}>
        <Form ref={formRef}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '29px 24px'}}>
                <div>
                    {t('Provided: Services')}
                </div>
                <div>
                    <Button onClick={addService} type={'primary'}>{t('Add item')}</Button>
                </div>
            </div>
            <div className={'provided_services_table'}>

                <table style={{width: '100%'}}>
                    <tbody style={{width: '100%'}}>
                    {
                        servisesState.map((el, key) => {
                            console.log(el?.consultation?.qty)
                            return<tr key={el.key} style={{width: '100%', padding:20, borderTop: '1px dashed #c9c9c7'}}>
                                <td>
                                    <span className={'provided_table_name'}>{el.key}</span>
                                </td>
                                <td>
                                    {
                                        el?.name ? <span className={'provided_table_name'}>{el.name}</span>
                                            : <FormInput label={t('Invoice item')}
                                                         name={'item'}
                                                         inputType={'resourceSelect'}
                                                         rules={[{required: true}]}
                                                         inputProps={{onChange: (e,data) => handleInvoiceSelect(e, key,data)}}
                                                         resource={'InvoiceItem'}
                                            />
                                    }
                                    <span className={'provided_table_name'}>{el.name}</span>
                                </td>
                                <td>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                        <div style={{width: 100}}>
                                            <FormInput label={t('Qty')} name={['servisesState', key, 'qty']} initialValue={el?.qty ? el?.qty : 1}
                                                       onChange={(el) => {
                                                           changeAny(el.target.value,'qnt', key)
                                                       }}
                                                       className={'ssssssssssssssssssssssssssss'}
                                            />
                                        </div>
                                        <div style={{width: 100}}>
                                            <FormInput label={t('price')} name={['servisesState', key, 'price']} initialValue={el?.price ? el?.price : 0}
                                                       onChange={(el) => {
                                                           changeAny(el.target.value,'price', key)
                                                       }}
                                            />
                                        </div>

                                    </div>




                                </td>
                                <td className={'provided_table_bold_text'}>
                                    {el.doctor}
                                </td>
                                <td>
                                    <img src={dark_delete_icon} alt={'dark_delete_icon'} onClick={(e)=>onDelete(e, el)} style={{cursor: 'pointer'}}/>
                                </td>


                                <td style={{width: 200}}>
                                    <div>
                                        <span className={'provided_table_bold_text'}>{el?.price ? (el?.price * el?.qty) : totalItem}  SAR</span>
                                        {
                                            el.status === 'paid' ? <span className={'provided_table_status_payed'}>{el.status}</span>
                                                : <span className={'provided_table_status_pending'}>{el.status}</span>
                                        }

                                    </div>

                                </td>
                            </tr>


                        })
                    }
                    </tbody>
                </table>


            </div>
        </Form>
    </div>
}
export default ProvidedServices;