import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import DateParser from "../../Fragments/DateParser";
import ColorSelect from "../../Fragments/ColorSelect";
import Resource from "../../../store/Resources";
import React from "react";

let resource='Report'
function Reports() {
    return (
        <div>
            <ResourceTable resource={'Report'}
                           except={{edit: true}}
                           buttonAdd={false}
                           tableColumns={[
                {
                    dataIndex:'id',
                    title:'ID',
                    key:'id',
                    sorter:true,
                },
                {
                    dataIndex:['topic', 'title'],
                    title:t('topic'),
                    key:'topic',
                    sorter:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:'description',
                    title:t('details'),
                    key:'description',
                    translatable:true,
                },
               {
                    dataIndex:'type',
                    title:t('Type'),
                    key:'type',
                    render: (e, record) => {
                        return <ColorSelect items={Resource.StatusReports} initialValue={e.toString()} record={record} resource={'Report'} name={'type'}/>
                    }

               },
                {
                    dataIndex:['created_at','iso_string'],
                    title:t('Create date'),
                    key:'date',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Reports')}/>
        </div>
    )
}
export default Reports;
