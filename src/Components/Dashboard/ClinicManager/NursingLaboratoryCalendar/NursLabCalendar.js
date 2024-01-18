import React, {useEffect, useMemo, useState} from "react";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {postResource} from "../../../Functions/api_calls";
import {Button, Input, Spin} from "antd";
import ClinicManagerCalendarHead from "../Fragments/ClinicManagerCalendar/Fragments/ClinicManagerCalendarHead";
import search_icon_black from "../../../../dist/icons/search_icon_black.png";
import Resources from "../../../../store/Resources";
import ClinicManagerCalendarCollapse from "../Fragments/ClinicManagerCalendar/Fragments/ClicicManagerCalendarCollapse";
import {t} from "i18next";
import NursLabCalendarCollapse from "./NursLabCalendarCollapse";

function NursLabCalendar() {
    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState([dayjs(), dayjs().add(6, 'day')])
    const [data, setData] = useState({workload: []});
    const [showCount,setShowCount] = useState(10);
    const [search,setSearch] = useState('');
    const [update,setUpdate] = useState(0);



    let token = useSelector((state) => state.auth.token);
    useEffect(() => {
        setLoading(true)
        postResource('ClinicManager', 'ClinicWorkload', token, '', {
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

    }, [date, update])



    const filteredData = useMemo(()=>{
        return [...data.workload].map(e=>{
            if(!search?.length){
                return e
            }
            if(!e.service){
                return null
            }
            let service = [e.service].filter(doc=>{
                return doc.toLowerCase().includes(search.toLowerCase())
            })
            if(service.length===0){
                return null
            }
            return {
                ...e,
                service:service
            }
        }).filter(e=>e)

    },[search,data])



    return (
        <section className={'table_conteiner'}>
            <Spin spinning={loading}>
                <ClinicManagerCalendarHead date={date} setDate={setDate} calendarTitle={false}/>
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
                                                    <div className="input-group md-form form-sm pl-0 mr-3 searchInput" >
                                                        <Input className={'search_input_clinic_man'}
                                                               onChange={(e)=>setSearch(e.target.value)}
                                                               value={search}
                                                               aria-label="Search" prefix={<img src={search_icon_black} alt={'search_icon_black'} />}/>
                                                    </div>
                                                </td>
                                                {[...Array(7).keys()].map((e,k) => {
                                                    return <td key={e} className="appointmentsDate" style={{height: 48, paddingLeft: k === 0 ? 20 : 0}}>
                                                        <div className="appointmentsDate__content" style={{height: 48, paddingTop: 14}}>
                                                            <span className="appointmentsDate__content__text">{date[0].add(e, 'days').format('DD')}</span>
                                                            <span style={{marginLeft: 5, fontSize: 18}} className="ppointmentsDate__content__text appointmentsDate__content__text--light">{date[0].add(e, 'days').format('ddd')}</span>
                                                        </div>
                                                    </td>
                                                })}
                                            </tr>
                                            </tbody>

                                            {filteredData?.slice(0,showCount)?.map((item, key) => <NursLabCalendarCollapse setUpdate={setUpdate} key={key} setDate={setDate} clinic={data.clinic} clinicID={data.clinic_id} item={item}/>)}
                                        </table>
                                        <div style={{padding: 10, display: 'flex', gap: 10}}>
                                            {filteredData.length>showCount?<Button type={'primary'} onClick={()=>setShowCount((prevState)=>prevState+10)}>{t('Show More')}</Button>:null}
                                            {showCount>10?<Button type={'primary'} onClick={()=>setShowCount((prevState)=>prevState-10)}>{t('Show Less')}</Button>:null}
                                        </div>


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

export default NursLabCalendar;