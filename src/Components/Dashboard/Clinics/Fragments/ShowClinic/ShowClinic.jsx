import React, {useEffect} from 'react';
import { Col, Row, Image, Button, Typography, Tabs } from 'antd';
import { PhoneOutlined, MailOutlined, GlobalOutlined, EditOutlined } from '@ant-design/icons';
import ShowClinicAboutTab from './ShowClinicAboutTab';
import ShowClinicHoursTab from './ShowClinicHoursTab';
import { useParams } from 'react-router';
import {postResource, useGetResourceSingle} from '../../../../Functions/api_calls';
import ShowClinicDoctorsTab from './ShowClinicDoctorsTab';
import {useSelector} from "react-redux";

let resource = 'Clinic';
function ShowClinic () {
  const params = useParams ();
  let token = useSelector((state) => state.auth.token);
  const { loadingState, dataState } = useGetResourceSingle ('Clinic', params.id);
  const { name, email, phone_number, website, cover, description, insurance_companies } = dataState?.data;

  useEffect(()=>{
    postResource(resource,'WorkingHours',token,params.id,{}).then(response => {
     console.log(response)
    })


  }, []);


  const tabItems = [
    {
      label: `About Clinic`,
      key: 'about_clinic',
      children: <ShowClinicAboutTab desc={description} companies={insurance_companies}/>,
    },
    {
      label: `Working Hours`,
      key: 'working_hours',
      children: <ShowClinicHoursTab/>,
    },
    {
      label: `Doctors`,
      key: 'doctors',
      children: <ShowClinicDoctorsTab/>,
    },
  ];

  const onChange = (key) => {
    console.log (key);
  };

  return (
    <div className="add_edit_content">
      <Row style={{ marginBottom: '4em' }}>
        <Col style={{ marginRight: '2em' }}>
          <Image
            width={400}
            src={cover?.url}
          />
        </Col>
        <Col>
          <Row>
            <Typography.Title>
              {name}
            </Typography.Title>
          </Row>
          <Row style={{ gap: '.5em' }}>
            <Button
              type="primary"
              size={'large'}
              shape={'circle'}
              icon={<MailOutlined/>}
              href={`mailto:${email}`}
              target="_blank"
            />
            <Button
              type="primary"
              size={'large'}
              shape={'circle'}
              icon={<PhoneOutlined/>}
              href={`tel:${phone_number}`}
              target="_blank"
            />
            <Button
              type="primary"
              size={'large'}
              shape={'circle'}
              icon={<GlobalOutlined/>}
              href={website}
              target="_blank"
            />
          </Row>
        </Col>
        <Col style={{ marginLeft: 'auto' }}>
          <Button
            size={'large'}
            icon={<EditOutlined/>}
          >
            Edit
          </Button>
        </Col>
      </Row>
      <Row>
        <Tabs

          onChange={onChange}
          size={'large'}
          type="card"
          items={tabItems}
        />
      </Row>
    </div>
  );
}
export default ShowClinic;