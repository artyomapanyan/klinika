import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import DateParser from "../../Fragments/DateParser";
import PermCheck from "../../Fragments/PermCheck";

function Regions() {

    return(<ResourceTable resource={'Region'}
                          except={{
                              delete: PermCheck(`Region:delete`) ? false : true,
                              edit: PermCheck(`Region:update`) ? false : true
                          }}

                          tableColumns={[
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
                    filterDropdown: (props)=><TableFilterElement
                        resource='Country'
                        type={'selectFilter'}
                        name={'country_id'}
                        filterProps={props}/>,
                },
                {
                    dataIndex:['created_at','iso_string'],
                    title: t('Create date'),
                     key:'date',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Areas')}/>
    )
}
export default Regions;
