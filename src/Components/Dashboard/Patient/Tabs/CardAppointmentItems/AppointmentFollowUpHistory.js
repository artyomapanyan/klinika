import {Button, Card, List} from "antd";
import plusPurple from "../../../../../dist/icons/plus-purple.svg";
import {t} from "i18next";
import React from "react";

function AppointmentFollowUpHistory() {

    const history = [
        {
            name: 'aaaaa',
            id: 1,
            rec: 'dddd'
        },
        {
            name: 'ssss',
            id: 2,
            rec: 'ddsssdd'
        },
        {
            name: 'aaaaadfaaa',
            id: 3,
            rec: 'ddfsdfdd'
        },
    ]


    return(
        <div className={'current_medications_card'}>
            <Card
                title={t("Follow up history")}
                extra={<Button className={'patient_card_btn'}> <img alt={'icons'} src={plusPurple}/><span style={{marginLeft:10}}>{t('Add')}</span></Button>}
                style={{padding:20}}
            >
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={history}
                    renderItem={(e) => (
                        <List.Item>
                            <List.Item.Meta
                                title={e?.name}
                                description={<div><span style={{color: '#000000'}}>times/day /</span>e?.dose pcs </div>}
                            />
                            <div>xddfgdfgdfgdfgdfg</div>

                        </List.Item>
                    )}
                />

            </Card>
        </div>
    )
}
export default AppointmentFollowUpHistory;
