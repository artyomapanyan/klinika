import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import DateParser from "../../Fragments/DateParser";
import TableEditable from "../../Fragments/TableEditable";
import Resources from "../../../store/Resources";
function LabTests() {
    return(
        <div>
            <ResourceTable resource={'LabTest'} tableColumns={[
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
                    render:(e,record)=><TableEditable
                        label={'Status'}
                        resource={'LabTest'}
                        initialData={Resources.Status}
                        updateKey={'status'}
                        value={e}
                        record={record}
                        inputType={'resourceSelect'}/>
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
