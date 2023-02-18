import React, {useEffect, useRef, useState} from "react";
import {t} from "i18next";

import {useNavigate, useParams} from "react-router";
import {Button, Form, Space, Table,} from "antd";

import {useSelector} from "react-redux";
import {postResource, updateResource} from "../../../../../Functions/api_calls";
import FormInput from "../../../../../Fragments/FormInput";
import {DeleteOutlined} from "@ant-design/icons";
import resourceLinks from "../../../../../ResourceLinks";

const resource = "Clinic";
const service = 'nursing'
function ClinicNursingTasks() {
    const params = useParams();
    let token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const LabTestRef = useRef();
    const [loading, setLoading] = useState(false)

    const [testData, setTestData] = useState([]);
    const [nursingTasks, setNursingTasks] = useState([]);



    useEffect(()=>{
        Promise.all([
            postResource(resource,'NursingTask',token,params.id,{service}),
            postResource('NursingTask','list',token,null,{per_page:5000}),

        ]).then(responses => {
            const testDataKeys = responses[0].map((el) => {
                return el.nursing_task_id
            })

            LabTestRef.current = responses[1].items;

            setTimeout(()=>setNursingTasks(LabTestRef.current.filter(item => !testDataKeys.includes(item.id))),50)
            setNursingTasks(LabTestRef.current)
            setTestData(responses[0])
        })
    },[])



    const onFinish = (values) => {
        values = Object.values(values)
        let data = {
            nursing_tasks:values
        }
        setLoading(true)

        if (params.id) {
            updateResource('ClinicNursingTask', params.id, data, token).then(response => {
            }).finally(() => {
                setLoading(false)
            })
        }
    }



    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render:(e, record, key)=> {
                return <FormInput resourceSelectStyle={{width: '100%'}} label={t('Test')} name={[key,'nursing_task_id']} inputType={'resourceSelect'}
                                  resource={'LabTest'} initialValue={record?.nursing_task_id} resourceData={nursingTasks}/>
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render:(e, record, key)=> {
                return <FormInput inputNumberStyle={{width:'100%'}} label={t('Price')} name={[key,'price']} inputType={'number'} initialValue={e}/>
            }
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render:(e,v,key)=> {
                return <Button onClick={()=>onDelete(key)}><DeleteOutlined /></Button>
            }
        },

    ];

    const addNewTest = () => {
        setTestData([
            ...testData,
            {
                nursing_task_id: null,
                price: null,
            }
        ])
    }


    const formOnChange = (changedValues, allValues) => {
        let testDataKeys = Object.values(allValues).map((el) => {
            return el?.nursing_task_id
        })
        setNursingTasks(LabTestRef.current.filter(item => !testDataKeys.includes(item.id)))
    }

    const onDelete = (key) => {
        setTestData(
            testData.filter((el, keys)=> {
                return keys !== key
            })
        )
    }


    return(
        <div>
            <div  className={'add_edit_content'}>
                <h1 className={'h1'}>{t(`Tests`)}</h1>


                <Form
                    name="edit"
                    onFinish={onFinish}
                    layout="vertical"
                    onValuesChange={formOnChange}
                >

                    <Table loading={loading} dataSource={testData} columns={columns} footer={false} pagination={false} rowKey={(e,v)=>v} />
                    <Button type={'primary'} size={'large'} style={{margin:20}} onClick={addNewTest}>+</Button>
                    <div>
                        <Space className={'lab_save'}>
                            <Button size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                            <Button size={'large'} onClick={()=>(navigate(resourceLinks[resource]))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                        </Space>
                    </div>
                </Form>
            </div>
        </div>
    )
}
export default ClinicNursingTasks;