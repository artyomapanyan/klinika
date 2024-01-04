import {Button, Card, List, Modal, Tag} from "antd";
import plusPurple from "../../../../../dist/icons/plus-purple.svg";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {deleteResource, postResource} from "../../../../Functions/api_calls";
import Preloader from "../../../../Preloader";
import {t} from "i18next";
import closeLightGray from "../../../../../dist/icons/close-lightGray.svg";
import RiskFactorModal from "./RiskFactorModal";

function PatientCardChronicDiseases({patientId, dataClinic}) {
    let language = useSelector((state) => state.app.current_locale)
    const token = useSelector((state) => state.auth.token);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [riskFactors, setRiskFactors] = useState([]);
    const [riskFactorsPerPage, setRiskFactorsPerPage] = useState(3);
    const [addDeleteState, setAddDeleteState] = useState(1)
    const [loading, setLoading] = useState(false)
    const [itemsLength, setItemsLength] = useState([])
    const [showAll, setShowAll] = useState(false)

    const showModal = (data) => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        setLoading(true)
        postResource('ChronicDiseases','single', token,  '', {
                //page: 1,
                patient: patientId,
                per_page: showAll ? null : 3
            }
        ).then((response) => {
            setRiskFactors(response?.items)

        })
        postResource('ChronicDiseases','single', token,  '', {
                patient: patientId,
            }
        ).then((response) => {
            setItemsLength(response?.items)


        }).finally(() => {
            setLoading(false)
        })
    }, [addDeleteState, riskFactorsPerPage, showAll])


    const deleteRickFactor = (e) => {
        setLoading(true)
        deleteResource('ChronicDiseases', e.id, token).then(resp => {
            setAddDeleteState((prevState) => prevState-1)
            setLoading(false)
        })
    }




    return(
        <div className={'current_medications_card'}>
            {
                loading ? <Preloader/> : <Card
                    title={<div className={'cards_title'}>{t('Chronic diseases')}</div>}
                    extra={<Button className={'patient_card_btn'} onClick={showModal}> <img alt={'icons'} src={plusPurple}/><span style={{margin:'0px 8px'}}>{t('Add')}</span></Button>}
                    style={{padding:'15px 0px'}}
                >
                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={riskFactors}
                        style={{overflow: 'auto', height: itemsLength?.length > 3 ? 220 : 250, padding: language === 'ar' ? '0px 0px 0px 25px' : '0px 25px 0px 0px'}}
                        renderItem={(e) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<div style={{fontWeight: 700}}>{t(e?.name)}</div>}
                                    description={<div style={{color: '#000000', fontSize: 13}}>{t(e?.description)}</div>}
                                />
                                <div style={{cursor: 'pointer'}} onClick={()=>deleteRickFactor(e)}><img alt={'icons'} src={closeLightGray}/></div>

                            </List.Item>
                        )}
                    />

                    {/*{*/}
                    {/*    riskFactors?.length <= riskFactorsPerPage ? <div style={{borderBottom: '1px solid #e8eaed'}}></div> : <div></div>*/}
                    {/*}*/}

                    <div style={{display: 'flex'}}>
                        {
                            itemsLength?.length > 3 && !showAll ? (
                                <div style={{paddingTop: 10}}>
                                    <Tag onClick={()=>setShowAll(true)} style={{cursor: 'pointer', fontSize:13}}  color="magenta" className={'ant_tag'}>{t('and more')} {itemsLength?.length - 3} {t('items')}</Tag>
                                </div>
                            ) : null
                        }
                        {
                            itemsLength?.length > 3 && showAll ? (
                                <div style={{paddingTop: 10}}>
                                    <Tag onClick={()=>setShowAll(false)} style={{cursor: 'pointer', fontSize:13}}  color="magenta" className={'ant_tag'}>{t('Show Less')}</Tag>
                                </div>
                            ) : null
                        }
                    </div>

                </Card>
            }

            <Modal className={'medications_modal'} width={475} title={t("Add new: Chronic diseases")} footer={false} open={isModalOpen} onCancel={handleCancel}>
                <RiskFactorModal key={Math.random()}  setIsModalOpen={setIsModalOpen} dataClinic={dataClinic} setAddDeleteState={setAddDeleteState} resource={'ChronicDiseases'} inputTitle={t('Chronic diseases')}/>
            </Modal>
        </div>
    )
}
export default PatientCardChronicDiseases;
