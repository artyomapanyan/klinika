import {useSelector} from "react-redux";
import {Avatar, Button, Form, Space, Tag} from "antd";
import {UserOutlined} from "@ant-design/icons";
import FormInput from "../../../Fragments/FormInput";
import {t} from "i18next";
import Resources from "../../../../store/Resources";
import dayjs from "dayjs";
import React from "react";

function NursLabDrawerSmall({openLargeDrawer, specialty, data,setOpen,handleCreateAppointment,setData}) {
    let language = useSelector((state) => state?.app?.current_locale);
    const onFinish = (values) => {

        handleCreateAppointment(data,{
            patient:values,
        })
    }
    const handleMapItems = (item, name) => {
        name = item.phone_code ? `${item.phone_code} ` : null
        item.id = +item.phone_code
        return [name, item]
    }
    return (
        <div className={language === 'ar' ? 'KM_drawer' : ''}>
            <div style={{padding: 1, marginTop: 1}}>
                <Space>
                    <Avatar size={50} icon={<UserOutlined/>}/>
                    <div style={{display: "block"}}>
                        {/*<h3 className={'h1'}>{doctor.first} {doctor.last}</h3>*/}
                        <div>{specialty}</div>
                    </div>
                </Space>
                <Tag color="#ce4e99" size={'large'} style={{
                    fontSize: 14,
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    marginTop: 10,
                    margin: '0 5px',
                    padding: '6px 10px',
                    borderRadius: 12
                }}>{data?.time}</Tag>
            </div>
            <div style={{marginTop: 10,}}>
                <Form
                    name="edit"
                    onFinish={onFinish}
                    initialValues={{...data}}
                    onValuesChange={(e,v)=>setData(prevState=>({
                        ...prevState,
                        ...v
                    }))}
                    layout="vertical"
                >
                    <FormInput label={t('First name')} name={'first'} rules={[{required: true}]}/>
                    <FormInput label={t('Last name')} name={'last'} rules={[{required: true}]}/>
                    <FormInput label={t('Email')}  name={'email'} rules={[{required: true}]}/>
                    <div style={{display: "flex", gap: 20, width: '100%'}}>
                        <div style={{width: 80}}>
                            <FormInput label={t('Code')} name={'phone_country_code'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={966}
                                       handleMapItems={handleMapItems}
                                       customSearchKey={'phone_code'}
                                       resource={'Country'}
                            />
                        </div>
                        <div style={{ width: '100%'}}>
                            <FormInput label={t('Phone number')} name={'phone_number'} maxLength={10} rules={[
                                {required: true},
                            ]}/>
                        </div>
                    </div>
                    <FormInput label={t('Gender')} name={'gender'} inputType={'resourceSelect'}
                               initialData={Resources?.Gender}
                               initialValue={data?.gender}
                    />
                    <FormInput label={t('Nationality number')} name={'nationality_number'} initialValue={data?.nationality_number} rules={[
                        {required: true},
                        // {
                        //     validator:(rule,value)=>{
                        //         if(value?.length < 10){
                        //             return Promise.reject('min length 10')
                        //         }
                        //         return Promise.resolve();
                        //     }
                        // }


                    ]} />
                    <FormInput label={t('Nationality')} name={'country_id'}
                               inputType={'resourceSelect'}
                               initialData={data?.countries??[]}
                               rules={[{required: true}]}
                               initialValue={data?.country_id}
                               inputProps={{
                                   onChange:(e,v)=> {
                                       setData(prevData => ({
                                           ...prevData,
                                           countries: v
                                       }))

                                   }
                               }}
                               resource={'Country'}/>
                    <FormInput label={t('Date of Birth')} name={'dob'}
                        //inputDisabled={data?.patient_id}
                               initialValue={data?.dob}
                               inputType={'date'} rules={[
                        {required: !data?.patient_id},
                        {
                            validator:(rule,value)=>{
                                if(dayjs().diff(value,'year')<18){
                                    return Promise.reject('min age 18')
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}/>
                    <div>
                        <Button style={{width: '100%'}} size={'large'} type={'primary'}
                                htmlType="submit">{t("Save")}</Button>
                    </div>
                    <div>
                        <Button onClick={openLargeDrawer} style={{width: '100%', marginTop: 15}} size={'large'}
                                type={'secondary'}>{t('Show Extended')}</Button>
                    </div>
                    <div>
                        <Button onClick={()=>setOpen(false)} style={{width: '100%', marginTop: 15, border: "none"}} size={'large'} type={'secondary'}
                        >{t('Cancel')}</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default NursLabDrawerSmall;