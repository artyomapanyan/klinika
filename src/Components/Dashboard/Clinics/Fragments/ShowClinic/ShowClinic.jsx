import React, {useEffect, useState} from 'react';
import { Col, Row, Image, Button, Typography, Tabs } from 'antd';
import {PhoneOutlined, MailOutlined, GlobalOutlined, EditOutlined, LeftOutlined} from '@ant-design/icons';
import ShowClinicAboutTab from './ShowClinicAboutTab';
import ShowClinicHoursTab from './ShowClinicHoursTab';
import {useNavigate, useParams} from 'react-router';
import {postResource, useGetResourceSingle} from '../../../../Functions/api_calls';
import ShowClinicDoctorsTab from './ShowClinicDoctorsTab';
import {useSelector} from "react-redux";
import ResourceLinks from "../../../../ResourceLinks";
import Preloader from "../../../../Preloader";

let resource = 'Clinic';
function ShowClinic () {
  const params = useParams ();
  let token = useSelector((state) => state.auth.token);
  let navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const { loadingState, dataState } = useGetResourceSingle ('Clinic', params.id);
  const { name, email, phone_number, website, cover, description, insurance_companies } = dataState?.data;

  useEffect(()=>{
    setLoading(true)
    postResource(resource,'WorkingHours',token,params.id,{}).then(response => {
      setLoading(false)
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

  const onEdit = () => {
    navigate(ResourceLinks[resource]+params.id)
  }

  const onBack = () => {
    navigate(-1)
  }

  return (
      <div style={{marginTop: -120}}>
        <div>
          <Button style={{margin:"40px 24px", height:45, width:45}} onClick={onBack}><LeftOutlined /></Button>
        </div>

        {
          loading ? <Preloader/> : <div className="add_edit_content">
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
                    onClick={onEdit}
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
        }

      </div>

  );
}
export default ShowClinic;