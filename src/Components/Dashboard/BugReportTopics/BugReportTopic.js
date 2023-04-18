
import {Button, Form, Popconfirm, Space} from 'antd';
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import {useNavigate, useParams} from "react-router";
import Preloader from "../../Preloader";
import {useSelector} from "react-redux";
import resourceLinks from "../../ResourceLinks";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import React, {useRef, useState} from "react";
import FileManager from "../../Fragments/FileManager";
import {InboxOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import CancelComponent from "../../Fragments/CancelComponent";



const resource = 'Taxonomy';

function BugReportTopic() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [changeValuesState, setChangeValuesState] = useState({})

    const onFinish = (values) => {
        setSaveLoading(true)
        values.type = Resources.TaxonomyTypes.REPORT_TOPIC
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token, true).then(response => {
                if(response?.id){
                    setData(response)
                    navigate(resourceLinks['BugReport'])
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token, true).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks['BugReport'])
                }

            }).finally(() => {
                setSaveLoading(false)
            })
        }

    }
    const res = 'BugReport';
    const handleValuesChange = (changed)=>{
        setChangeValuesState(changed)
    }

    return (
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Report - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Report`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
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
                                 text2={'Download files'}
                                 uploadIcon={<InboxOutlined/>}
                                 name={'cover'}
                                 initialFileList={[data.cover]} limit={1} formRef={formRef} type={'drag'}/>
                </div>
                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                    <CancelComponent changeValuesState={changeValuesState} resource={res}/>
                </Space>
            </Form>}
        </div>

    )
}

export default BugReportTopic;
