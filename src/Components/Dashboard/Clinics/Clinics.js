import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import ColorSelect from "../../Fragments/ColorSelect";
import Resource from "../../../store/Resources";
import {useNavigate} from "react-router";

const resource='Clinic';
function Clinics() {
    const navigate = useNavigate()

    return(
        <div>
            <ResourceTable resource={resource} eyeShow={true}

                           tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                },
                {
                    title:t('Clinics'),
                    dataIndex:'name',
                    key:'name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:'email',
                    title:t('Email'),
                    key:'email',
                    filterDropdown: (props)=><TableFilterElement filterProps={props} resource={'Region'}/>,
                },
                {
                    dataIndex:['status'],
                    title:t('Status'),
                    key:'status',
                    shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
                    render:(e,record)=><ColorSelect items={Resource.Status1} initialValue={e.toString()} record={record} resource={resource} name={'status'}/>
                },
            ]} title={t('Clinics')}/>
        </div>
    )
}
export default Clinics;
