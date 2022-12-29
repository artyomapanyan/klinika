import {Button, Card, List} from "antd";
import plusPurple from "../../../../../dist/icons/plus-purple.svg";

function AppointmentFollowUpHistory() {

    return(
        <div className={'current_medications_card'}>
            <Card
                title="Follow up history"
                extra={<Button className={'patient_card_btn'}> <img alt={'icons'} src={plusPurple}/><span style={{marginLeft:10}}>Add</span></Button>}
                style={{padding:20}}
            >
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    renderItem={(aaa) => (
                        <List.Item>
                            <List.Item.Meta
                                title={'Lipanthyl 145 mg '}
                                description="4 times/day / by time"
                            />
                            <div>x</div>

                        </List.Item>
                    )}
                />

            </Card>
        </div>
    )
}
export default AppointmentFollowUpHistory;