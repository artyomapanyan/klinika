
import {Button, Form, Space} from 'antd';
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import {useNavigate, useParams} from "react-router";
import Preloader from "../../Preloader";
import {useSelector} from "react-redux";
import resourceLinks from "../../ResourceLinks";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import React, {useRef} from "react";
import FileManager from "../../Fragments/FileManager";



const resource = 'Taxonomy';

function BugReportTopic() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState

    const onFinish = (values) => {
        setLoading(true)
        values.type = Resources.TaxonomyTypes.REPORT_TOPIC
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token, true).then(response => {
                if(response?.id){
                    setData(response)
                }
            }).finally(() => {
                setLoading(false)
            })
        } else {
            createResource(resource, values, token, true).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks['BugReport'] + response.id)
                }

            }).finally(() => {
                setLoading(false)
            })
        }

    }

    return (
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Report - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Report`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
            >
                <div className={"add_edit_content"}>
                    <FormInput label={t('Title')} name={'title'} initialValue={data?.title} rules={[{required: true}]} />
                    <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.status}
                               initialData={Resources.Status}
                    />
                    <FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>
                    <FileManager text1={'Logo'}
                                 text2={''}
                                 name={'icon'}
                                 initialFileList={[data.icon]} limit={1} formRef={formRef} type={'drag'}/>
                </div>
                <Space className={'create_apdate_btns'}>
                    <Button size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                    <Button size={'large'} onClick={()=>(navigate(resourceLinks['BugReport']))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>
            </Form>}
        </div>

    )
}

export default BugReportTopic;
