import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import Resources from "../../../store/Resources";
import DateParser from "../../Fragments/DateParser";
import TableEditable from "../../Fragments/TableEditable";
import ColorSelect from "../../Fragments/ColorSelect";
import Resource from "../../../store/Resources";

const resource = 'PaymentMethod'
function PaymentMethods() {

    return (<div>
        <ResourceTable resource={resource}
                       tableParams={{type: Resources.TaxonomyTypes.REPORT_TOPIC}}
                       exportButton={false}
                       tableColumns={[
                           {
                               dataIndex: 'id',
                               title: 'ID',
                               key: 'id',
                               sorter: true,
                           },
                           {
                           dataIndex: 'title',
                               title: t('Title'),
                               key: 'title',
                               translatable: true,
                               shouldCellUpdate: (record, prevRecord) => record.key !== prevRecord.key,
                       },
                           {
                           dataIndex: ['status'],
                           title: t('Status'),
                           key: 'status',
                           shouldCellUpdate: (record, prevRecord) => record.status !== prevRecord.status,
                           render: (e, record) => {
                             return <ColorSelect items={Resource.Status1} initialValue={e.toString()} record={record} resource={resource} name={'status'}/>
                           }
                       },
                       {
                           dataIndex:['expired_at','iso_string'],
                           title:t('Export date'),
                           key:'date',
                           render:i=><DateParser date={i}/>
                       },
                       {
                           dataIndex: ['created_at', 'iso_string'],
                           title: t('Create date'),
                           key: 'date',
                           render: i => <DateParser date={i}/>
                       },
                       ]} title={t('Payment methods')}/>
    </div>)
}

export default PaymentMethods;
