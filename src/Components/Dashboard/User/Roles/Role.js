import React, {useMemo, useRef, useState} from "react";
import {t} from "i18next";
import Preloader from "../../../Preloader";
import {Button, Form, Space, Tree} from "antd";
import FormInput from "../../../Fragments/FormInput";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../../Functions/api_calls";
import resourceLinks from "../../../ResourceLinks";

const resource = 'Role';
function Role() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const [checkKeysState, setCheckKeysState] = useState([]);
    const handleFilterResponse = (data)=>{
        setCheckKeysState(data.permissions.map(e=>e.id))
        return data
    }
    const {loadingState, dataState,addDataState} = useGetResourceSingle(resource, params.id,{
        Permission: {},
    },handleFilterResponse)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const {addData} = addDataState


    const onFinish = (values) => {
        values.permissions = checkKeysState.filter(el=>Number.isInteger(el))
        setLoading(true)
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
                    navigate(resourceLinks[resource] + response.id)
                }

            }).finally(() => {
                setLoading(false)
            })
        }
    }

    let treeData = useMemo(()=>Object.entries(addData?.Permission??{}).map((el) => {
        return {
            title:el[0],
            key: el[0],
            children: el[1].map((el) => {
                return {
                    title: `${el.entry} ${el.ability}`,
                    key: el.id
                }
            })
        }
    }),[addData])

    const onCheck = (checkedKeys) => {
        setCheckKeysState(checkedKeys)
    };

    return(
        <div className={'add_edit_content'}>
            {data?.name ? <h3>{t(`Editing Role - ${data?.name}`)}</h3> : <h3>{t(`Add new Role`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
            >

                <FormInput label={t('name')} name={'name'} initialValue={data?.name}/>
                <Form.Item name={'permissions'}
                           valuePropName={'selectedKeys'}>
                    <Tree
                        checkable
                        checkedKeys={checkKeysState}
                        onCheck={onCheck}
                        treeData={treeData}
                    />
                </Form.Item>

                <Space>
                    <Button size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <Button size={'large'} onClick={()=>(navigate(resourceLinks[resource]))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>
            </Form>}
        </div>
    )
}
export default Role;
