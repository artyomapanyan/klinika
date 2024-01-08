import React, {useRef} from 'react';
import {Button, Card, List, Modal, Tag} from 'antd';
import plusPurple from "../../../../../dist/icons/plus-purple.svg";
import { useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {postResource} from "../../../../Functions/api_calls";
import AddMedications from "../CardAppointmentItems/AddMedications";
import Preloader from "../../../../Preloader";
import {t} from "i18next";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
function PatientCardMedications({patientId, tab, dataClinic}) {



    const token = useSelector((state) => state.auth.token);
    let language = useSelector((state) => state.app.current_locale)
    let params = useParams()


    const [prescriptions, setPrescriptions] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [addDeleteState, setAddDeleteState] = useState(1)
    const [prescriptionPerPage, setPrescriptionPerPage] = useState(3)
    const [itemsLength, setItemsLength] = useState([])
    const [showAll, setShowAll] = useState(false)
    const showModal = (data) => {
        setIsModalOpen(data??{});
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        setLoading(true)
        postResource('prescriptions','single', token,  '', {
            patient: patientId,
            per_page: showAll ? null : 3
            }
        ).then((response) => {
            setPrescriptions(response?.items)


        })

        postResource('prescriptions','single', token,  '', {
            appointment: params.id,
            //actual: 1,

            }
        ).then((response) => {
            setItemsLength(response?.items)


        }).finally(() => {
            setLoading(false)
        })
    }, [tab, addDeleteState, prescriptionPerPage, showAll])



    return(
        <div className={'current_medications_card'}>
            {
                loading ? <Preloader /> : <Card
                    title={<div className={'cards_title'}>{t('Current medications')}</div>}
                    extra={<Button className={'patient_card_btn'} onClick={showModal}> <img alt={'icons'} src={plusPurple}/><span style={{margin:'0px 8px'}}>{t('Add')}</span></Button>}
                    style={{ padding:'15px 0px'}}
                >
                    <List
                        className="demo-loadmore-list"
                         //loading={initLoading}
                        itemLayout="horizontal"
                        dataSource={prescriptions}
                        style={{overflow: 'auto', height: itemsLength?.length > 3 ? 220 : 250, padding: language === 'ar' ? '0px 0px 0px 25px' : '0px 25px 0px 0px'}}
                        renderItem={(e) => {
                            return<List.Item >
                                <List.Item.Meta
                                    title={<div style={{fontWeight: 700}}>{e?.name}</div>}
                                    description={<div ><span style={{color: '#000000', fontSize: 13}}>{`${e?.frequency} times/day /`}</span><span className={{fontSize: 13}}>{`${e?.dose} pcs `}</span></div>}
                                />
                                <div style={{marginRight: 5}}>{e?.duration} {t('days')}</div>

                            </List.Item>
                        }}
                    />
                    {/*{*/}
                    {/*    dataClinic?.prescriptions?.length <= prescriptionPerPage ? <div style={{borderBottom: '1px solid #e8eaed'}}></div> : <div></div>*/}
                    {/*}*/}

                    <div style={{display: 'flex'}}>
                        {
                            itemsLength?.length > 3 && !showAll ? (
                                <div style={{paddingTop: 10}}>
                                    <Tag onClick={()=>setShowAll(true)} style={{cursor: 'pointer', fontSize:13}}  color="magenta" className={'ant_tag'}>{t('and more')} {itemsLength?.length - 3} {t('items')}</Tag>
                                </div>
                            ) : <div></div>
                        }
                        {
                            itemsLength?.length > 3 && showAll ? (
                                <div style={{paddingTop: 10}}>
                                    <Tag onClick={()=>setShowAll(false)} style={{cursor: 'pointer', fontSize:13}}  color="magenta" className={'ant_tag'}>{t('Show Less')}</Tag>
                                </div>
                            ) : <div></div>
                        }
                    </div>

                </Card>
            }

            <Modal className={'medications_modal'} width={752} title="Add medication" footer={false} open={isModalOpen} onCancel={handleCancel}>
                <AddMedications key={Math.random()} handleCancel={handleCancel} setIsModalOpen={setIsModalOpen} data={isModalOpen} prescriptions={prescriptions} setAddDeleteState={setAddDeleteState}/>
            </Modal>

        </div>
    )
}
export default PatientCardMedications;
