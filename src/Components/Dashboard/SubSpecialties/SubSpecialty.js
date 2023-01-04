
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
import {InboxOutlined} from "@ant-design/icons";



const resource = 'Taxonomy';

function SubSpecialty() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState


    const onFinish = (values) => {
        setLoading(true)
        values.type = Resources.TaxonomyTypes.SUB_SPECIALTY
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                if(response?.id){
                    setData(response)
                }
            }).finally(() => {
                setLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks['SubSpecialty'] + response.id)
                }

            }).finally(() => {
                setLoading(false)
            })
        }

    }

    return (
        <div className={"add_edit_content"}>
            {data?.title ? <h3>{t(`Editing Sub Specialty - ${data?.title}`)}</h3> : <h3>{t(`Add new Sub Specialty`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
            >
                <FormInput label={t('Title')} name={'title'} initialValue={data?.name} rules={[{required: true}]}/>
                <FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>
                <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={data?.status}
                           initialData={Resources.Status}
                />

                <FileManager text1={'Click or drag file to this area to upload'}
                             text2={'Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files'}
                             name={'cover'}
                             uploadIcon={<InboxOutlined/>}
                             initialFileList={[data.cover]} limit={1} formRef={formRef} type={'drag'}/>

                <Space>
                    <Button size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                    <Button size={'large'} onClick={()=>(navigate(resourceLinks["SubSpecialty"]))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>
            </Form>}
        </div>

    )
}

export default SubSpecialty;
