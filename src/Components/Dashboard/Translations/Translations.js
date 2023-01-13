import React, {useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Input, Table} from "antd";
import {createResource} from "../../Functions/api_calls";

function Translations(){
    let token = useSelector((state) => state.auth.token);
    const translations = useSelector(state=>state.app.translations)
    const dispatch = useDispatch();
    const filteredTranslations = useMemo(()=>{
       let transArray = []
       Object.keys(translations).forEach(key=>{
           transArray.push({
               key:key,
               value:translations[key]
           })
       })
       return transArray
    },[translations])
   const handleSaveTranslation = (record) =>{
        let data = {
            translations:{
            ...translations,
            [record.key]:record.value
            }
        }
        createResource('Translation',data,token).then(data=>{
            dispatch({
                type:'UPDATE_TRANSLATIONS',
                payload:data
            })
        })
   }
    return(
        <div>
            <Table
                columns={[
                    {
                        title:'Key',
                        dataIndex:'key',
                        key:'key'
                    },
                    {
                        title:'Value',
                        dataIndex:'value',
                        key:'value',
                        shouldCellUpdate:(record, prevRecord)=>record.value!==prevRecord.value,
                        render:(i,record)=><Input defaultValue={record.value} onChange={(value)=>record.value=value.target.value}/>
                    },
                    {
                        title:'Submit',
                        dataIndex:'submit',
                        key:'submit',
                        render:(i,record)=><Button onClick={()=>handleSaveTranslation(record)}>Save</Button>
                    },
                ]}
                dataSource={filteredTranslations}/>

        </div>
    )
}

export default Translations
