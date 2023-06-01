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
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [changeValuesState, setChangeValuesState] = useState({})
    const [clinicState, setClinicState] = useState({})
    const [clinicManagerState, setClinicManagerState] = useState({})



    const [invoiceItemState, setInvoiceItemState] = useState([

        {
            id: Math.random(),
            item: 'aaaa'
        }

    ])

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

    useEffect(() => {
        if(data?.appointment_id && clinicState?.clinic?.id) {
           postResource('Clinic','single', token,  clinicState?.clinic?.id ).then((response) => {
               setClinicManagerState(response)
           })
        }

    }, [data?.appointment_id])

    const handleValuesChange = (changed)=>{
        setChangeValuesState(changed)

        setData((prevState) => ({
            ...prevState,
            ...changed
        }))

        if (changed.appointment_id) {
            const foundUser = fetchedUsers.current?.find(i => i.id === changed?.appointment_id);
            setClinicState(foundUser)
            console.log(foundUser, 'k')
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
        setInvoiceItemState([
            ...invoiceItemState,
            {
                id: Math.random(),
                item: 'jjj'
            }
        ])
    }

    const onDeleteItem = (ids) => {
        console.log(ids, 'fffddd')
        setInvoiceItemState(
            invoiceItemState.filter((el) => {
                console.log(el)
                return ids !== el.id
            },

                )

        )
    }



    console.log(clinicManagerState?.managers, 'ffff')

    return(
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Invoice`)}</h3>}
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
                                       initialValue={null}

                                       inputProps={{

                                           notFoundContent:<div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}><div>Not found</div> </div>
                                       }}

                                       initialData={[]}
                                       handleMapItems={(item, name, patientData) => searchByNumber(item, name, patientData)}
                                       customSearchKey={'phone_number'}
                                       resource={'Appointment'}/>

                        </div>
                    </div>
                    <FormInput label={t('Invoice Number')} name={'invoice_number'} initialValue={data?.invoice_number} rules={[{required: true}]} />

                    {
                        data?.appointment_id ? <div>
                            <div style={{display:"flex", gap: 10}}>
                                <div style={{width: '100%'}}>
                                    <FormInput label={t('Client name')} name={'client_name'}
                                               inputDisabled={true}
                                               initialValue={formRef.current.getFieldValue(['appointment','client_name'])}
                                               rules={[{required: true}]} />
                                </div>
                                <div style={{width: '100%'}}>
                                    <FormInput label={t('Client manager')} name={'client_manager_id'} inputType={'resourceSelect'}
                                               rules={[{required: true}]}
                                               initialValue={data?.status}
                                               initialData={clinicManagerState?.managers ? [clinicManagerState?.managers].first : []}

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
                                {
                                    validator:(rule,value)=>{
                                        if(dayjs().diff(value,'year')<18){
                                            return Promise.reject('min age 18')
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]} />
                        </div>
                    </div>
                    <FormInput label={t('Customer notes')} name={'customer_notes'} inputType={'textArea'} initialValue={data?.customer_notes}/>

                </div>

                <div className={'add_edit_content'}>
                    <div>
                        {
                            invoiceItemState.map((el) => {
                                return<div key={el.id} style={{display: 'flex', gap: 15}}>
                                    <div style={{width: '50%'}}>
                                        <FormInput label={t('Invoice item')} name={'item'} inputType={'resourceSelect'}
                                                   rules={[{required: true}]}
                                                   initialValue={data?.languages?.map(e=>e.id)}
                                                   initialData={data?.languages??[]}
                                                   resource={'InvoiceItem'}
                                        />
                                    </div>
                                    <div style={{width: '50%', display: 'flex', gap: 15, }}>
                                        <div style={{width: '20%'}}>
                                            <FormInput  label={t('Quantity')} name={'qnt'} inputType={'number'} initialValue={data?.qnt}/>
                                        </div>
                                        <div style={{width: '20%'}}>
                                            <FormInput  label={t('Price')} name={'qnt'} inputType={'number'} initialValue={data?.qnt}/>
                                        </div>
                                        <div style={{width: '20%'}}>
                                            <FormInput  label={t('Tax')} name={'qnt'} inputType={'number'} initialValue={data?.qnt}/>
                                        </div>
                                        <div style={{width: '20%'}}>
                                            <FormInput  label={t('Amount  ')} name={'qnt'} inputType={'number'} initialValue={data?.qnt}/>
                                        </div>
                                        <div style={{width: '20%'}}>
                                            <Button style={{marginTop:8}} type={'primary'} size={'large'} onClick={()=>onDeleteItem(el.id)}>delete</Button>
                                        </div>
                                    </div>

                                </div>
                            })
                        }
                    </div>
                    <div>
                        <Button onClick={onAddItem}>+ Add another item</Button>
                        <Input  />
                    </div>

                    <div className={'invoice_firsli_text_div'}>
                        Firstly please choose an appointment
                    </div>

                    <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.status}
                               initialData={Resources.StatusInvoices}
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