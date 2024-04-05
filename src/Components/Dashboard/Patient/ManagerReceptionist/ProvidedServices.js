import {Button, Form, Input, Table} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";
import dark_delete_icon from "../../../../dist/icons/dark_delete_icon.png";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import Preloader from "../../../Preloader";


function ProvidedServices({appointmentId}) {
    let token = useSelector((state) => state.auth.token);
    const formRef = useRef();

    const [totalItem, setTotalItem] = useState(0)
    const [serState, setSerState] = useState({})
    const [itemsState, setItemsState] = useState([])
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [loading, setLoading] = useState(false)





    useEffect(() => {
        setLoading(true)
        postResource('Appointment', 'AppointmentServices', token, `${appointmentId}/services`).then((response) => {
            setSerState(response)
            setItemsState(response?.service_invoice?.items)
            setLoading(false)

        })
    }, [])

    const addService = () => {
        setItemsState((prevState) => ([
            ...prevState,

            {
                key: Math.random(),
                name: '',
                qty: 1,
                price: '',
                doctor: 'Dr. Fox',
                status: 'paid',
                amount: 0
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

        postResource('Appointment', 'SaveServiceItems', token, `${appointmentId}/removeServiceItem`, deleteValues).then((response) => {
            setSerState(response)
            setItemsState(response?.service_invoice?.items)
            setDeleteLoading(false)

        })
    }

    const onDeleteNewItem = (event, el, key) => {

        let delItem = itemsState.filter((a) => {
            return el.key !== a.key
        })

        setItemsState(delItem)
    }

    const handleInvoiceSelect = (e, key,data) => {

        console.log(e, key, data)
        const selected_item = data.find(u=>u.id===e);
        let val = {
            amount: (+selected_item?.price + (selected_item?.price / 100 * selected_item?.tax_percentage)),
            discount: selected_item?.tax_percentage,
            item: selected_item?.id,
            item_object: {id: selected_item?.id, name: selected_item?.name},
            price: selected_item?.price,
            qnt: 1,
            tax: selected_item?.tax_percentage,
        }
        console.log(selected_item)
        postResource('Appointment', 'SaveServiceItems', token, `${appointmentId}/saveServiceItems`, val).then((response) => {

            postResource('Appointment', 'AppointmentServices', token, `${appointmentId}/services`).then((response) => {
                setSerState(response)
                setItemsState(response?.service_invoice?.items)

            })

        })
        // postResource('InvoiceItem', 'single', token, e).then((response) => {
        //     console.log(response, e, 'res')
        //     const selected_item = data.find(u=>u.id===e);
        //
        //     formRef?.current?.setFieldValue(['servisesState', key, 'qty'], 1)
        //     // formRef?.current?.setFieldValue(['items', key, 'item_object'], {
        //     //     id:selected_item.id,
        //     //     name:selected_item.name
        //     // })
        //     formRef?.current?.setFieldValue(['servisesState', key, 'price'], response?.price)
        //     // formRef?.current?.setFieldValue(['items', key, 'tax'], response?.tax_percentage)
        //      formRef?.current?.setFieldValue(['servisesState', key, 'amount'], response?.price)
        //     //
        //     // formRef?.current?.getFieldValue(['items', key, 'amount'])
        //
        //     setTimeout(() => {
        //         console.log(formRef?.current?.getFieldValue(['servisesState', key, 'amount']), 'ref')
        //         setTotalItem(formRef?.current?.getFieldValue(['servisesState', key, 'amount']))
        //     }, 1000)
        //
        //
        // })

    }

    const changeAny = (value, obj, key, el) => {
        console.log(value,obj, key, el )


        if (obj === 'qnt') {
            formRef?.current?.setFieldValue(['servisesState', key, value],)
            formRef?.current?.setFieldValue(['servisesState', key, 'amount'], +value * (+formRef?.current?.getFieldValue(['servisesState', key, 'price'])))

            setTimeout(() => {
                let val = {
                    amount: (+el?.price + (el?.price / 100 * (+el?.tax))),
                    discount: el?.discount,
                    item: el?.item,
                    item_object: {id: el?.item, name: el?.item_object?.name},
                    price: el?.price,
                    qnt: value,
                    tax: el?.tax,
                }

                postResource('Appointment', 'SaveServiceItems', token, `${appointmentId}/saveServiceItems`, val).then((response) => {

                    postResource('Appointment', 'AppointmentServices', token, `${appointmentId}/services`).then((response) => {
                        setSerState(response)
                        setItemsState(response?.service_invoice?.items)

                    })

                })
            }, 1000)




        } else if (obj === 'price') {
            formRef?.current?.setFieldValue(['servisesState', key, value],)
            formRef?.current?.setFieldValue(['servisesState', key, 'amount'], +value * (+formRef?.current?.getFieldValue(['servisesState', key, 'qty'])))

            let val = {
                amount: (value + (value / 100 * (+el?.tax))),
                discount: el?.discount,
                item: el?.item,
                item_object: {id: el?.item, name: el?.item_object?.name},
                price: value,
                qnt: el?.qnt,
                tax: el?.tax,
            }

            postResource('Appointment', 'SaveServiceItems', token, `${appointmentId}/saveServiceItems`, val).then((response) => {

                postResource('Appointment', 'AppointmentServices', token, `${appointmentId}/services`).then((response) => {
                    setSerState(response)
                    setItemsState(response?.service_invoice?.items)

                })

            })

        }

        setTotalItem(formRef?.current?.getFieldValue(['servisesState', key, 'amount']))
        console.log(formRef?.current?.getFieldValue(['servisesState', key, 'qty']), 'ref1')
    }

     console.log(itemsState, 'i s')

    return<div style={{background:"#ffffff", margin:'24px 24px', borderRadius: 12}}>
        {
            loading ? <Preloader/> : <Form ref={formRef}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '29px 24px'}}>
                    <div>
                        <span className={'provided_services_provaded_text'}>{t('Provided')}:</span> <span className={'provided_services_services_text'}>{t('Services')}</span>
                    </div>
                    <div>
                        <Button onClick={addService} type={'primary'} className={'provided_services_add_btn'}>{t('Add item')}</Button>
                    </div>
                </div>
                <div className={'provided_services_table'}>

                    <table style={{width: '100%'}}>
                        <tbody style={{width: '100%'}}>


                        <tr key={serState?.id} style={{width: '100%', padding:20, borderTop: '1px dashed #c9c9c7'}}>
                            <td>
                                <span className={'provided_table_name'}>{serState?.primary_invoice?.id}</span>
                            </td>
                            <td>
                                <span className={'provided_table_name'}>{serState?.primary_invoice?.specialty_title}</span>
                            </td>

                            <td className={'provided_table_bold_text'}>
                                {serState?.primary_invoice?.description}
                            </td>
                            <td className={'provided_table_bold_text'}>
                                {serState?.primary_invoice?.by}
                            </td>

                            <td className={'provided_table_bold_text'}>

                            </td>


                            <td style={{width: 200}}>
                                <div>
                                    <span className={'provided_table_bold_text'}>{serState?.primary_invoice?.amount_without_tax} SAR</span>
                                    {
                                        serState?.primary_invoice?.status === 2 ? <span className={'provided_table_status_payed'}>Paid</span> :
                                            <span className={'provided_table_status_pending'}>pending</span>
                                    }



                                </div>

                            </td>
                        </tr>

                        {
                            itemsState?.map((el, key) => {

                                return<tr key={el.item} style={{width: '100%', padding:20, borderTop: '1px dashed #c9c9c7'}}>
                                    <td>
                                        <span className={'provided_table_name'}>{el.item}</span>
                                    </td>
                                    <td>
                                        {
                                            el.item ? <span className={'provided_table_name'}>{el?.item_object?.name}</span>
                                                : <div style={{marginLeft: -20}}>
                                                    <FormInput label={t('Invoice item')}
                                                               name={'item'}
                                                               inputType={'resourceSelect'}
                                                               rules={[{required: true}]}
                                                               inputProps={{onChange: (e,data) => handleInvoiceSelect(e, key,data)}}
                                                               resource={'InvoiceItem'}


                                                    />
                                                </div>
                                        }
                                        {/*<span className={'provided_table_name'}>{el?.by}</span>*/}
                                    </td>
                                    <td>
                                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                            <div style={{width: 100}}>
                                                <FormInput label={t('Qty')} name={['servisesState', key, 'qty']} initialValue={el?.qnt ? el?.qnt : 1}
                                                           inputType={'number'}
                                                           onChange={(elem) => {
                                                               changeAny(elem.target.value,'qnt', key, el)
                                                           }}

                                                />
                                            </div>
                                            <div style={{width: 100}}>
                                                <FormInput label={t('price')} name={['servisesState', key, 'price']} initialValue={el?.price ? el?.price : 0}
                                                           onChange={(elem) => {
                                                               changeAny(elem.target.value,'price', key, el)
                                                           }}
                                                />
                                            </div>

                                        </div>




                                    </td>
                                    <td className={'provided_table_bold_text'}>
                                        {el?.by}
                                    </td>
                                    <td>
                                        <Button style={{border: 'none'}} loading={deleteLoading}
                                                onClick={el.item ? (e)=>onDelete(e, el, key) :
                                                    (event)=>onDeleteNewItem(event, el, key)}
                                        >
                                            <img src={dark_delete_icon} alt={'dark_delete_icon'}  />
                                        </Button>

                                    </td>


                                    <td style={{width: 200}}>
                                        <div>
                                            <span className={'provided_table_bold_text'}>{el?.price ? formRef?.current?.getFieldValue(['servisesState', 1, 'qty']) ? el?.amount_without_tax * formRef?.current?.getFieldValue(['servisesState', key, 'qty']) : el?.amount_without_tax : totalItem}  SAR</span>
                                            {
                                                el.status === 2 ? <span className={'provided_table_status_payed'}>{el.status===2 ? 'paid' : 'pending'}</span>
                                                    : <span className={'provided_table_status_pending'}>pending</span>
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
        }

    </div>
}
export default ProvidedServices;