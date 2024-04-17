import {useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {postResource} from "../../../Functions/api_calls";
import dayjs from "dayjs";
import Preloader from "../../../Preloader";
import FormInput from "../../../Fragments/FormInput";
import {t} from "i18next";
import {Button, Form, Input} from "antd";
import new_delete_dark_icon from "../../../../dist/icons/new_delete_dark_icon.png";
import moment from 'moment/moment'


export function FollowUpContent({onCancel, modal, loading, formRef}){
    let token = useSelector((state) => state.auth.token);
    let lngs = useSelector(state => state?.app?.current_locale)
    const [date,setDate] = useState(null);
    const [availableTimes,setAvailableTimesState] = useState([]);
    const [dateLoading,setDateLoading] = useState(false);
    const [availableDateState, setAvailableDateState] = useState([])
    const [inputsLoading, setInputsLoading] = useState(false)
    const [itemsState, setItemsState] = useState({})
    let [totalState, setTotalState] = useState(0)
    let [selectedItem, setSelectedItem] = useState(null)
    const [dateWithEmptyHours, setDateWithEmptyHours] = useState([])
    const [emptyDaysLoading, setEmptyDaysLoading] = useState(false)
    const [timeOutId, setTimeOutId] = useState(null)


    const amountRef = useRef()

    useEffect(() => {
        getEmptyHours();
    }, [])

    useEffect(() => {


        if (date && modal?.doctor?.id) {

            setDateLoading(true)
            console.log(1)
            postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, modal?.doctor?.id + "/" + modal?.clinic?.id, {
                service: modal?.service_type,
                date: date.format('YYYY-MM-DD')
            }).then((responce) => {
                setAvailableTimesState(responce?.map((el) => {
                    return {
                        label: 'Break Time',
                        options: el.map((el1) => {
                            return {
                                lebel: el1,
                                value: el1
                            }
                        })
                    }
                }))

                setDateLoading(false)
            })

        }else if(date && !modal?.doctor?.id){

            setDateLoading(true)
            postResource('Clinic', 'ClinicsAvailableTimes', token, modal?.clinic?.id, {
                service: modal?.service_type,
                date: date.format('YYYY-MM-DD')
            }).then((res) => {

                setAvailableTimesState(res?.map((el) => {
                    return {
                        label: 'Break Time',
                        options: el.map((el1) => {
                            return {
                                lebel: el1,
                                value: el1
                            }
                        })
                    }
                }))
                setDateLoading(false)
            })
        }

    }, [date])

    useEffect(() => {

        if(modal?.service_type === 'telehealth' ||modal?.service_type === 'clinic_visit' || modal?.service_type === 'home_visit' || modal?.service_type === 'physical_therapy_clinic_visit' || modal?.service_type === 'physical_therapy_home_visit') {
            setInputsLoading(true)
            postResource('ClinicDoctorWorkingHours', 'single', token, modal?.doctor?.id+'/'+modal?.clinic?.id, {service: modal?.service_type}).then(responses => {
                const res = responses?.working_hours
                let day = [];

                Object.keys(res)?.forEach((key) => {
                    if(res[key][0]?.is_day_off){
                        day.push(key)
                    }
                })


                setAvailableDateState(day)
                setInputsLoading(false)

            })
        } else if(modal?.service_type === 'nursing') {
            setInputsLoading(true)
            postResource('Clinic','WorkingHours',token, +modal?.clinic?.id,{service:'nursing'}).then(response => {
                let day = [];

                Object.keys(response)?.forEach((key) => {
                    if(response[key][0]?.is_day_off){
                        day.push(key)
                    }
                })
                setAvailableDateState(day)
                setInputsLoading(false)


            })
        } else if(modal?.service_type === 'laboratory_clinic_visit') {
            setInputsLoading(true)
            postResource('Clinic','WorkingHours',token, +modal?.clinic?.id,{service:'laboratory_clinic_visit'}).then(response => {
                let day = [];

                Object.keys(response)?.forEach((key) => {
                    if(response[key][0]?.is_day_off){
                        day.push(key)
                    }
                })
                setAvailableDateState(day)
                setInputsLoading(false)

            })
        } else if(modal?.service_type === 'laboratory_home_visit') {
            setInputsLoading(true)
            postResource('Clinic','WorkingHours',token, +modal?.clinic?.id,{service:'laboratory_home_visit'}).then(response => {
                let day = [];

                Object.keys(response)?.forEach((key) => {
                    if(response[key][0]?.is_day_off){
                        day.push(key)
                    }
                })
                setAvailableDateState(day)
                setInputsLoading(false)

            })
        }

    }, [modal?.service_type])

    const getEmptyHours = (date = dayjs()) => {
        if (!modal?.doctor) {
            return
        }
        setEmptyDaysLoading(!dateWithEmptyHours.map(el => {
            return String(moment(el).format('YYYY-MM'))
        }).includes(dayjs(date).startOf('day').format('YYYY-MM')))
        timeOutId && clearTimeout(timeOutId)

        setTimeOutId(setTimeout(() => {
            postResource('ClinicDoctorAvailableTimeForMonthByDoctorAndClinic', 'single', token, modal?.doctor?.id + "/" + modal?.clinic?.id, {
                service: modal?.service_type,
                date: date.format('YYYY-MM')
            }).then((res) => {
                setDateWithEmptyHours([...new Set([...dateWithEmptyHours, ...res?.working_hours_for_month])])
                setEmptyDaysLoading(false)
            })
        }, date?.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? 1 : 300))
    }

    const disabledDate = (current) => {
        return emptyDaysLoading ? true : current.add(1, 'day') <= dayjs().endOf('date') || current.add(-3, 'month') > dayjs().endOf('date') || current.add(1, 'day') < dayjs().day(1) || availableDateState.includes(dayjs(current).format('dddd').toLowerCase())
          || dateWithEmptyHours.includes(dayjs(current).startOf('day').format('YYYY-MM-DD HH:mm'))
    };


    const onAddItem = () => {
        setItemsState((prevState) => ({
            ...prevState,


            items: {
                ...(prevState?.items ?? {}),
                [Math.random()]: {
                    tax: 0,
                    qnt: 1,
                    item: null,
                    amount: 0,
                    price: 0,
                    item_object:{},
                    name: ''
                }
            }
        }))
    }





    const subTotal = () => {
        let total = 0
        let aaa = formRef?.current?.getFieldsValue()
        let bbb = aaa?.items ? Object.values(aaa?.items)?.map((el) => {
            return total += (el?.amount ? el?.amount : 0)
        }) : 0

        return total
    }

    const onDeleteItem = (key) => {

        setItemsState((prevState) => {

            let newItems = prevState.items
            delete newItems[key]
            if(Object.keys(prevState?.items).length < 1) {
                setSelectedItem(null)
            }
            return {
                ...prevState,
                items: newItems
            }
        })




        setTimeout(() => {
            subTotal()
            let allTotal = subTotal()
            setTotalState(allTotal)
            totalState = allTotal

        }, 1000)



    }

    // const handleFilterResponse = (timeout = 80) => {
    //
    //     let total = 0;
    //     if (itemsState?.items) {
    //
    //
    //         Object.keys(itemsState.items).map((key) => {
    //             let currentItem = itemsState.items[key];
    //             itemsState.items[key].amount = currentItem.qnt * ((+currentItem.price) + ((+currentItem.price) / 100 * (+currentItem.tax)))
    //             total += itemsState.items[key].amount;
    //             if (formRef) {
    //                 formRef?.current?.setFieldValue(['items', key, 'amount'], itemsState.items[key].amount)
    //             }
    //         })
    //         setTimeout(() => formRef?.current?.setFieldValue('sub_total',total ),timeout)
    //
    //     }
    //     return itemsState
    // }

    const handleInvoiceSelect = (e, key,data) => {
        postResource('InvoiceItem', 'single', token, e).then((response) => {

            const selected_item = data.find(u=>u.id===e);

            formRef?.current?.setFieldValue(['items', key, 'qnt'], 1)
            formRef?.current?.setFieldValue(['items', key, 'item_object'], {
                id:selected_item.id,
                name:selected_item.name
            })
            formRef?.current?.setFieldValue(['items', key, 'price'], response?.price)
            formRef?.current?.setFieldValue(['items', key, 'tax'], response?.tax_percentage)
            formRef?.current?.setFieldValue(['items', key, 'amount'], parseFloat((response?.price + response?.price / 100 * response?.tax_percentage).toFixed(2)))

            formRef?.current?.getFieldValue(['items', key, 'amount'])

            setTimeout(() => {
                setSelectedItem(response)

            }, 1500)
        })

        setTimeout(() => {
            subTotal()
            let allTotal = subTotal()
            setTotalState(allTotal)
            totalState = allTotal

        }, 1000)






    }





    const changeAny = (value, obj, key) => {

        if(obj === 'qnt') {
            formRef?.current?.setFieldValue(['items', key, value], )
            formRef?.current?.setFieldValue(['items', key, 'amount'], parseFloat((+value * (+formRef?.current?.getFieldValue(['items', key, 'price']) + (+formRef?.current?.getFieldValue(['items', key, 'price']) / 100 * (+formRef?.current?.getFieldValue(['items', key, 'tax']))))).toFixed(2) ) )

        } else if (obj === 'price') {
            formRef?.current?.setFieldValue(['items', key, value], )
            formRef?.current?.setFieldValue(['items', key, 'amount'], parseFloat((+(formRef?.current?.getFieldValue(['items', key, 'qnt'])) * (+value + (+value / 100 * (+formRef?.current?.getFieldValue(['items', key, 'tax']))))).toFixed(2) ) )


        } else if (obj === 'tax') {
            formRef?.current?.setFieldValue(['items', key, value], )
            formRef?.current?.setFieldValue(['items', key, 'amount'], parseFloat((+(formRef?.current?.getFieldValue(['items', key, 'qnt'])) * (+formRef?.current?.getFieldValue(['items', key, 'price']) + (+formRef?.current?.getFieldValue(['items', key, 'price']) / 100 * (+value)) )).toFixed(2)) )


        }



        // setItemsState(handleFilterResponse({
        //     ...formRef?.current?.getFieldsValue()
        // }, 0))
        subTotal()
        let allTotal = subTotal()
        setTotalState(allTotal)


    }


    console.log(formRef?.current?.getFieldsValue())



    return<div className={'follow_up_modal_big_div'}>

        {
            loading ? <Preloader/> : <div>
                {
                    inputsLoading ? <Preloader/> : <div style={{display: 'flex', gap: 5, marginTop: 20}}>
                        <div style={{width: '50%'}}>
                            <FormInput label={t('Appointment date')}
                                       disabledDate={disabledDate}
                                       inputProps={{
                                           onPanelChange:getEmptyHours,
                                           onChange:(e) => {
                                               timeOutId && clearTimeout(timeOutId)
                                               setDate(e)

                                               formRef?.current?.setFieldsValue({
                                                   appointment_time: null,

                                               })

                                           }
                                       }}
                                       name={'booked_at'}
                                       inputType={'date'}
                                       rules={[{required: true}]}
                            />
                        </div>
                        <div style={{width: '50%'}}>
                            {
                                dateLoading ? <Preloader small={10}/> : <FormInput label={t('Appointment time')}
                                                                                   name={'appointment_time'}
                                                                                   inputType={'resourceSelect'}
                                                                                   options={availableTimes}
                                                                                   rules={[{required: true}]}
                                                                                   initialData={[]}
                                />
                            }

                        </div>
                    </div>
                }
                <div style={{marginBottom: 20}}>
                    {t('Price')}
                    <Button className={'invoice_add_price_button'} type={'primary'} onClick={onAddItem}>+</Button>
                </div>
                {
                    Object.keys(itemsState?.items ?? {})?.map(( key) => {

                        return <div key={key}>
                            <div key={key} style={{
                                display: 'flex',
                                gap: 5,
                                justifyContent: 'space-between',
                                width: '100%',

                            }}>
                                <div style={{width: '40%'}}>
                                    <FormInput label={t('Invoice item')}
                                               name={['items', key, 'item']}
                                               inputType={'resourceSelect'}
                                               rules={[{required: true}]}
                                               inputProps={{onChange: (e,data) => handleInvoiceSelect(e, key,data)}}
                                               resource={'InvoiceItem'}
                                    />

                                </div>
                                <div style={{width: '100%', display: 'flex'}}>
                                    <div>
                                        <FormInput label={t('Quantity')} name={['items', key, 'qnt']} initialValue={1} inputType={'number'}
                                                   onChange={(el) => {
                                                       changeAny(el.target.value,'qnt', key)
                                                   }}
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
                                        <FormInput label={t('Price')} name={['items', key, 'price']}
                                                   inputType={'number'}
                                                   onChange={(el) => {
                                                       changeAny(el.target.value,'price', key)
                                                   }}
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
                                        <FormInput label={t('Tax')} name={['items', key, 'tax']}
                                                   inputType={'number'}
                                                   onChange={(el) => {
                                                       changeAny(el.target.value,'tax', key)
                                                   }}
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
                                        <FormInput inputDisabled={true} label={t('Amount')}
                                                   ref={amountRef}
                                                   name={['items', key, 'amount']}
                                                   inputType={'number'}
                                        />

                                    </div>
                                    <Form.Item name={['items', key, 'item_object', 'id']}>
                                        <Input hidden={true}/>
                                    </Form.Item>
                                    <Form.Item name={['items', key, 'item_object', 'name']}>
                                        <Input hidden={true}/>
                                    </Form.Item>

                                    <div>
                                        <div style={{marginTop: 15, cursor: 'pointer'}}
                                             onClick={() => onDeleteItem(key)}><img alt={'new_delete_dark_icon'} src={new_delete_dark_icon}/></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    })
                }

                <div style={{width: '100%'}} align={lngs === 'en' ? 'right' : 'left'}>

                    <div className={'flying-label'} style={{maxHeight: 48, position: 'relative', width: '19%'}}  >
                        <Input  style={{paddingLeft:16, height: 48, borderRadius: 12}}
                                placeholder={''}
                                value={parseFloat(totalState.toFixed(2))}

                        />
                        <label style={{left: 15}}>{t('Sub total')}</label>
                    </div>
                </div>
            </div>
        }




        <div style={{display: 'flex', gap: 3, marginTop: 10}} >
            <Button size={'large'} type={'secondary'} onClick={onCancel} >{t('Cancel')}</Button>
            <Button disabled={!selectedItem} loading={loading} size={'large'} type={'primary'} htmlType={'submit'}>{t('Submit')}</Button>
        </div>

    </div>
}