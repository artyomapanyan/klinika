import React, {useState} from 'react';
import ResourceTable from "../../Fragments/ResourceTable";
import {Button, Input, InputNumber} from "antd";
import {t} from "i18next";
import {updateResource} from "../../Functions/api_calls";
import {useSelector} from "react-redux";

const resource = 'Preference'

function Preferences() {
    let token = useSelector((state) => state.auth.token);
    const [loading,setLoading] = useState({})
    const handleSave =(record)=>{
        setLoading({
            [record.id]:true
        })
       updateResource(resource,record.id,record,token).then(()=>{
           setLoading({})
       })
    }

    return (
        <ResourceTable resource={resource}
                       exportButton={false}
                       addBtn={false}
                       exportDatabase={false}
                       hideActions={true}
                       tableColumns={[
                           {
                               title: t('Key'),
                               dataIndex: 'key',
                               key: 'key'
                           },
                           {
                               title: t('Value'),
                               dataIndex: 'value',
                               key: 'value',
                               render:(i,record)=>record.type==='number'?<InputNumber defaultValue={record.value} onChange={(e)=>record.value=e}/>:
                                   record.type==='text'?<Input defaultValue={record.value} onChange={(e)=>record.value=e.target.value}/>:
                                       record.type==='textarea'?<Input.TextArea defaultValue={record.value} onChange={(e)=>record.value=e.target.value}/>:
                                   record.value
                           },
                           {
                               title: t('Save'),
                               dataIndex: 'save',
                               key: 'save',
                               render:(i,record)=><Button type={'primary'} loading={loading[record.id]} onClick={()=>handleSave(record)}>{t('Save')}</Button>
                           },
                       ]} title={t('Preference')}/>
    )
}

export default Preferences
