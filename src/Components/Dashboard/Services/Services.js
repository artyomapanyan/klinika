import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";

function Services() {
    return (
        <div>
            <ResourceTable resource={'Service'} tableColumns={[
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
                    dataIndex:'date',
                    title:t('Create date'),
                    key:'date',
                },
            ]} title={t('Service')}/>
        </div>
    )
}
export default Services;