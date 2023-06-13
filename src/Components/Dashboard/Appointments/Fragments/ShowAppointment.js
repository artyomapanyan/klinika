import React, {useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {useGetResourceSingle} from "../../../Functions/api_calls";
import {Avatar, Button, message, Space} from "antd";
import {CopyOutlined, FilePdfOutlined, LeftOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";
import axios from "axios";
import api from "../../../../Api";
import Preloader from "../../../Preloader";


const resource = 'Appointment';
function ShowAppointment() {
    const navigate = useNavigate();
    const params = useParams();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [pdfState,setPdfState] = useState(false)

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        navigator.clipboard.writeText(data?.deep_link)
        messageApi.open({
            type: 'success',
            content: 'Successfully Done',
        });
    };


    const handleExportPDF =()=>{
        setPdfState(true)
        axios.request({
            url: api[resource].exportExcel.url,
            method: api[resource].exportExcel.method,
            headers: {
                'Authorization': token,
            },
            responseType: 'blob',

        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', resource+'.pdf');
            document.body.appendChild(link);
            link.click();
            setPdfState(false)
        });
    }

    const onBack = () => {
        navigate(-1)
    }

    return(
        <div style={{marginTop: -120}}>
            <div>
                <Button style={{margin:"40px 24px", height:45, width:45}} onClick={onBack}><LeftOutlined /></Button>
            </div>
            {
                loading ? <Preloader /> : <div>
                    <div className={'add_edit_content'} id={'show_header'}>
                        <Space >
                            <Avatar size={120} src={<img src={data?.logo?.url} />} style={{background:'gray'}}/>
                            <div style={{display:"block", marginLeft:20}}>
                                <div>id {data?.patient?.id}</div>
                                <h2 style={{fontWeight: 600}}>{data?.patient?.first}  {data?.patient?.last}</h2>
                                <div>
                                    <Space>
                                        <div className={'show_mail_btn'}><a href={`mailto:${data?.patient?.email}`}><MailOutlined style={{fontSize: 20, color:'black'}}/></a></div>
                                        <div className={'show_phone_btn'}><a href={`${data?.patient?.phone}`}><PhoneOutlined style={{color: "#ffffff", fontSize: 20}}/></a></div>
                                        <button disabled={pdfState} onClick={handleExportPDF} className={'show_pdf_btn'}><FilePdfOutlined style={{color: "#ffffff"}}/> Appointment report</button>
                                    </Space>
                                </div>
                            </div>

                        </Space>

                        <div>
                            <button onClick={success} className={'show_copy_btn'}><CopyOutlined /> Copy Deep Link</button>
                            {contextHolder}
                        </div>

                    </div>
                    <div className={'add_edit_content'} style={{display:'flex', gap:50}}>
                        <div className={'show_table'}>
                            <table>
                                <tbody >
                                <tr>
                                    <td className={'show_td_1'}>Service Type</td>
                                    <td className={'show_td_2'}>{data?.service_type[0]?.toUpperCase() + data?.service_type?.slice(1)?.replaceAll("_", " ") || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Clinic</td>
                                    <td className={'show_td_2'}>{data?.clinic?.name || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Doctors</td>
                                    <td className={'show_td_2'}>{ data?.doctor?.first ? `${data?.doctor?.first} ${data?.doctor?.last}` : <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Insurance Company</td>
                                    <td className={'show_td_2'}>{data?.insurance_company || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Booking Date</td>
                                    <td className={'show_td_2'}>{data?.booked_at?.iso_string || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Appointment’s Status</td>
                                    <td className={'show_td_2'}>{data?.status || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Marked as completed in</td>
                                    <td className={'show_td_2'}>{data?.completed_at?.iso_string || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Offer</td>
                                    <td className={'show_td_2'}>{data?.offer?.title || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
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
                                        <td>{data?.purpose || <span style={{fontStyle: 'italic'}}>N/A</span>}</td>
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
                                    <td>{data?.personal_info || <span style={{fontStyle: 'italic'}}>N/A</span>}</td>
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
                                    <td>{data?.doctor_notes || <span style={{fontStyle: 'italic'}}>N/A</span>}</td>
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
                                    <td>{data?.prescriptions || <span style={{fontStyle: 'italic'}}>N/A</span>}</td>
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
                                    <td>{data?.follow_up_history || <span style={{fontStyle: 'italic'}}>N/A</span>}</td>
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
                                        <td><span style={{color:"#F5A348"}}>Images</span> {data?.images} </td>
                                    </tr>
                                    <tr>
                                        <td><span style={{color:"#F5A348"}}>Files</span> {data?.files}</td>
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
export default ShowAppointment;