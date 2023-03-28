import React from "react";
import {Avatar, Button, Form,  Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {t} from "i18next";
import FormInput from "../../../../../Fragments/FormInput";

function DoctorsLicenseModal() {


    return(
        <Form>
            <div style={{padding: 10}}>
                <Space >
                    <Avatar size={50} icon={<UserOutlined />} />
                    <div style={{display:"block"}}>
                        <h3 className={'h1'}>Darrell Steward</h3>
                        <div>Pediatrics</div>
                    </div>

                </Space>
            </div>
            <FormInput label={t('New Liciense Date')} inputType={'date'} />
            <FormInput label={t('Liciense Number')} name={'first'} />
            <Button size={'large'} type={'primary'} style={{width:'100%'}}>{t("Save")}</Button>
        </Form>
    )
}
export default DoctorsLicenseModal;