import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {createResource, postResource, updateResource, useGetResourceSingle} from "../../../Functions/api_calls";
import {t} from "i18next";
import Preloader from "../../../Preloader";
import {Button, Form, Popconfirm} from "antd";
import FormInput from "../../../Fragments/FormInput";

import dayjs from "dayjs";
import Resources from "../../../../store/Resources";
import new_delete_dark_icon from "../../../../dist/icons/new_delete_dark_icon.png";
import calendar_black_icon from "../../../../dist/icons/calendar_black_icon.png";
import {QuestionCircleOutlined} from "@ant-design/icons";

const resource = 'Invoice';

function Incoice() {
    let dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    let roleRedux = useSelector((state) => state.auth.selected_role.key);

    const [searchCeys, setSearchCeys] = useState('')

    const handleFilterResponse = (data,timeout = 80) => {

        let total = 0;
        if (data?.items) {


            Object.keys(data.items).map((key) => {
                let currentItem = data.items[key];
                data.items[key].amount = currentItem.qnt * ((+currentItem.price) + ((+currentItem.price) / 100 * (+currentItem.tax)))
                total += data.items[key].amount;
                if (formRef) {
                    formRef?.current?.setFieldValue(['items', key, 'amount'], data.items[key].amount)
                }
            })
            setTimeout(() => formRef?.current?.setFieldValue('sub_total',total ),timeout)

        }
        return data
    }
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id, {}, handleFilterResponse)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [changeValuesState, setChangeValuesState] = useState({})
    const [a, seta] = useState(null)



    const fetchedUsers = useRef([]);


    const onFinish = (values) => {
        setSaveLoading(true)
        setData((prevState) => ({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                if (response?.id) {
                    navigate(-1)
                }
            }).finally(() => {
                dispatch({
                    type: 'DASHBOARD_STATE',
                    payload: false
                })
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(-1)
                }

            }).finally(() => {
                dispatch({
                    type: 'DASHBOARD_STATE',
                    payload: false
                })
                setSaveLoading(false)
            })
        }
    }


    // useEffect(() => {
    //     if(data?.item) {
    //         postResource('InvoiceItem','single', token,  data.item ).then((response) => {
    //             console.log(response, 'res')
    //             setItemState(response)
    //         })
    //     }
    //
    // }, [data?.item])


    const handleValuesChange = (changed, all) => {
        setChangeValuesState(changed)


        if(Object.keys(changed).length > 0) {
            dispatch({
                type: 'DASHBOARD_STATE',
                payload: true
            })
        }
        if (changed?.items) {

            setData(handleFilterResponse({
                ...data, ...formRef?.current?.getFieldsValue()
            }, 0))
        } else {
            setData((prevState) => ({
                ...prevState,
                ...changed,
                ...all,
            }))
        }

        if (changed.appointment_id) {
            const foundUser = fetchedUsers.current?.find(i => i.id === changed?.appointment_id);


            formRef.current?.setFieldsValue({
                client_name:foundUser?.patient?.first,
                appointment: {
                    service: foundUser?.service,
                    client_name: foundUser?.patient?.first,
                    specialty: foundUser?.specialty?.title,


                }


            })
        }
    }

    const handleMapItems = (item, name) => {
        name = item.phone_code ? `(${item.phone_code}) ${item.name}` : null
        item.id = item.phone_code
        return [name, item]
    }

    const searchByNumber = (item, name, patientData) => {
        seta(patientData)
        fetchedUsers.current = patientData
        name = <>{'Appointment with'}{" "}{item?.patient?.first}{" "}{item?.patient?.last}{' '}{item?.patient?.phone_number}{' '}<div>{item?.booked_at?.iso_string}</div>{' '}<div>{item?.clinic?.name}</div></>
        let searchData = item.phone_number + item.email;
        setSearchCeys('')
        return [name, item, searchData]


    }

    const onManagers = (item, name, patientData) => {

        fetchedUsers.current = patientData
        name = <>{item?.first}{" "}{item?.last}</>
        let searchData = item.phone_number + item.email;

        return [name, item, searchData]


    }

    const onAddItem = () => {
        setData((prevState) => ({
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

    const onDeleteItem = (key) => {
        setData((prevState) => {
            let newItems = prevState.items
            delete newItems[key]
            return {
                ...prevState,
                items: newItems
            }
        })
    }


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
            formRef?.current?.setFieldValue(['items', key, 'amount'], response?.price + response?.price / 100 * response?.tax_percentage)


        })


    }

    formRef?.current?.getFieldValue('sub_total')

    console.log(searchCeys, 'da')

    return (
        <div className={"new_invoice_big_div"}>
            {data?.id ? <h3 className={'create_apdate_btns'}>{t(`Editing invoice - ${data?.invoice_number}`)}</h3> :
                <h3 className={'create_apdate_btns'}>{t(`Add new Invoice`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
            >
                <div className={'add_edit_invoice'}>
                    <div style={{display: "flex", gap: 20}}>
                        <div style={{width: '30%'}}>
                            <FormInput label={t('Country Code')} name={'phone_country_code'}
                                       inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.appointment?.patient?.phone_country_code}
                                       handleMapItems={handleMapItems}
                                       customSearchKey={'phone_code'}
                                       resource={'Country'}/>
                        </div>
                        <div style={{width: '100%'}}>
                            <FormInput label={t('Select Patient and choose an appointment (Search By phone number)')}
                                       name={'appointment_id'}
                                       inputType={'resourceSelect'}
                                       disabled={!data?.phone_country_code}
                                //rules={[{required: true}]}
                                       searchConfigs={{minLength: 3}}
                                       initialValue={data?.appointment?.id}
                                       inputProps={{
                                           onSearch:e=>setSearchCeys(e),
                                           notFoundContent: <div style={{
                                               display: "flex",
                                               flexDirection: "row",
                                               justifyContent: "space-between"
                                           }}>
                                               {/*<div>Not found</div>*/}
                                               <div>{
                                                   searchCeys.length >= 5 ? <span>Number didn't find in the system. Please enter correct phone number.</span> : 'Not found'
                                               }</div>
                                           </div>
                                       }}
                                       resourceParams={{
                                           phone_country_code:data?.phone_country_code??data?.appointment?.clinic?.phone_country_code
                                       }}

                                       initialData={data?.appointment ? [data?.appointment] : []}
                                       handleMapItems={(item, name, patientData) => searchByNumber(item, name, patientData)}
                                       customSearchKey={'phone_number'}
                                       resource={'Appointment'}/>

                        </div>
                        <div style={{width: '30%'}}>
                            {
                                data?.id ? <FormInput label={t('Invoice Number')} name={'invoice_number'}
                                                      initialValue={data?.invoice_number} rules={[{required: true}]}/> :
                                    <div></div>
                            }
                        </div>
                    </div>



                    {
                        data?.appointment_id || data?.id ? <div>
                            <div style={{display: "flex", gap: 20}}>
                                <div style={{width: '100%'}}>
                                    <FormInput label={t('Client name')} name={'client_name'}
                                               rules={[{required: true}]}
                                               inputDisabled={true}
                                               initialValue={data?.client_name}/>
                                </div>
                                <div style={{width: '100%'}}>
                                    <FormInput label={t('Client manager (Search By phone number)')} name={'client_manager_id'}
                                               searchConfigs={{minLength: 3}}
                                               inputProps={{
                                                   onSearch:e=>setSearchCeys(e),
                                                   notFoundContent: <div style={{
                                                       display: "flex",
                                                       flexDirection: "row",
                                                       justifyContent: "space-between"
                                                   }}>
                                                       <div>{
                                                           searchCeys.length >= 5 ? <span>Number didn't find in the system. Please enter correct phone number.</span> : 'Not found'
                                                       }</div>
                                                   </div>
                                               }}
                                               inputType={'resourceSelect'}
                                               rules={[{required: true}]}
                                               resource={roleRedux === 'admin' || roleRedux === 'super' ? 'User' : 'Patient'}
                                               resourceParams={{
                                                   type: 'manager',
                                                   appointment_id: data.appointment_id,
                                                   appointment_clinic_managers: data.appointment_id

                                               }}
                                               handleMapItems={(item, name, patientData) => onManagers(item, name, patientData)}
                                               customSearchKey={'full_phone_number'}
                                               initialValue={data?.client_manager?.id}
                                               initialData={data?.client_manager ? [data?.client_manager] : []}

                                    />

                                </div>
                            </div>

                        </div> : <div></div>
                    }


                    <div style={{display: "flex", gap: 20}}>
                        <div style={{width: '30%'}}>
                            <FormInput label={t('Issued date')} name={'issued_date'} initialValue={data?.date ? data?.date : dayjs()}
                                       suffixIcon={<img alt={'calendar_black_icon'} src={calendar_black_icon}/>}
                                       inputType={'date'} inputDisabled={true} rules={[{required: true},]}/>
                        </div>
                        <div style={{width: '30%'}}>
                            <FormInput label={t('Due date')} name={'due_date'} initialValue={data?.due_date}
                                       suffixIcon={<img alt={'calendar_black_icon'} src={calendar_black_icon}/>}
                                       inputType={'date'} rules={[
                                {required: true},]}/>
                        </div>
                        <div style={{width: '100%'}}>
                            <FormInput label={t('Customer notes')} name={'customer_notes'}
                                       initialValue={data?.customer_notes}/>
                        </div>
                    </div>


                </div>

                <div className={'add_edit_invoice'}>
                    {
                        data?.primary === 1 ? <div className={'invoice_primary_inputs_div'}>
                            <div style={{width: '100%'}}>
                                <FormInput label={t('Lab or nursing cost')} name={'lab_or_nursing_cost'}
                                           inputDisabled={true} initialValue={data?.lab_or_nursing_cost}/>
                                <FormInput label={t('Service fee')} name={'service_fee'} inputDisabled={true}
                                           initialValue={data?.service_fee}/>
                                <FormInput label={t('Tax percentage')} name={'tax_percentage'} inputDisabled={true}
                                           initialValue={data?.tax_percentage}/>
                                <FormInput label={t('Coupon discount amount')} name={'coupon_discount_amount'}
                                           inputDisabled={true} initialValue={data?.coupon_discount_amount}/>

                            </div>
                            <div style={{width: '100%'}}>
                                <FormInput label={t('Diagnosis price')} name={'diagnosis_price'} inputDisabled={true}
                                           initialValue={data?.diagnosis_price}/>
                                <FormInput label={t('Insurance percentage')} name={'insurance_percentage'}
                                           inputDisabled={true} initialValue={data?.insurance_percentage}/>
                                <FormInput label={t('Vat')} name={'vat'} inputDisabled={true} initialValue={data?.vat}/>
                            </div>


                        </div> : <div>
                            {
                                data?.appointment_id || data?.id ? <div>
                                    <div>
                                        <div>
                                            Price
                                            <Button className={'invoice_add_price_button'} type={'primary'} onClick={onAddItem}>+</Button>
                                        </div>
                                        {
                                            Object.keys(data?.items ?? {})?.map((key) => {

                                                return <div key={key} style={{
                                                    display: 'flex',
                                                    gap: 15,
                                                    justifyContent: 'space-between',
                                                    width: '100%',
                                                    marginTop: 10
                                                }}>
                                                    <div style={{width: '50%'}}>
                                                        <FormInput label={t('Invoice item')}
                                                                   name={['items', key, 'item']}
                                                                   inputType={'resourceSelect'}
                                                                   rules={[{required: true}]}
                                                                   inputProps={{onChange: (e,data) => handleInvoiceSelect(e, key,data)}}
                                                                   initialValue={data?.items[key]?.item}
                                                                   initialData={data?.items[key].item_object ? [data?.items[key]?.item_object] : []}


                                                                   resource={'InvoiceItem'}
                                                        />
                                                        <Form.Item hidden={1} initialValue={data?.items[key].item_object} name={['items', key, 'item_object']}/>
                                                    </div>
                                                    <div style={{width: '50%', display: 'flex', gap: 15,}}>
                                                        <div>
                                                            <FormInput label={t('Quantity')}
                                                                       name={['items', key, 'qnt']} inputType={'number'}
                                                                       initialValue={data?.items[key]?.qnt}/>
                                                        </div>
                                                        <div>
                                                            <FormInput label={t('Price')} name={['items', key, 'price']}
                                                                       inputType={'number'}
                                                                       initialValue={data?.items[key]?.price}/>
                                                        </div>
                                                        <div>
                                                            <FormInput label={t('Tax')} name={['items', key, 'tax']}
                                                                       inputType={'number'}
                                                                       initialValue={data?.items[key]?.tax}/>
                                                        </div>
                                                        <div>
                                                            <FormInput inputDisabled={true} label={t('Amount  ')}
                                                                       name={['items', key, 'amount']}
                                                                       inputType={'number'}
                                                                       initialValue={data?.items[key]?.amount}/>
                                                        </div>
                                                        <div>
                                                            <div style={{marginTop: 15, cursor: 'pointer'}}
                                                                    onClick={() => onDeleteItem(key)}><img alt={'new_delete_dark_icon'} src={new_delete_dark_icon}/></div>
                                                        </div>
                                                    </div>

                                                </div>
                                            })
                                        }
                                    </div>
                                    <div className={'invoice_add_total_div'}>
                                        <div></div>
                                        <div className={'invoice_total_div'}>
                                            <div style={{marginTop: 15, width: 70}}> Total (sar)</div>
                                            <div style={{width: '90%'}}>
                                                <FormInput label={t('Sub Total')} name={'sub_total'}
                                                           inputType={'number'} initialValue={data?.items?.amount}/>
                                            </div>

                                        </div>
                                    </div>
                                </div> : <div className={'invoice_firsli_text_div'}>
                                    Firstly please choose an appointment
                                </div>
                            }
                        </div>
                    }

                    <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.status}
                               initialData={Resources.StatusInvoices1}
                    />

                </div>


                <div className={'invice_save_cancel_div'} >
                    <Button style={{width: '100%'}} loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <div style={{width: '100%'}}>
                        {
                            Object.keys(changeValuesState).length > 0 ? <Popconfirm
                                title={t("your changes will not be saved")}
                                onConfirm={() => {
                                    navigate(-1)
                                    dispatch({
                                        type: 'DASHBOARD_STATE',
                                        payload: false
                                    })

                                } }
                                okText={t("Yes")}
                                cancelText={t("No")}
                                icon={<QuestionCircleOutlined style={{color: 'red'}}/>}>
                                <Button style={{width: '100%'}} size={'large'} type={'secondary'} >{t('Cancel')}</Button>
                            </Popconfirm> : <Button style={{width: '100%'}} onClick={() => navigate(-1)} size={'large'} type={'secondary'} >{t('Cancel')}</Button>
                        }
                    </div>
                </div>
            </Form>}
        </div>
    )
}

export default Incoice;