import React from 'react';
import {Avatar, Button, message, Space} from "antd";
import {CopyOutlined, FilePdfOutlined, LeftOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";
import Preloader from "../../../Preloader";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {useGetResourceSingle} from "../../../Functions/api_calls";
import axios from "axios";
import api from "../../../../Api";


const resource = 'InvoiceItem';
function ShowInvoiceItems() {
    const navigate = useNavigate();
    const params = useParams();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState

    const [messageApi, contextHolder] = message.useMessage();
    // const success = () => {
    //     navigator.clipboard.writeText(data?.deep_link)
    //     messageApi.open({
    //         type: 'success',
    //         content: 'Successfully Done',
    //     });
    // };


    // const handleExportPDF =()=>{
    //     axios.request({
    //         url: api[resource].exportExcel.url,
    //         method: api[resource].exportExcel.method,
    //         headers: {
    //             'Authorization': token,
    //         },
    //         responseType: 'blob',
    //
    //     }).then((response) => {
    //         const url = window.URL.createObjectURL(new Blob([response]));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', resource+'.pdf');
    //         document.body.appendChild(link);
    //         link.click();
    //     });
    // }

    const onBack = () => {
        navigate(-1)
    }

    console.log(data)

    return(
        <div style={{marginTop: -120}}>
            <div>
                <Button style={{margin:"40px 24px", height:45, width:45}} onClick={onBack}><LeftOutlined /></Button>
            </div>
            {
                loading ? <Preloader /> : <div>
                    <div className={'add_edit_content'} id={'show_header'}>
                        <Space >
                            {/*<Avatar size={120} src={<img src={data?.logo?.url} />} style={{background:'gray'}}/>*/}
                            <div style={{display:"block", marginLeft:20}}>
                                <div>id </div>
                                <h2 style={{fontWeight: 600}}></h2>
                                <div>
                                    <Space>
                                        <div className={'show_mail_btn'}><a><MailOutlined style={{fontSize: 20, color:'black'}}/></a></div>
                                        <div className={'show_phone_btn'}><a ><PhoneOutlined style={{color: "#ffffff", fontSize: 20}}/></a></div>
                                        <button  className={'show_pdf_btn'}><FilePdfOutlined style={{color: "#ffffff"}}/> Appointment report</button>
                                    </Space>
                                </div>
                            </div>

                        </Space>

                        <div>
                            <button  className={'show_copy_btn'}><CopyOutlined /> Copy Deep Link</button>
                            {contextHolder}
                        </div>

                    </div>
                    <div className={'add_edit_content'} style={{display:'flex', gap:50}}>
                        <div className={'show_table'}>
                            <table>
                                <tbody >
                                <tr>
                                    <td className={'show_td_1'}>Service Type</td>
                                    <td className={'show_td_2'}><span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span></td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Clinic</td>
                                    <td className={'show_td_2'}><span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span></td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Doctors</td>
                                    <td className={'show_td_2'}><span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span></td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Insurance Company</td>
                                    <td className={'show_td_2'}><span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span></td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Booking Date</td>
                                    <td className={'show_td_2'}><span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span></td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Appointment’s Status</td>
                                    <td className={'show_td_2'}>N/A</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Marked as completed in</td>
                                    <td className={'show_td_2'}><span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span></td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Offer</td>
                                    <td className={'show_td_2'}><span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={'show_table_right'} style={{width:'50%'}}>
                            <table>
                                <thead>
                                <tr>
                                    <td>Invoices</td>
                                    <td>Date</td>
                                    <td>Total Price</td>
                                    <td>Print</td>
                                </tr>

                                </thead>
                                <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    {/*<td><Button size={'small'} style={{background:'red'}}><FilePdfOutlined style={{color: "#ffffff"}}/></Button></td>*/}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={'add_edit_content'}>
                        <div className={'show_table_bottom'}>
                            <table>
                                <thead>
                                <tr>
                                    <td>Purpose</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><span style={{fontStyle: 'italic'}}>N/A</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={'show_table_bottom'}>
                            <table>
                                <thead>
                                <tr>
                                    <td>Personal info</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><span style={{fontStyle: 'italic'}}>N/A</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={'show_table_bottom'}>
                            <table>
                                <thead>
                                <tr>
                                    <td>Doctor notes</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><span style={{fontStyle: 'italic'}}>N/A</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={'show_table_bottom'}>
                            <table>
                                <thead>
                                <tr>
                                    <td>Prescriptions</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><span style={{fontStyle: 'italic'}}>N/A</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={'show_table_bottom'}>
                            <table>
                                <thead>
                                <tr>
                                    <td>Follow up history</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><span style={{fontStyle: 'italic'}}>N/A</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={'add_edit_content'}>
                        <div className={'show_table_bottom'}>
                            <table>
                                <thead>
                                <tr>
                                    <td>Appointment Documents (Attachments)</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><span style={{color:"#F5A348"}}>Images</span> </td>
                                </tr>
                                <tr>
                                    <td><span style={{color:"#F5A348"}}>Files</span> </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default ShowInvoiceItems;