import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import Resource from "../../../store/Resources";
import ColorSelect from "../../Fragments/ColorSelect";
import {useSelector} from "react-redux";

const resource='Offer'
function Offers() {
    let reduxInfo = useSelector((state) => state?.auth);


    return(
        <div>
            <ResourceTable resource={resource}
                           except={{
                               delete: reduxInfo?.selected_role?.key === 'doctor' ? true : false,
                               edit: reduxInfo?.selected_role?.key === 'doctor' ? true : false
                           }}


                           tableColumns={[
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
                    key:'clinic_name',
                    filterDropdown: (props)=><TableFilterElement filterProps={props} />,
                },

                {
                    dataIndex:'price',
                    title:t('Price'),
                    key:'price',
                    render:(e, record)=>{
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
