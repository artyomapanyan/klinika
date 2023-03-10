import React from 'react';
import {Avatar, Button, Form, Space, Tag} from "antd";
import {UserOutlined} from "@ant-design/icons";
import FormInput from "../../../../../Fragments/FormInput";
import {t} from "i18next";


function ClinicManagerCalendarDrawerSmall({openLargeDrawer}) {
    // const [open, setOpen] = useState(false);
    // const largeDrawer = () => {
    //     setOpen(true)
    // }

    const onFinish = () => {

    }

    return(
        <div>
            <div style={{padding: 10, marginTop:20}}>
                <Space >
                    <Avatar size={50} icon={<UserOutlined />} />
                    <div style={{display:"block"}}>
                        <h3 className={'h1'}>Darrell Steward</h3>
                        <div>Pediatrics</div>
                    </div>
                </Space>
                <Tag color="#ce4e99" size={'large'} style={{fontSize:17, fontWeight:550, marginTop:20, marginLeft:50, padding:6, borderRadius:10}}>12:00</Tag>
            </div>
            <div>
                <Form
                    name="edit"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <FormInput label={t('First name')}   rules={[{required: true}]} />
                    <FormInput label={t('Last name')} rules={[{required: true}]} />
                    <FormInput label={t('Email')}  rules={[{required: true}]} />
                    <div style={{display:"flex", width:'100%'}}>
                        <div style={{width:80}}>
                            <FormInput label={t('Code')} name={'phone_country_code'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={966}
                                // handleMapItems={handleMapItems}
                                // resource={'Country'}
                            />
                        </div>
                        <div style={{marginLeft:20, width:'100%'}}>
                            <FormInput label={t('Phone number')} name={'phone_number'} />
                        </div>
                    </div>
                    <div>
                        <Button style={{width:'100%'}} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    </div>
                    <div>
                        <Button onClick={openLargeDrawer} style={{width:'100%', marginTop:15}} size={'large'}  type={'secondary'} htmlType="submit">{t('Show Extended')}</Button>
                    </div>
                    <div>
                        <Button style={{width:'100%', marginTop:15, border:"none"}} size={'large'}  type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                    </div>
                </Form>
            </div>
            {/*<Drawer size={'large'} title="Add Appointment" placement="right" onClose={()=>setOpen(false)} open={open}>*/}
            {/*    <ClinicManagerCalendarDrawerLarge />*/}
            {/*</Drawer>*/}
        </div>
    )
}
export default ClinicManagerCalendarDrawerSmall;