import React from 'react'

import {t} from "i18next";
import TableFilterElement from "../../../Fragments/TableFilterElements/TableFilterElement";
import ResourceTable from "../../../Fragments/ResourceTable";
import DateParser from "../../../Fragments/DateParser";


function InvoiceItems() {
    return(
        <div>
            <ResourceTable resource={'InvoiceItem'}

                           tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                },
                {
                    title:t('Name'),
                    dataIndex:'name',
                    key:'name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:'price',
                    title:t('Price'),
                    key:'price',
                },
                {
                    dataIndex:'tax_percentage',
                    title:t('Tax percentage'),
                    key:'tax_percentage',
                },
                {
                    dataIndex:['created_at','iso_string'],
                    title:t('Create date'),
                    key:'date',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Invoice items')}/>
        </div>
    )
}
export default InvoiceItems;
