import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
function Regions() {
    return(<ResourceTable resource={'Region'} tableColumns={[
                {
                    dataIndex:'id',
                    title:'ID',
                    key:'id',
                    sorter:true,
                },
                {
                    dataIndex:'name',
                    title: t('Area'),
                    key:'name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:['country', 'name'],
                    title: t('Country'),
                    key:'country',
                },
                {
                    dataIndex:'date',
                    title: t('Create date'),
                    key:'date',
                },
            ]} title={t('Areas')}/>
    )
}
export default Regions;
