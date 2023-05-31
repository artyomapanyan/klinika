import ResourceTable from "../../../Fragments/ResourceTable";
import {t} from "i18next";
import TableFilterElement from "../../../Fragments/TableFilterElements/TableFilterElement";
import DateParser from "../../../Fragments/DateParser";
import React from "react";
import ColorSelect from "../../../Fragments/ColorSelect";
import Resource from "../../../../store/Resources";

let resource = 'Invoice'
function Invoices() {
    return(
        <div>
            <ResourceTable resource={resource}

                           tableColumns={[
                               {
                                   dataIndex:['date','iso_string'],
                                   title:t('Date'),
                                   key:'date',
                                   render:i=><DateParser date={i}/>
                               },
                               {
                                   title:t('Invoice number'),
                                   dataIndex:'invoice_number',
                                   key:'invoice_number',
                                   render:(e, record)=> {
                                       console.log(record)
                                       return record?.invoice_number
                                   }
                               },
                               {
                                   dataIndex:'diagnosis_price',
                                   title:t('Price'),
                                   key:'diagnosis_price',
                                   render:(e, record) => {
                                       return <div>{record?.diagnosis_price} SAR</div>
                                   }
                               },
                               {
                                   dataIndex:'client_name',
                                   title:t('Client name'),
                                   key:'client_name',
                               },
                               {
                                   dataIndex:['status'],
                                   title:t('Status'),
                                   key:'category',
                                   shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
                                   render:(e,record)=><ColorSelect items={Resource.StatusInvoices} initialValue={e.toString()} record={record} resource={resource} name={'status'}/>
                               },

                           ]} title={t('Invoices')}/>
        </div>
    )
}
export default Invoices;