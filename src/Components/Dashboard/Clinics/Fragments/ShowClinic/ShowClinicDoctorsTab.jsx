import { Avatar, Card, Typography } from 'antd';

const ShowClinicDoctorsTab = ({ desc, companies }) => {
  const { Paragraph, Text } = Typography;
  const doctor = {
    name: 'Lorem Ipsum',
    image: 'https://randomuser.me/api/portraits/men/31.jpg',
    doctorSpecialities: [
      'Psychiatry',
      'Neurosurgery',
      'Vascular Surgery',
    ],
  };
  return (
    <div className="add_edit_content">
      <Card style={{ width: '100%', marginTop: 16 }}>
        <Card.Meta
          avatar={<Avatar src={doctor.image}/>}
          title={doctor.name}
          description={
            <Paragraph>
              {doctor?.doctorSpecialities?.map ((speciality, i) => {
                return <Text code key={i}>{speciality}</Text>;
              })}
            </Paragraph>
          }
        />
      </Card>
    </div>
  );
};
export default ShowClinicDoctorsTab;