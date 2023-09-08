import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import Preloader from "../../Preloader";
import {Button, Form, Space} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import CancelComponent from "../../Fragments/CancelComponent";
import {InboxOutlined} from "@ant-design/icons";
import Resources from "../../../store/Resources";
import FileManager from "../../Fragments/FileManager";

const resource = 'Report';

function Report() {
    let dispatch = useDispatch();
    const formRef = useRef();
    const params = useParams();
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [changeValuesState, setChangeValuesState] = useState({})


    const onFinish = (values) => {
        setSaveLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token, true).then(response => {
                if(response?.id){
                    navigate(-1)

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
                    navigate(-1)
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


    return(
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Request - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Request`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                ref={formRef}
                layout="vertical"
                className={'add_create_form'}
            >
                <div className={'add_edit_content'}>
                    {/*<FormInput inputProps={{mode:'multiple'}} label={t('Types')} name={'type'} inputType={'resourceSelect'}*/}
                    {/*           rules={[{required: true}]}*/}


                    {/*           resource={'Taxonomy'}*/}
                    {/*           resourceParams={{type:Resources.TaxonomyTypes.REPORT_TOPIC}}*/}
                    {/*/>*/}
                    <FormInput label={t('Types')} name={'type'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialData={Resources.StatusReports1}
                    />

                    <FormInput label={t('Topic')} name={'topic_id'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               resource={'Taxonomy'}
                               resourceParams={{type:Resources.TaxonomyTypes.REPORT_TOPIC}}
                    />

                    <FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>
                    <FileManager text1={t('Gallery')}
                                 text2={t('Download files')}
                                 name={'icon'}
                                 uploadIcon={<InboxOutlined/>}
                                 initialFileList={[data?.gallery]} limit={5} formRef={formRef} type={'drag'}/>
                </div>


                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                    <CancelComponent changeValuesState={changeValuesState} resource={resource}/>
                </Space>
            </Form>}
        </div>
    )
}
export default Report;
