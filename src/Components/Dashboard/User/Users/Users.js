import React from 'react'
import ResourceTable from "../../../Fragments/ResourceTable";
import TableFilterElement from "../../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import DateParser from "../../../Fragments/DateParser";
import PermCheck from "../../../Fragments/PermCheck";
import {useSelector} from "react-redux";

function Users() {
    let language = useSelector((state) => state.app.current_locale)
    return(
        <div>
            <ResourceTable resource={'User'}
                           except={{
                               delete: PermCheck(`User:delete`) ? false : true,
                               edit: PermCheck(`User:update`) ? false : true
                           }}
                            tableParams={{
                                excludePatients: true,
                            }}
                           tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                },
                {
                    title:t('First Name'),
                    dataIndex:'first',
                    key:'first',
                    sorter:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    title:t('Last Name'),
                    dataIndex:'last',
                    key:'last',
                    sorter:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    title:t('Phone number'),
                    dataIndex:'phone_number',
                    key:'phone_number',

                },
                {
                    title:t('Clinics'),
                    dataIndex:'clinic_names',
                    key:'clinic_names',
                    className: 'table_clinics_column'
                },
                {
                    title:t('Roles'),
                    dataIndex:'roles',
                    key:'roles',
                    translatable:true,
                    render:(e, record) => {
                        return record?.roles?.map((e, i) => {
                            return e?.name[language] + (i === record?.roles.length - 1 ? '' : ', ')
                        })
                    }
                },
                {
                    dataIndex:['updated_at','iso_string'],
                    title:t('Create date'),
                    key:'date',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Users')}/>
        </div>
    )
}
export default Users;
