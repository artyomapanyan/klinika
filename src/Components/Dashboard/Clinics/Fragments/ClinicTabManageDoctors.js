import React, {useRef} from "react";
import {t} from "i18next";
import Preloader from "../../../Preloader";
import {Button, Col, Form, Row, Space, Switch} from "antd";
import FormInput from "../../../Fragments/FormInput";

function ClinicTabManageDoctors() {

    return(
        <div >
                <div className={'add_edit_content'}>
                    <FormInput label={t('First')} name={'name'}  rules={[{required: true}]} />
                    <FormInput label={t('Description')} name={'description'} inputType={'textArea'} />
                </div>



                <Space className={'create_apdate_btns'}>
                    <Button size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <Button size={'large'} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>

        </div>
    )
}
export default ClinicTabManageDoctors;