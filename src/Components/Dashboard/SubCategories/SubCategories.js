import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import DateParser from "../../Fragments/DateParser";

function SubCategories() {
    return(
        <div>
            <ResourceTable resource={'SubCategory'} tableColumns={[
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
                    dataIndex:['category','name'],
                    title:t('category'),
                    key:'category',
                    translatable:true,
                },
                {
                    dataIndex:['created_at','iso_string'],
                    title:t('Create date'),
                     key:'date',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Sub Categories')}/>
        </div>
    )
}
export default SubCategories;
