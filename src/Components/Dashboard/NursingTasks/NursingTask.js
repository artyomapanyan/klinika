import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Form, Space} from "antd";
import React, {useRef} from "react";
import {t} from "i18next";
import Resources from "../../../store/Resources";
import FormInput from "../../Fragments/FormInput";
import DraftEditor from "../../Fragments/DraftEditor";

const resource = 'NursingTask';

function NursingTask() {

    const params = useParams();
    const formRef = useRef();
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState


    const onFinish = (values) => {
        setLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                if(response?.id){
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
                }

            }).finally(() => {
                setLoading(false)
            })
        }

    }
    return(
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Nursing Task - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Nursing Task`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                ref={formRef}
                layout="vertical"
            >
                <div  className={'add_edit_content'}>
                    <FormInput label={t('name')} name={'name'} initialValue={data?.name} rules={[{required: true}]}/>

                    <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.status}
                               initialData={Resources.Status}
                    />
                    <Form.Item name={'description'} label={t('Description')}>
                        <DraftEditor initialValue={data?.description} formRef={formRef} name={'description'} />
                    </Form.Item>
                </div>
                <Space className={'create_apdate_btns'}>
                    <Button size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                    <Button size={'large'} onClick={()=>(navigate(resourceLinks[resource]))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>
            </Form>}
        </div>
    )
}
export default NursingTask;
