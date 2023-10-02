import React, { useEffect, useState } from 'react'
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import Slider from 'react-slick'
import { useSelector } from 'react-redux'
import { postResource } from '../../../Functions/api_calls'
import { t } from 'i18next'
import Loader from '../../../Loader'



function AppTime({ setDataState, dataState, data, setDataTimes }) {
	let token = useSelector(state => state.auth.token)

	const [times, setTimes] = useState([])
	const [timesLoading, setTimesLoading] = useState(false)

	useEffect(() => {
		if (dataState?.doctor_id && dataState?.date) {
			setTimesLoading(true)
			postResource(
				'PublicClinicDoctorAvailableTimes',
				'single',
				token,
				dataState?.doctor_id + '/' + data?.clinic?.id,
				{ service: 'clinic_visit', date: dataState?.date }
			).then(response => {
				console.log('times',response)
				setTimes(response[0])
				setTimesLoading(false)
			})
		}
	}, [dataState?.date])

	const onTime = time => {
		setDataState(prevState => ({
			...prevState,
			time: time
		}))
		setDataTimes({ time: time })
	}
	
	const onChangeTime = () => {
		setDataState(prevState => ({
			...prevState,
			time: '',
			number: ''
		}))
	}

	const settings = {
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	}

	return (
		<div>
			<Space></Space>
			{dataState?.doctor_id && dataState?.date && dataState?.time ? (
				<div>
					<div className={'calendar_time'}>
                    <h2 className={'calendar_title'}>Time Selected</h2>
						<span>{dataState?.time}</span>
					</div>
				</div>
			) : dataState?.doctor_id || dataState?.time ? (
				<div className={'date_carousel_div'}>
					<div>
			
						{timesLoading ? (
							<Loader small={25} />
						) : times ? (
							<>
									<div><h2 className={'calendar_title'}>Select Time</h2></div>
									<Slider {...settings}>
								{times?.map((time, key) => {
									
									return (
										<div
											key={key}
											onClick={() => onTime(time)}
										//	style={{ width: 100 }}
											className={'date_div'}
											align={'center'}
										>
											
											<div className={'calendar_time'}>
												<div>
												<div className={'calendar_time_span'}>{time}</div>
												</div>
												
											</div>
										</div>
									)
								})}
							</Slider>
							</>
						

						) : (
							<div style={{ fontWeight: 600, color: '#c26aa6' }}>
								{t('No available times')}
							</div>
						)}
					</div>
				</div>
			) : (
				<div></div>
			)}
		</div>
	)
}
export default AppTime
