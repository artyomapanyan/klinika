import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import Resources from "../../../store/Resources";
import DateParser from "../../Fragments/DateParser";
import TableEditable from "../../Fragments/TableEditable";

function PaymentMethods() {
    return (<div>
        <ResourceTable resource={'PaymentMethod'}
                       tableParams={{type: Resources.TaxonomyTypes.REPORT_TOPIC}}

                       tableColumns={[
                           {
                               dataIndex: 'id',
                               title: 'ID',
                               key: 'id',
                               sorter: true,
                           },
                           {
                               dataIndex: ['key'],
                               title: t('Key'),
                               key: 'key',
                               shouldCellUpdate: (record, prevRecord) => record.key !== prevRecord.key,
                               render: (e, record) => <TableEditable
                                   label={'Key'}
                                   resource={'PaymentMethod'}
                                   initialData={Resources.PaymentMethodKeys}
                                   updateKey={'key'}
                                   value={e}
                                   record={record}
                                   inputType={'resourceSelect'}/>
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
                             return <TableEditable
                                   label={'Status'}
                                   resource={'PaymentMethod'}
                                   initialData={Resources.Status}
                                   updateKey={'status'}
                                   value={e}
                                   record={record}
                                   inputType={'resourceSelect'}/>
                           }
                       }, {
                           dataIndex: 'create_date',
                           title: t('Create date'),
                           key: 'create_date',
                       }, {
                           dataIndex: ['created_at', 'iso_string'],
                           title: t('Create date'),
                           key: 'date',
                           render: i => <DateParser date={i}/>
                       },]} title={t('Payment methods')}/>
    </div>)
}

export default PaymentMethods;
