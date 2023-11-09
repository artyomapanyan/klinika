import React, { useRef} from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import {useSelector} from "react-redux";
import './Offers.sass'

import ColorSelect from "../../Fragments/ColorSelect";
import Resource from "../../../store/Resources";
import PermCheck from "../../Fragments/PermCheck";

const resource='Offer'

function Offers() {
    let reduxInfo = useSelector((state) => state?.auth);


    return(
        <div>
            <ResourceTable resource={resource}
                           // except={{
                           //     delete: reduxInfo?.selected_role?.key === 'doctor' ? true : false,
                           //     edit: reduxInfo?.selected_role?.key === 'doctor' ? true : false
                           // }}

                           except={{
                               delete: PermCheck(`Offer:delete`) ? false : true,
                               edit: PermCheck(`Offer:update`) ? false : true
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
                                           <div style={{color:'#635D6B'}}>{record?.old_price} <span style={{fontSize:10}}>{t('SAR')}</span></div>

                                           <div style={{fontWeight:700}}>{record?.new_price}<span style={{fontSize:10}}>{t('SAR')}</span></div>
                                       </div>
                                   }
                               },
                               {
                                   dataIndex:['status'],
                                   title:t('Status'),
                                   key:'category',
                                   shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
                                   render:(e,record)=><ColorSelect colorSelectDisabled={true} items={Resource.Status1} initialValue={e.toString()} record={record} resource={resource} name={'status'}/>
                               },

                           ]} title={t('Offers')}/>
        </div>
    )
}
export default Offers;




// function Offers() {
//     let reduxInfo = useSelector((state) => state?.auth);
//     let tableRef = useRef()
//
//
//     return(
//         <div className={'offers_big_div'} ref={tableRef}>
//             <ResourceTable resource={resource}
//                            except={{
//                                delete: reduxInfo?.selected_role?.key === 'doctor' ? true : false,
//                                edit: reduxInfo?.selected_role?.key === 'doctor' ? true : false
//                            }}
//
//
//                            tableColumns={[
//                 {
//                     title:('Title'),
//                     dataIndex:'title',
//                     key:'title',
//
//                     filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
//                     render:(e, record) => {
//                         return <div>
//                             <div className={'offers_table_bold_text'}>{record?.title}</div>
//                             <div style={{display: 'flex'}}>
//                                 {/*<div className={'services_count'}>{record?.sub_services?.length}</div>*/}
//                                 <div className={'offers_table_light_text'}>{record?.service?.name}</div>
//                             </div>
//
//                         </div>
//                     }
//                 },
//                 // {
//                 //     dataIndex:['clinic','name'],
//                 //     title:t('Clinic'),
//                 //     key:'clinic_name',
//                 //     sorter: true,
//                 //     sortIcon: (sortOrder)=> {
//                 //         return <img alt={'new_sorter_icon'} src={new_sorter_icon}/>
//                 //     },
//                 //     filterDropdown: (props)=><TableFilterElement filterProps={props} />,
//                 // },
//
//                 {
//                     dataIndex:'price',
//                     title:t('Price / Discount'),
//                     key:'price',
//                     // sorter: true,
//                     // sortIcon: (sortOrder)=> {
//                     //     return <img alt={'new_sorter_icon'} src={new_sorter_icon}/>
//                     // },
//                     render:(e, record)=>{
//                         return <div>
//                             <div style={{fontWeight:700}}>{record?.new_price}<span style={{fontSize:14}}> SR</span></div>
//                             <div style={{fontSize: 12, color: '#423E47'}}>
//                                 <span style={{textDecoration: 'line-through', fontSize: 12, color: '#423E47'}}>{record?.old_price}</span> / {record?.old_price - record?.new_price}
//                                 <span style={{fontSize:12, color: '#423E47'}}> SR</span>
//                                 <span style={{fontSize:12, color: '#423E47'}}> ({(100-(100*record?.new_price/record?.old_price)).toFixed(1)}%)</span>
//                             </div>
//
//
//                         </div>
//                     }
//                 },
//                 {
//                     dataIndex:'date',
//                     title:t('Dates'),
//                     key:'date',
//                     // sorter: true,
//                     // sortIcon: (sortOrder)=> {
//                     //     return <img alt={'new_sorter_icon'} src={new_sorter_icon}/>
//                     // },
//                     render:(e,record)=>{
//                         return <div>
//                             <div className={'offers_table_bold_text'}>{dayjs(record?.begins_at?.iso_string).format('DD.MM.YYYY')} - {dayjs(record?.expired_at?.iso_string).format('DD.MM.YYYY')}</div>
//                             <div></div>
//                         </div>
//                     }
//                 },
//                 {
//                     dataIndex:'status_text',
//                     title:t('Status'),
//                     key:'status_text',
//
//                     render:(e,record)=> {
//                         return <div>
//                             <div style={{color: record?.status_text?.status === 'Active' ? '#4FB873' : '#A6A7BA', fontWeight: 700}}>{record?.status_text?.status}</div>
//                             <div style={{color: record?.status_text?.confirmation === 'Approved' ? '#4FB873' : record?.status_text?.confirmation === 'Rejected' ? '#E52E65' : record?.status_text?.confirmation === 'on moderation' ? '#F3A148' : '#A6A7BA', fontWeight: 700}}>{record?.status_text?.confirmation}</div>
//                         </div>
//                     }
//                 },
//                 {
//                     dataIndex: 'status',
//                     title: ' ',
//                     key: 'status',
//                     shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
//                     render: (e,record) =><SwitchStatus switchDisabled={record?.approved_at && !record?.rejected_at ? false : true} record={record} resource={resource} name={'status'}/>
//                 },
//
//                 // {
//                 //     dataIndex:['status'],
//                 //     title:t('Status'),
//                 //     key:'status',
//                 //     shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
//                 //     render:(e,record)=><ColorSelect colorSelectDisabled={true} items={Resource.Status1} initialValue={e.toString()} record={record} resource={resource} name={'status'}/>
//                 // },
//
//             ]} title={t('Offers')}/>
//         </div>
//     )
// }
// export default Offers;
