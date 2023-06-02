import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, postResource, updateResource, useGetResourceSingle} from "../../../Functions/api_calls";
import {t} from "i18next";
import Preloader from "../../../Preloader";
import {Avatar, Button, Form, Input, Space} from "antd";
import FormInput from "../../../Fragments/FormInput";
import CancelComponent from "../../../Fragments/CancelComponent";
import dayjs from "dayjs";
import Resources from "../../../../store/Resources";
import {AlibabaOutlined, UserOutlined} from "@ant-design/icons";

const resource = 'Invoice';

function Incoice() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);

    const handleFilterResponse = (data,formRef)=>{
    Object.keys(data.items).map((key)=>{
            let currentItem = data.items[key];


        data.items[key].amount = currentItem.qnt*((+currentItem.price)+((+currentItem.price)/100*(+currentItem.tax)))
            if(formRef){
                formRef.current.setFieldValue(['items',key,'amount'], data.items[key].amount)


            }
        })
        return data
    }
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id,{},handleFilterResponse)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [changeValuesState, setChangeValuesState] = useState({})







    const fetchedUsers = useRef([]);


    const onFinish = (values) => {
        setSaveLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                if(response?.id){
                    navigate(-1)
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(-1)
                }

            }).finally(() => {
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



    const handleValuesChange = (changed,all)=>{
        setChangeValuesState(changed)

        if(changed.items){

            setData(handleFilterResponse({...data,...formRef?.current?.getFieldsValue()
        },formRef))
        }else{
            setData((prevState) => ({
                ...prevState,
                ...changed,
                ...all,
            }))
        }





        if (changed.appointment_id) {
            const foundUser = fetchedUsers.current?.find(i => i.id === changed?.appointment_id);


            formRef.current?.setFieldsValue({
                appointment:{
                    service: foundUser?.service,
                    client_name: foundUser?.patient?.first,
                    specialty: foundUser?.specialty?.title,


                }



            })
        }
    }

    const handleMapItems = (item,name)=>{
        name = item.phone_code?`(${item.phone_code}) `:null
        item.id = item.phone_code
        return [name,item]
    }

    const searchByNumber = (item, name, patientData) => {
        fetchedUsers.current = patientData
        name = <>{'Appointment with'}{" "}{item?.doctor?.first}{" "}{item?.doctor?.last}{' '}{item.reference_code}</>
        let searchData = item.phone_number+item.email;
        return [name, item,searchData]


    }

    const onAddItem = () => {
        setData((prevState)=> ({
         ...prevState,
            items:{
                ...(prevState?.items??{}),
       [Math.random()]: {
            tax:0,
           qnt:1,
           item:null,
           amount:0,
           price:0
        }
            }
        }))
    }

    const onDeleteItem = (key) => {
        setData((prevState)=> {
            let newItems = prevState.items
            delete newItems[key]
          return   {
                ...prevState,
                items:newItems
            }
        })
    }


    const handleInvoiceSelect = (e,key)=>{

        postResource('InvoiceItem','single', token,  e ).then((response) => {

            formRef.current.setFieldValue(['items',key,'qnt'],1)
            formRef.current.setFieldValue(['items',key,'price'],response?.price)
            formRef.current.setFieldValue(['items',key,'tax'],response?.tax_percentage)
            formRef.current.setFieldValue(['items',key,'amount'],response?.price + response?.price/100*response?.tax_percentage)

        })
    }



    return(
        <div>
            {data?.id ? <h3 className={'create_apdate_btns'}>{t(`Editing invoice - ${data?.invoice_number}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Invoice`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
            >
                <div  className={'add_edit_content'}>
                    <div style={{display:"flex"}}>
                        <div style={{width:'35%'}}>
                            <FormInput label={t('Country Code  ')} name={'phone_country_code'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.phone_country_code}
                                       handleMapItems={handleMapItems}
                                       resource={'Country'}/>
                        </div>
                        <div style={{width:'100%', marginLeft:10}}>
                            <FormInput label={t('Select Patient and choose an appointment (Search By phone number)')} name={'appointment_id'}
                                       inputType={'resourceSelect'}
                                //rules={[{required: true}]}
                                       searchConfigs={{minLength: 4}}
                                       initialValue={data?.appointment?.id}
                                       inputProps={{

                                           notFoundContent:<div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}><div>Not found</div> </div>
                                       }}

                                       initialData={data?.appointment?[data?.appointment]:[]}
                                       handleMapItems={(item, name, patientData) => searchByNumber(item, name, patientData)}
                                       customSearchKey={'phone_number'}
                                       resource={'Appointment'}/>

                        </div>
                    </div>
                    {
                        data?.id ? <FormInput label={t('Invoice Number')} name={'invoice_number'} initialValue={data?.invoice_number} rules={[{required: true}]} /> : <div></div>
                    }


                    {
                        data?.appointment_id || data?.id ? <div>
                            <div style={{display:"flex", gap: 10}}>
                                <div style={{width: '100%'}}>
                                    <FormInput label={t('Client name')} name={'client_name'}
                                               inputDisabled={true}
                                               initialValue={data?.appointment?.patient?.first ? data?.appointment?.patient?.first : formRef.current.getFieldValue(['appointment','client_name'])}

                                               rules={[{required: true}]} />
                                </div>
                                <div style={{width: '100%'}}>
                                    <FormInput label={t('Client manager')} name={'client_manager_id'} inputType={'resourceSelect'}
                                               rules={[{required: true}]}
                                               resource={'User'}
                                               resourceParams={{
                                                   type:'manager',
                                                   appointment_id:data.appointment_id
                                               }}
                                               initialValue={data?.client_manager_id?.id}
                                               initialData={data?.client_manager_id? [data?.client_manager_id]:[]}

                                    />

                                </div>
                            </div>

                        </div> : <div></div>
                    }




                    <div style={{display:"flex", gap: 10}}>
                        <div style={{width: '100%'}}>
                            <FormInput label={t('Issued date')} name={'issued_date'} initialValue={dayjs()} inputType={'date'} inputDisabled={true} rules={[
                                {required: true},

                            ]} />
                        </div>
                        <div style={{width: '100%'}}>
                            <FormInput label={t('Due date')} name={'due_date'} initialValue={data?.due_date} inputType={'date'} rules={[
                                {required: true},

                            ]} />
                        </div>
                    </div>
                    <FormInput label={t('Customer notes')} name={'customer_notes'} inputType={'textArea'} initialValue={data?.customer_notes}/>

                </div>

                <div className={'add_edit_content'}>
                    {
                        data?.primary === 1 ? <div className={'invoice_primary_inputs_div'}>
                            <div style={{width:'100%'}}>
                                <FormInput label={t('Lab or nursing cost')} name={'lab_or_nursing_cost'} inputDisabled={true} initialValue={data?.lab_or_nursing_cost}  />
                                <FormInput label={t('Service fee')} name={'service_fee'} inputDisabled={true} initialValue={data?.service_fee}  />
                                <FormInput label={t('Tax percentage')} name={'tax_percentage'} inputDisabled={true} initialValue={data?.tax_percentage}  />
                                <FormInput label={t('Coupon discount amount')} name={'coupon_discount_amount'} inputDisabled={true} initialValue={data?.coupon_discount_amount}  />

                            </div>
                            <div style={{width:'100%'}}>
                                <FormInput label={t('Diagnosis price')} name={'diagnosis_price'} inputDisabled={true} initialValue={data?.diagnosis_price}  />
                                <FormInput label={t('Insurance percentage')} name={'insurance_percentage'} inputDisabled={true} initialValue={data?.insurance_percentage}  />
                                <FormInput label={t('Vat')} name={'vat'} inputDisabled={true} initialValue={data?.vat}  />
                            </div>







                        </div> : <div>
                            {
                                data?.appointment_id || data?.id ? <div>
                                    <div>
                                        {
                                            Object.keys(data?.items??{})?.map((key) => {
                                                return<div key={key} style={{display: 'flex', gap: 15, justifyContent: 'space-between', width:'100%'}}>
                                                    <div style={{width: '50%'}}>
                                                        <FormInput label={t('Invoice item')} name={['items',key,'item']} inputType={'resourceSelect'}
                                                                   rules={[{required: true}]}
                                                                   inputProps={{onChange:e=>handleInvoiceSelect(e,key)}}


                                                                   resource={'InvoiceItem'}
                                                        />
                                                    </div>
                                                    <div style={{width: '50%', display: 'flex', gap: 15, }}>
                                                        <div >
                                                            <FormInput  label={t('Quantity')} name={['items',key,'qnt']} inputType={'number'} initialValue={data?.items[key]?.qnt}/>
                                                        </div>
                                                        <div >
                                                            <FormInput  label={t('Price')} name={['items',key,'price']} inputType={'number'} initialValue={data?.items[key]?.price}/>
                                                        </div>
                                                        <div >
                                                            <FormInput  label={t('Tax')} name={['items',key,'tax']} inputType={'number'} initialValue={data?.items[key]?.tax}/>
                                                        </div>
                                                        <div >
                                                            <FormInput inputDisabled={true}  label={t('Amount  ')} name={['items',key,'amount']} inputType={'number'} initialValue={data?.items[key]?.amount}/>
                                                        </div>
                                                        <div >
                                                            <Button style={{marginTop:8}} type={'primary'} size={'large'} onClick={()=>onDeleteItem(key)}>delete</Button>
                                                        </div>
                                                    </div>

                                                </div>
                                            })
                                        }
                                    </div>
                                    <div className={'invoice_add_total_div'} >
                                        <div>
                                            <Button onClick={onAddItem}>+ Add another item</Button>
                                        </div>
                                        <div className={'invoice_total_div'}>
                                            <div style={{marginTop: 15, width: 70}}> Total (sar)</div>
                                            <div style={{width: '90%'}}>
                                                <FormInput label={t('Sub Total')} name={'sub_total'} inputType={'number'} initialValue={data?.items} />
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


                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <CancelComponent changeValuesState={changeValuesState} resource={resource}/>
                </Space>
            </Form>}
        </div>
    )
}
export default Incoice;