import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Space } from 'antd'
import { t } from 'i18next'
import off_image_1 from "../../../../dist/Img/off_image_1.jpg";

function AppDoctor({ setDataState, dataState, data }) {
	//const [doctorName, setDoctorName] = useState('')
	const onDoctor = id => {
		setDataState(prevState => ({
			...prevState,
			doctor_id: id
		}))
	}
	const onChangeDoctor = () => {
		setDataState(prevState => ({}))
		window.location.reload()
	}

	const doctorName = data?.doctors?.find(el => {
		if (el?.id === dataState?.doctor_id) {
			return el?.first
		}
	})

	return (
		<div>

			{dataState?.doctor_id ? (
				<div className={'doctor_selected'}>
					<Space>
						<Avatar
							size={40}
							icon={<UserOutlined />}
							className={'doctor_avatar'}
						/>
						<div className={'doctor_name_selected'}>
							{doctorName?.first}
							{doctorName?.last}
						</div>
					</Space>
				</div>
			) : (
				<div>

						{data?.doctors?.map(el => {
							return (
								<div className={'doctor_container'} key={el?.id} onClick={() => onDoctor(el?.id)}>
									<div >
										<Space>
											<Avatar
												size={40}
												icon={el?.avatar ? <img src={el?.avatar?.url} alt={'image'} /> : <UserOutlined />}
												className={'doctor_avatar'}
											/>
											<div className={'doctor_name'}>
												{el?.first} {el?.last}
											</div>
										</Space>
									</div>
								</div>
							)
						})}

				</div>
			)}
		</div>
	)
}
export default AppDoctor
