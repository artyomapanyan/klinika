
import {Button, Form, Space} from 'antd';
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import {useNavigate, useParams} from "react-router";
import Preloader from "../../Preloader";
import {useDispatch, useSelector} from "react-redux";
import resourceLinks from "../../ResourceLinks";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import React, {useRef, useState} from "react";
import FileManager from "../../Fragments/FileManager";
import {InboxOutlined} from "@ant-design/icons";
import CancelComponent from "../../Fragments/CancelComponent";



const resource = 'Taxonomy';

function Specialty() {
    let dispatch = useDispatch();
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
        values.type = Resources.TaxonomyTypes.SPECIALTY
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token, true).then(response => {
                if(response?.id){
                    setData(response)
                    navigate(resourceLinks['Specialty'])
                }
            }).finally(() => {
                dispatch({
                    type: 'DASHBOARD_STATE',
                    payload: false
                })
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token, true).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks['Specialty'])
                }

            }).finally(() => {
                dispatch({
                    type: 'DASHBOARD_STATE',
                    payload: false
                })
                setSaveLoading(false)
            })
        }

    }

    const handleValuesChange = (changed)=>{
        setChangeValuesState(changed)
        if(Object.keys(changed).length > 0) {
            dispatch({
                type: 'DASHBOARD_STATE',
                payload: true
            })
        }
    }

const res = 'Specialty';
    return (
        <div>
            {data?.title ? <h3 className={'create_apdate_btns'}>{t(`Editing Specialty - ${data?.title}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Specialty`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
            >
                <div  className={"add_edit_content"}>
                    <FormInput label={t('Title')} name={'title'} initialValue={data?.title} rules={[{required: true}]}/>
                    <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.status}
                               initialData={Resources.Status}
                    />
                    <FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>
                    <FileManager text1={'Click or drag file to this area to upload'}
                                 text2={'Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files'}
                                 name={'cover'}
                                 uploadIcon={<InboxOutlined/>}
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

export default Specialty;
