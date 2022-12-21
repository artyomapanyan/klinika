import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
function LabPackages() {
    return(
        <div>
            <ResourceTable resource={'LabPackage'} tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                },
                {

                    title:t('Lab packages'),
                    dataIndex:'name',
                    key:'name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:'date',
                    title:t('Create date'),
                    key:'date',
                },
            ]} title={t('Lab packages')}/>
        </div>
    )
}
export default LabPackages;
