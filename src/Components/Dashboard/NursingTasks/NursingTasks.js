import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import DateParser from "../../Fragments/DateParser";
import Resource from "../../../store/Resources";
import ColorSelect from "../../Fragments/ColorSelect";
import React from "react";
import PermCheck from "../../Fragments/PermCheck";

const resource='NursingTask'
function NursingTasks() {
    return (
        <div>
            <ResourceTable resource={resource}
                           except={{
                               delete: PermCheck(`NursingTask:delete`) ? false : true,
                               edit: PermCheck(`NursingTask:update`) ? false : true
                           }}
                           exportDatabase={true}

                           tableColumns={[
                {
                    dataIndex:'id',
                    title:'ID',
                    key:'id',
                    sorter:true,
                },
                {
                    dataIndex:'name',
                    title:t('Name'),
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
            ]} title={t('Nursing task')}/>
        </div>
    )
}
export default NursingTasks;
