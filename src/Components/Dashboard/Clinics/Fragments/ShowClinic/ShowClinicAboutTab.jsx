import { Typography } from 'antd';

const ShowClinicAboutTab = ({ desc, companies }) => {
  const { Title, Paragraph, Text } = Typography;

  return (
    <>
      <div className="add_edit_content">
        <Title level={4}>Bio</Title>
        <Paragraph>{desc}</Paragraph>
      </div>
      {/*<div className="add_edit_content">*/}
      {/*  <Title level={4}>Specialties</Title>*/}
      {/*  <Paragraph>*/}

      {/*  </Paragraph>*/}
      {/*</div>*/}
      <div className="add_edit_content">
        <Title level={4}>Insurance Companies</Title>
        <Paragraph>
          {companies?.map((company, i) => {
            return  <Text code key={i}>{company.name}</Text>
          })}
        </Paragraph>
      </div>
    </>
  );
};
export default ShowClinicAboutTab;