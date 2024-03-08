import {useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {postResource} from "../../../Functions/api_calls";
import dayjs from "dayjs";
import Preloader from "../../../Preloader";
import FormInput from "../../../Fragments/FormInput";
import {t} from "i18next";
import {Button, Form, Input} from "antd";
import new_delete_dark_icon from "../../../../dist/icons/new_delete_dark_icon.png";


export function FollowUpContent({onCancel, modal, loading, formRef}){
    let token = useSelector((state) => state.auth.token);
    const [date,setDate] = useState(null);
    const [availableTimes,setAvailableTimesState] = useState([]);
    const [dateLoading,setDateLoading] = useState(false);
    const [availableDateState, setAvailableDateState] = useState([])
    const [inputsLoading, setInputsLoading] = useState(false)
    const [itemsState, setItemsState] = useState({})
    let [qntState, setQntState] = useState(0)
    let [priceState, setPriceState] = useState(0)
    let [taxState, setTaxState] = useState(0)
    let [amState, setAmState] = useState(0)

    const amountRef = useRef()



    useEffect(() => {


        if (date && modal?.doctor?.id) {

            setDateLoading(true)
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
                // Object.values(res)?.map((el, i) => {
                //     return el.filter((el1) => el1.is_day_off === true)
                // }).map((el, i) => {
                //     if (el.length > 0) {
                //         day.push(i)
                //     }
                // })
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

    const disabledDate = (current) => {
        return current.add(1, 'day') <= dayjs().endOf('date') || current.add(-3, 'month') > dayjs().endOf('date') || current.add(1, 'day') < dayjs().day(1) || availableDateState.includes(dayjs(current).format('dddd').toLowerCase())
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
                    item_object:{}
                }
            }
        }))
    }

    // const onDeleteItem = (key) => {
    //     setItemsState(prevState => {
    //         // Создайте копию текущего массива состояния
    //         const newState = [...prevState];
    //         // Удалите элемент с указанным индексом
    //         newState.splice(key, 1);
    //         // Верните обновленное состояние
    //         return newState;
    //     });
    // }

    const onDeleteItem = (key) => {
        setItemsState((prevState) => {
            let newItems = prevState.items
            delete newItems[key]
            return {
                ...prevState,
                items: newItems
            }
        })
    }

    const changeAny = (value, obj) => {
        console.log(value, obj)
        if(obj === 'qnt') {
            setQntState(value)
            qntState = value
        } else if (obj === 'price') {
            setPriceState(value)
            priceState = value
        } else if (obj === 'tax') {
            setTaxState(value)
            taxState = value
        }

        let answer = (qntState ?? 0) * (priceState ?? 0) * (1 + (taxState ?? 0) / 100)
        setAmState(answer)


        console.log(answer, 'sdfs')
    }

    console.log(amountRef?.current?.getFieldsValue())

    return<div>

        {
            inputsLoading ? <Preloader/> : <div style={{display: 'flex', gap: 5, marginTop: 20}}>
                <div style={{width: '50%'}}>
                    <FormInput label={t('Appointment date')}
                               disabledDate={disabledDate}
                               inputProps={{onChange:e=>setDate(e)}}
                               inputProps={{
                                   onChange:(e)=> {

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
        <div>
            Price
            <Button className={'invoice_add_price_button'} type={'primary'} onClick={onAddItem}>+</Button>
        </div>
        {
            Object.keys(itemsState?.items ?? {})?.map((el, key) => {
                console.log(el, key)
                return <div>
                    <div key={key} style={{
                        display: 'flex',
                        gap: 5,
                        justifyContent: 'space-between',
                        width: '100%',
                        marginTop: 10
                    }}>
                        <div style={{width: '40%'}}>
                            <FormInput label={t('Invoice item')}
                                        name={['items', key, 'item']}
                                        inputType={'resourceSelect'}
                                       // rules={[{required: true}]}
                                       // inputProps={{onChange: (e,data) => handleInvoiceSelect(e, key,data)}}
                                       // initialValue={data?.items[key]?.item}
                                       // initialData={data?.items[key].item_object ? [data?.items[key]?.item_object] : []}
                                       //
                                       //
                                        resource={'InvoiceItem'}
                            />

                        </div>
                        <div style={{width: '100%', display: 'flex'}}>
                            <div>
                                <FormInput label={t('Quantity')} name={['items', key, 'qnt']} onChange={(el) => {
                                    changeAny(el.target.value,'qnt')
                                }}/>
                            </div>
                            <div>
                                <FormInput label={t('Price')} name={['items', key, 'price']}
                                           inputType={'number'}
                                           onChange={(el) => {
                                               changeAny(el.target.value,'price')
                                           }}
                                           />
                            </div>
                            <div>
                                <FormInput label={t('Tax')} name={['items', key, 'tax']}
                                           inputType={'number'}
                                           onChange={(el) => {
                                               changeAny(el.target.value,'tax')
                                           }}
                                           />
                            </div>
                            <div>
                                {/*<FormInput inputDisabled={true} label={t('Amount')}*/}
                                {/*           ref={amountRef}*/}
                                {/*           name={['items', key, 'amount']}*/}
                                {/*           inputType={'number'}*/}
                                {/*           />*/}

                                <Form.Item className={'flying-label'}
                                    name={['items', key, 'amount']}
                                >
                                    <Input  style={{paddingLeft:16, height: 48, borderRadius: 12}} value={amState}/>
                                    <label style={{left: 15}}>Amount</label>
                                </Form.Item>
                            </div>
                            <div>
                                <div style={{marginTop: 15, cursor: 'pointer'}}
                                     onClick={() => onDeleteItem(key)}><img alt={'new_delete_dark_icon'} src={new_delete_dark_icon}/></div>
                            </div>
                        </div>

                    </div>
                </div>
            })
        }





        <div style={{display: 'flex', gap: 3}} >
            <Button size={'large'} type={'secondary'} onClick={onCancel} >{t('Cancel')}</Button>
            <Button loading={loading} size={'large'} type={'primary'} htmlType={'submit'}>{t('Submit')}</Button>
        </div>

    </div>
}