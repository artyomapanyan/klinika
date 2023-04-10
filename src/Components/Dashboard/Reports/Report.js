import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Form, Popconfirm, Space} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import CancelComponent from "../../Fragments/CancelComponent";
import {InboxOutlined} from "@ant-design/icons";
import FileManager from "../../Fragments/FileManager";
import Resources from "../../../store/Resources";

const resource = 'Report';

function Report() {
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
            updateResource(resource, params.id, values, token).then(response => {
                if(response?.id){
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
                }

            }).finally(() => {
                setSaveLoading(false)
            })
        }

    }
    const handleValuesChange = (changed)=>{
        setChangeValuesState(changed)
    }


    return(
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Area - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Report`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                ref={formRef}
                layout="vertical"
                className={'add_create_form'}
            >
                <div className={'add_edit_content'}>
                    <FormInput inputProps={{mode:'multiple'}} label={t('Types')} name={'type'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.report_topic?.map(e=>e.id)}
                               initialData={data?.report_topic??[]}
                               resource={'Taxonomy'}
                               resourceParams={{type:Resources.TaxonomyTypes.REPORT_TOPIC}}
                    />

                    <FormInput label={t('Topic')} name={'topic_id'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.owner?.id}
                               initialData={data?.owner ? [data.owner]:[]}
                               resource={'Taxonomy'}/>
                    <FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>
                    <FileManager text1={'Gallery'}
                                 text2={'Download files'}
                                 name={'gallery'}
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
