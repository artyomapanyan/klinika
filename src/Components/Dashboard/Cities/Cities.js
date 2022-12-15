import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
function Cities() {
    return(
        <div>
            <ResourceTable resource={'City'} tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                },
                {

                    title:t('City'),
                    dataIndex:'name',
                    key:'name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:['region','name'],
                    title:t('Area'),
                    key:'area',
                    translatable:true,
                },
                {
                    dataIndex:['region','country','name'],
                    title:t('Country'),
                    key:'country',
                    translatable:true,
                },
                {
                    dataIndex:'date',
                    title:t('Create date'),
                    key:'date',
                },
            ]} title={t('Cities')}/>
        </div>
    )
}
export default Cities;
