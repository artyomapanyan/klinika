import {Button, Card, List, Modal, Tag} from "antd";
import plusPurple from "../../../../../dist/icons/plus-purple.svg";
import {t} from "i18next";

import React, {useEffect, useState} from "react";
import {deleteResource, postResource} from "../../../../Functions/api_calls";
import RiskFactorModal from "./RiskFactorModal";
import {useSelector} from "react-redux";
import closeLightGray from "../../../../../dist/icons/close-lightGray.svg";
import Preloader from "../../../../Preloader";

function PatientCardRiskFactors({patientId, dataClinic, tab}) {
    let language = useSelector((state) => state.app.current_locale)
    const token = useSelector((state) => state.auth.token);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [riskFactors, setRiskFactors] = useState([]);
    const [riskFactorsPerPage, setRiskFactorsPerPage] = useState(3);
    const [addDeleteState, setAddDeleteState] = useState(1)
    const [loading, setLoading] = useState(false)
    const [itemsLength, setItemsLength] = useState([])

    const showModal = (data) => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        setLoading(true)
        postResource('RiskFactors','single', token,  '', {
            //page: 1,
            patient: patientId,
            per_page: riskFactorsPerPage
            }
        ).then((response) => {
            setRiskFactors(response?.items)
            setLoading(false)

        })
        postResource('RiskFactors','single', token,  '', {
                patient: patientId,

            }
        ).then((response) => {
            setItemsLength(response?.items)
            setLoading(false)

        })
    }, [addDeleteState, riskFactorsPerPage])


    const deleteRickFactor = (e) => {
        setLoading(true)
        deleteResource('RiskFactors', e.id, token).then(resp => {
            setAddDeleteState((prevState) => prevState-1)
            setLoading(false)
        })
    }

    const onLoadMore = () => {
        setRiskFactorsPerPage(riskFactorsPerPage + 3)
    }


    return(
        <div className={'current_medications_card'}>
            {
                loading ? <Preloader/> : <Card
                    title={<div className={'cards_title'}>{t('Risk factors')}</div>}
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
                            itemsLength?.length > riskFactorsPerPage ? (
                                <div style={{paddingTop: 10}}>
                                    <Tag onClick={onLoadMore} style={{cursor: 'pointer', fontSize:13}}  color="magenta" className={'ant_tag'}>{('Show More')}</Tag>
                                </div>
                            ) : null
                        }
                        {
                            riskFactorsPerPage > 3 ? (
                                <div style={{paddingTop: 10}}>
                                    <Tag onClick={()=>setRiskFactorsPerPage(riskFactorsPerPage - 3)} style={{cursor: 'pointer', fontSize:13}}  color="magenta" className={'ant_tag'}>{t('Show Less')}</Tag>
                                </div>
                            ) : null
                        }
                    </div>

                </Card>
            }

            <Modal className={'medications_modal'} width={475} title={t("Add new: Risk factors")} footer={false} open={isModalOpen} onCancel={handleCancel}>
                <RiskFactorModal key={Math.random()}  setIsModalOpen={setIsModalOpen} dataClinic={dataClinic} setAddDeleteState={setAddDeleteState} resource={'RiskFactors'} inputTitle={t('Risk factors')}/>
            </Modal>
        </div>
    )
}
export default PatientCardRiskFactors;
