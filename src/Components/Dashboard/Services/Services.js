import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import DateParser from "../../Fragments/DateParser";
import PermCheck from "../../Fragments/PermCheck";

function Services() {
    return (
        <div>
            <ResourceTable resource={'Service'}
                           except={{
                               delete: PermCheck(`Service:delete`) ? false : true,
                               edit: PermCheck(`Service:update`) ? false : true
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
                    title:t('Name'),
                    key:'name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:['sub_category','name'],
                    title:t('Sub category'),
                    key:'category',
                    translatable:true,
                },
                {
                    dataIndex:['created_at','iso_string'],
                    title:t('Create date'),
                     key:'date',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Services')}/>
        </div>
    )
}
export default Services;
