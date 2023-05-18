import React, {useEffect, useMemo, useState} from "react";
import "./ClinicManagerCalendar.scss";
import {Button, Input, Spin} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import ClinicManagerCalendarHead from "./Fragments/ClinicManagerCalendarHead";
import ClicicManagerCalendarCollapse from "./Fragments/ClicicManagerCalendarCollapse";
import dayjs from "dayjs";
import {postResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import Resources from "../../../../../store/Resources";

function ClinicManagerCalendar() {
    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState([dayjs().startOf('week'), dayjs().endOf('week')])
    const [data, setData] = useState({workload: []});
    const [showCount,setShowCount] = useState(10);
    const [search,setSearch] = useState('');


    let token = useSelector((state) => state.auth.token);
    useEffect(() => {
        setLoading(true)
        postResource('ClinicManager', 'DoctorWorkload', token, '', {
            from: date[0].format('YYYY-MM-DD'),
            to: date[1].format('YYYY-MM-DD')
        }).then((response) => {
            setData({
                clinic_id:response.clinic.id,
                clinic:response.clinic,
                workload:Object.values(response.workload)
            })
            setLoading(false)

        })

    }, [date])


    const filteredData = useMemo(()=>{
        return [...data.workload].map(e=>{
            if(!search?.length){
                return e
            }
            if(!e.speciality){
                return null
            }
            let speciality = [e.speciality].filter(doc=>{
                return doc.toLowerCase().includes(search.toLowerCase())
            })
            if(speciality.length===0){
                return null
            }
            return {
                ...e,
                speciality:speciality
            }
        }).filter(e=>e)

    },[search,data])

    return (
        <section className={'table_conteiner'}>
            <Spin spinning={loading}>
                <ClinicManagerCalendarHead date={date} setDate={setDate}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="d-flex justify-content-center w-100">
                            <div className="col-12 card mb-4 cardStyle">
                                <div className="card-body">
                                    <div className="scrollXHide">
                                        <table className="w-100" style={{marginTop: -10}}>
                                            <tbody>
                                                <tr className="d-flex align-items-center justify-content-between w-100">
                                                    <td>
                                                        <div className="input-group md-form form-sm pl-0 mr-3 searchInput">
                                                            <Input className={'search_input_clinic_man'}
                                                                   onChange={(e)=>setSearch(e.target.value)}
                                                                   value={search}
                                                                   aria-label="Search" prefix={<SearchOutlined size={30}/>}/>
                                                        </div>
                                                    </td>
                                                    {[...Array(7).keys()].map((e, key) => {
                                                        return <td key={e} className="appointmentsDate" style={{height: 48}}>
                                                            <div className="appointmentsDate__content" style={{height: 48, paddingTop: 14}}>
                                                                <span className="appointmentsDate__content__text">{date[0].add(e, 'days').format('DD')}</span>
                                                                <span style={{marginLeft: 5, fontSize: 18}} className="ppointmentsDate__content__text appointmentsDate__content__text--light">{Resources.Days[e]}</span>
                                                            </div>
                                                        </td>
                                                    })}
                                                </tr>
                                            </tbody>

                                            {filteredData?.slice(0,showCount)?.map((item, key) => <ClicicManagerCalendarCollapse key={key} setDate={setDate} clinic={data.clinic} clinicID={data.clinic_id} item={item}/>)}
                                        </table>
                                        {filteredData.length>showCount?<Button type={'primary'} onClick={()=>setShowCount((prevState)=>prevState+10)}>Load More</Button>:null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </section>


    )
}

export default ClinicManagerCalendar;