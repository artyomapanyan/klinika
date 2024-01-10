import {Input, Row} from "antd";
import MedicationCards from "./MedicationCards/MedicationCard";
import React, {useEffect, useState} from "react";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import Preloader from "../../../Preloader";
import search_icon_black from "../../../../dist/icons/search_icon_black.png";
import {t} from "i18next";

function PatientCardMedications({tab}) {
    const token = useSelector((state) => state.auth.token);
    let params = useParams()

    const [acualPrescriptions, setActualPrescriptions] = useState([])
    const [notActualPrescriptions, setNotActualPrescriptions] = useState([])
    const [searchPrescriptions, setSearchPrescriptions] = useState('')
    const [searchLoading, setSearchLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [addDeleteState, setAddDeleteState] = useState(1)


    useEffect(() => {
        setLoading(true)
        postResource('prescriptions','single', token,  '', {
            actual: 1,

            }
        ).then((response) => {
            setActualPrescriptions(response?.items)
            setLoading(false)

        })
    }, [tab, addDeleteState])

    useEffect(() => {
        setLoading(true)
        postResource('prescriptions','single', token,  '', {
                not_actual: 1,

            }
        ).then((response) => {
            setNotActualPrescriptions(response?.items)
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





    return(
        <div style={{padding:40}}>
            {
                loading ? <Preloader /> : <div>
            <div className={'medications_big_text'}>{t('Active Medication')}</div>

            <Row gutter={[16]} >
                {

                    acualPrescriptions?.map((el) => {
                            return <MedicationCards key={el?.id} el={el} setPrescriptions={setActualPrescriptions}
                                                    setLoading={setLoading} setAddDeleteState={setAddDeleteState} add_update_btns={false}/>

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

                         notActualPrescriptions?.filter((el) => el?.name?.toLowerCase().includes(searchPrescriptions?.toLowerCase()))?.map((el) => {
                             return <MedicationCards key={el?.id} el={el} setPrescriptions={setNotActualPrescriptions}
                                                     setLoading={setLoading} setAddDeleteState={setAddDeleteState} add_update_btns={false}/>

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
