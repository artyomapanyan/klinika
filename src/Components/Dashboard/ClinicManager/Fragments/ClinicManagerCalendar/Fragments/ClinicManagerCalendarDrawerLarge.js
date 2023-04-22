import {Avatar, Button, Col, Form, Row, Space, Tag} from "antd";
import {LeftOutlined, UserOutlined} from "@ant-design/icons";
import FormInput from "../../../../../Fragments/FormInput";
import {t} from "i18next";
import React, {useRef} from "react";
import Resources from "../../../../../../store/Resources";


function ClinicManagerCalendarDrawerLarge({openDrawer,doctor,specialty,data,setOpen,handleCreateAppointment}) {
    const formRef = useRef();
    const onFinish = (values) => {
        handleCreateAppointment(data,{
            patient:values
        })
    }
    const handleMapItems = (item, name) => {
        name = item.phone_code ? `${item.phone_code} ` : null
        item.id = +item.phone_code
        return [name, item]
    }

    return(
        <div>
            <Row gutter={[15, 15]}>
                <Col lg={12}>
                    <div style={{padding: 10, marginTop:20, display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <Space >
                            <Avatar size={50} icon={<UserOutlined />} />
                            <div style={{display:"block"}}>
                                <h3 className={'h1'}>{doctor.first} {doctor.last}</h3>
                                <div>{specialty}</div>
                            </div>
                        </Space>
                        <Tag color="#ce4e99" size={'large'} style={{fontSize:17, fontWeight:550, marginTop:20,  padding:6, borderRadius:10}}>{data.time}</Tag>
                    </div>
                    <div>
                        <Form
                            name="edit"
                            onFinish={onFinish}
                            layout="vertical"
                            ref={formRef}
                        >
                            <FormInput label={t('First name')} name={'first'}   rules={[{required: true}]} />
                            <FormInput label={t('Last name')} name={'last'} rules={[{required: true}]} />
                            <FormInput label={t('Email')} name={'email'} rules={[{required: true}]} />
                            <div style={{display:"flex", width:'100%'}}>
                                <div style={{width:110}}>
                                    <FormInput label={t('Code')} name={'phone_country_code'} inputType={'resourceSelect'}
                                               rules={[{required: true}]}
                                               initialValue={966}
                                               handleMapItems={handleMapItems}
                                               resource={'Country'}
                                    />
                                </div>
                                <div style={{marginLeft:20, width:'100%'}}>
                                    <FormInput label={t('Phone number')} name={'phone_number'} />
                                </div>
                            </div>
                            <FormInput label={t('Gender')} name={'gender'} inputType={'resourceSelect'}
                                       initialData={Resources?.Gender}
                            />
                             {/*   <FileManager text1={'Insurance Card Front'}
                                             text2={'upload image'}
                                             uploadIcon={<img alt={'icons'} src={addimage}/>}
                                             name={'cover'} initialFileList={[]} formRef={formRef} type={'drag'}/>*/}
                            <div>
                                <Button style={{width:'100%'}} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                            </div>
                        </Form>
                    </div>
                </Col>
                <Col lg={12}>
                    <div align={'right'} style={{marginTop:40}}>
                        <Button onClick={openDrawer} style={{color:'#774D9D', border:"none", fontSize:18, fontWeight: 600}}><LeftOutlined color={'#774D9D'} /> Back to short form</Button>
                    </div>
                    <div style={{marginTop:22}}>
                        <Form
                            name="edit"
                            onFinish={onFinish}
                            layout="vertical"
                        >
                            <FormInput label={t('Address')}   rules={[{required: true}]} />
                            <FormInput label={t('Date of Birth')} inputType={'date'} rules={[{required: true}]} />
                            <FormInput label={t('Natoinality')} />
                            <FormInput label={t('Identification number')} />
                            <FormInput label={t('Insurance company')} />
                            {/*<FileManager text1={'Insurance Card Back'}
                                         text2={'upload image'}
                                         uploadIcon={<img alt={'icons'} src={addimage}/>}
                                         name={'cover'} initialFileList={[]} formRef={formRef} type={'drag'}/>*/}

                            <div >
                                <Button style={{width:'100%',}} size={'large'}  type={'secondary'} onClick={()=>setOpen(false)} htmlType="submit">{t('Cancel')}</Button>
                            </div>

                        </Form>
                    </div>

                </Col>
            </Row>

        </div>
    )
}
export default ClinicManagerCalendarDrawerLarge;