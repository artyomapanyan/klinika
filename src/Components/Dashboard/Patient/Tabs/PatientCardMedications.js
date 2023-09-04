import {Input, Row} from "antd";
import MedicationCards from "./MedicationCards/MedicationCard";
import React, {useEffect, useState} from "react";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import Preloader from "../../../Preloader";
import dayjs from "dayjs";
import search_icon_black from "../../../../dist/icons/search_icon_black.png";
import {t} from "i18next";

function PatientCardMedications({tab}) {
    const token = useSelector((state) => state.auth.token);
    let params = useParams()

    const [prescriptions, setPrescriptions] = useState([])
    const [searchPrescriptions, setSearchPrescriptions] = useState('')
    const [searchLoading, setSearchLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [addDeleteState, setAddDeleteState] = useState(1)
    const [search,setSearch] = useState('');

    useEffect(() => {
        setLoading(true)
        postResource('prescriptions','single', token,  '', {
                appointment: params.id
            }
        ).then((response) => {
            setPrescriptions(response?.items)
            setLoading(false)

        })
    }, [tab, addDeleteState])

    const onSearch = (e) => {
        // setSearchLoading(true)
        // postResource('prescriptions','single', token,  '', {
        //         appointment: params.id,
        //         name: search
        //     }
        // ).then((response) => {
        //     setSearchPrescriptions(response?.items)
        //     setSearchLoading(false)
        //
        // })

    }

    const onChange = (e) => {
        setSearchPrescriptions(e.target.value)
    }



    //.filter((e) => e?.name?.toLowerCase().includes(search?.toLowerCase()))
console.log(prescriptions)
    return(
        <div style={{padding:40}}>
            {
                loading ? <Preloader /> : <div>
            <div className={'medications_big_text'}>{t('Active Medication')}</div>

            <Row gutter={[16]} >
                {

                    prescriptions.filter((el) => {
                       return dayjs(el?.end_date?.iso_string) <= dayjs()
                    }).map((el) => {
                            return <MedicationCards key={el?.id} el={el} setPrescriptions={setPrescriptions}
                                                    setLoading={setLoading} setAddDeleteState={setAddDeleteState}/>

                    })
                }

            </Row>
            <div className={'finished_header'}>
                <div className={'medications_big_text'}>{t('Finished')}</div>
                <div><Input onChange={(e)=>onChange(e)} style={{width: 320, height: 48, borderRadius: 12}} placeholder={'Search by name'} suffix={<img   style={{cursor: 'pointer'}} alt={'search_icon_black'} src={search_icon_black}/>}/></div>
            </div>


             {
                 searchLoading ? <Preloader /> : <Row gutter={[30]}>

                     {

                         prescriptions.filter((el) => {
                             return dayjs(el?.end_date?.iso_string) > dayjs()
                         }).map((el) => {
                             return <MedicationCards key={el?.id} el={el} setPrescriptions={setPrescriptions}
                                                     setLoading={setLoading} setAddDeleteState={setAddDeleteState}/>

                         })
                     }

                 </Row>
             }

             </div>
                }
        </div>
    )
}
export default PatientCardMedications;
