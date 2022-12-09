import React, {useState} from 'react';
import {Button, Card, Form, Input, Tabs} from 'antd';
import "./Country.sass"
import {useGetResourceSingle} from "../../../Functions/api_calls";
import {useParams} from "react-router";

function Country() {
    const params = useParams();

    const  {loadingState,data}= useGetResourceSingle('Country', params.id)


    const onFinish = (values) => {

    }

console.log(data)
    return (
        <div className={"country_content"}>

            <h3>Editing Country - Pakistan</h3>

            <Form
                name="edit"
                onFinish={onFinish}
                initialValues={{
                    name:data?.name,
                    alpha2_code:data?.alpha2_code,
                    alpha3_code:data?.alpha3_code

                }}
            >
               <Tabs type="card">
                   <Tabs.TabPane key={'Arab'}  tab={'Arab'} forceRender={true}>
                       <Card className={"country_card"}
                             title="Name"

                       >
                       <Form.Item label={'Name'} name={'name'}>
                           <Input />
                       </Form.Item>
                       </Card>

                       <Card className={"country_card"}
                             title="Details"
                             bordered={false}
                       >
                           <div  style={{width: "100%", display: "flex"}}>
                               <Form.Item label={'Alpha2 code  *'} name={'alpha2_code'} style={{width: "100%"}}>
                                       <Input />
                               </Form.Item>

                               <Form.Item label={'Alpha3 code  *'} name={'alpha3_code'} style={{width: "100%"}}>
                                       <Input />
                               </Form.Item>
                           </div>
                       </Card>

                   </Tabs.TabPane>


                   <Tabs.TabPane key={'English'} tab={'English'} forceRender={true}>
                       <Card className={"country_card"}
                             title="Name"
                             bordered={false}
                       >
                           <Form.Item label={'Name'} name={'name'}>
                               <Input />
                           </Form.Item>
                       </Card>

                       <Card className={"country_card"}
                             title="Details"
                             bordered={false}
                       >
                           <div style={{width: "100%", display: "flex"}}>
                               <Form.Item label={'Alpha2 code  *'} name={'alpha2_code'}>
                                   <Input />
                               </Form.Item>

                               <Form.Item label={'Alpha2 code  *'} name={'alpha3_code'}>
                                   <Input />
                               </Form.Item>
                           </div>
                       </Card>
                   </Tabs.TabPane>
               </Tabs>

                <Button type={'primary'} htmlType="submit">Save</Button>
                <Button type={'secondary'}>Cancel</Button>

            </Form>
        </div>

    )
}
export default Country;