import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import DateParser from "../../Fragments/DateParser";
import Resource from "../../../store/Resources";
import ColorSelect from "../../Fragments/ColorSelect";
import PermCheck from "../../Fragments/PermCheck";

const resource='LabTest'
function LabTests() {
    return(
        <div>
            <ResourceTable resource={resource}
                           except={{
                               delete: PermCheck(`LabTest:delete`) ? false : true,
                               edit: PermCheck(`LabTest:update`) ? false : true
                           }}
                           exportDatabase={true}
                           tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                },
                {

                    title:t('Lab tests'),
                    dataIndex:'name',
                    key:'name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:['status'],
                    title:t('Status'),
                    key:'category',
                    shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
                    render:(e,record)=><ColorSelect items={Resource.Status1} initialValue={e.toString()} record={record} resource={resource} name={'status'}/>
                },
                {
                    dataIndex:['created_at','iso_string'],
                    title:t('Create date'),
                     key:'date',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Lab test')}/>
        </div>
    )
}
export default LabTests;
