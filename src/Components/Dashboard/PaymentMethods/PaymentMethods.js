import React, {useState} from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import Resources from "../../../store/Resources";
import {Select} from "antd";
import {useSelector} from "react-redux";
import {updateResource} from "../../Functions/api_calls";

function PaymentMethods() {
    let token = useSelector((state) => state?.auth?.token);
    const [loading,setLoading] = useState({});

    const statusChange = (record) => {
        setLoading({
            [record.id]:true
        })
        updateResource('PaymentMethod',record.id,record,token).then((resp) => {
            setLoading({})
        })
    }
    return(
        <div>
            <ResourceTable resource={'PaymentMethod'}
                           tableParams={{type:Resources.TaxonomyTypes.REPORT_TOPIC}}

                           tableColumns={[
                               {
                                   dataIndex:'id',
                                   title:'ID',
                                   key:'id',
                                   sorter:true,
                               },
                               {
                                   dataIndex:'title',
                                   title:t('Title'),
                                   key:'title',
                                   translatable:true,
                               },
                               {
                                   dataIndex:['status'],
                                   title:t('Status'),
                                   key:'category',
                                   render:(e,record)=> <Select
                                       defaultValue={e}
                                       loading={loading[record.id]}
                                       style={{width: 150, color:'red'}}
                                       onChange={(e)=>statusChange({
                                           ...record,
                                           status:e
                                       })}
                                   >
                                       {Resources.Status.map((el) => (
                                           <Select.Option key={el} value={el.id}>{el.name}</Select.Option>
                                       ))
                                       }
                                   </Select>
                               },
                               {
                                   dataIndex:'create_date',
                                   title:t('Create date'),
                                   key:'create_date',
                                   render:(e,record)=>{
                                       return console.log(e, record, 'd')
                                   }
                               },
                               {
                                   dataIndex:'date',
                                   title:t('Create date'),
                                   key:'date',
                               },
                           ]} title={t('Report Topics')}/>
        </div>
    )
}
export default PaymentMethods;
