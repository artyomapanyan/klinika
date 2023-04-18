import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import Resource from "../../../store/Resources";
import ColorSelect from "../../Fragments/ColorSelect";

const resource='Offer'
function Offers() {
    return(
        <div>
            <ResourceTable resource={resource} tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                },
                {
                    title:t('Title'),
                    dataIndex:'title',
                    key:'title',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:['clinic','name'],
                    title:t('Clinic'),
                    key:'clinics',
                    filterDropdown: (props)=><TableFilterElement filterProps={props} resource={'Region'}/>,
                },

                {
                    dataIndex:'price',
                    title:t('Price'),
                    key:'price',
                    render:(e, record)=>{
                        console.log(record)
                        return <div>
                            <div style={{width: 60,position:"absolute", borderBottom: '1px solid #635D6B', height:11}}></div>
                            <div style={{color:'#635D6B'}}>{record?.old_price} <span style={{fontSize:10}}>SAR</span></div>

                            <div style={{fontWeight:700}}>{record?.new_price}<span style={{fontSize:10}}>SAR</span></div>
                        </div>
                    }
                },
                {
                    dataIndex:['status'],
                    title:t('Status'),
                    key:'category',
                    shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
                    render:(e,record)=><ColorSelect items={Resource.Status1} initialValue={e.toString()} record={record} resource={resource} name={'status'}/>
                },

            ]} title={t('Offers')}/>
        </div>
    )
}
export default Offers;
