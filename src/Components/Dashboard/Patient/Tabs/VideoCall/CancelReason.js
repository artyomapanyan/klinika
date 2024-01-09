import React, {useState} from "react";
import {Button, Checkbox, Form, Radio} from "antd";
import {t} from "i18next";
import FormInput from "../../../../Fragments/FormInput";
import {postResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";

let resource = 'Appointment';
function CancelReason({setIsModalOpen, data}) {
    const token = useSelector((state) => state.auth.token);
    const [radioState, setRadioState] = useState('');
    const [loading, setloading] = useState(false);

    const onChange = (e) => {
        setRadioState(e.target.value)
    };

    const onFinish = (values) => {
        setloading(true)
        postResource(resource,'AddTelehealthNotes', token,  `${data?.id}/add-telehealth-notes`, {
            telehealth_notes: values?.radio === '1' ? 'The patient did not answer the call' :
                values?.radio === '2' ? 'Technical issues. There is no way to connect.' : values?.description
            }
        ).then((response) => {

        }).finally(() => {
            setloading(false)
            setIsModalOpen(false)
        })

    }

    return(
        <div>
            <Form
                onFinish={onFinish}
            >
                <div style={{marginTop: 20}}>
                    {t("Please specify reason of cancellation")}
                </div>
                <Form.Item name={'radio'} rules={[{required: true}]}>
                    <Radio.Group
                        direction="vertical"
                        onChange={onChange}
                        value={radioState}
                        buttonStyle={'solid'}
                    >
                        <div style={{marginTop: 19}}>
                            <Radio  value="1">{t('The patient did not answer the call')}</Radio>
                        </div>
                        <div style={{marginTop: 29}}>
                            <Radio  value="2">{t('Technical issues. There is no way to connect')}</Radio>
                        </div>
                        <div style={{marginTop: 29}}>
                            <Radio  value="3">{t('Other problem')}</Radio>
                        </div>

                    </Radio.Group>
                </Form.Item>
                <FormInput inputDisabled={radioState != 3} rules={[{required: radioState === '3'}]}  label={t('description')} name={'description'} inputType={'textArea'}/>
                <div style={{ marginLeft: 5}}>
                    <Button loading={loading} size={'large'} type={'primary'} htmlType="submit">{t("Submit reason")}</Button>
                    <Button onClick={()=>setIsModalOpen(false)} style={{marginLeft: 10}} size={'large'} type={'secondary'}>{t("Cancel")}</Button>
                </div>

            </Form>



        </div>
    )
}
export default CancelReason;