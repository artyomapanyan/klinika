import React, { useEffect, useRef, useState } from 'react'
import { Button, Divider, Space, Spin } from 'antd'
import { CalendarOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import dayjs from 'dayjs'
import Resources from '../../../../store/Resources'
import { postResource } from '../../../Functions/api_calls'
import { useSelector } from 'react-redux'
import { t } from 'i18next'
import Loader from '../../../Loader'

function AppDate({ setDataState, dataState, data, setDate }) {
	let token = useSelector(state => state.auth.token)
	let sliderRef = useRef()
	const [dayOff, setDayOff] = useState([])
	const [sliderIndex, setSliderIndex] = useState(-1)
	const [loadingDate, setLoadingDate] = useState(false)

	const [daysData, setDaysData] = useState([])
    const [monthsData, setMonthsData] = useState([])

	useEffect(() => {
		if (dataState?.doctor_id) {
			setLoadingDate(true)
			postResource(
				'PublicClinicDoctorWorkingHours',
				'single',
				token,
				dataState?.doctor_id + '/' + data?.clinic?.id,
				{ service: 'clinic_visit' }
			).then(response => {
				const res = response?.working_hours
				let day = []
				Object.values(res)
					?.map(el => {
						return el.filter(el1 => el1.is_day_off === true)
					})
					.map((el, i) => {
						if (el.length > 0) {
							day.push(i + 1)
						}
					})

				setDaysData(
					[...Array(30).keys()]
						.filter(key => !day.includes(currentDate.add(key, 'day').day()))
						.map(key => ({
							key,
							disabled: false
						}))
				)
				setSliderIndex(0)
				setDayOff(day)
				setLoadingDate(false)
			})
		}
	}, [dataState?.doctor_id])

	useEffect(() => {
		let callableDays = [...daysData]
			.slice(sliderIndex, sliderIndex + 5)
			.filter(e => !e.called)

		Promise.all(
			callableDays.map(callableDay => {
				return postResource(
					'PublicClinicDoctorAvailableTimes',
					'single',
					token,
					dataState?.doctor_id + '/' + data?.clinic?.id,
					{
						service: 'clinic_visit',
						date: dayjs().add(callableDay.key, 'day').format('YYYY-MM-DD')
					}
				).then(response => {
					return {
						key: callableDay.key,
						hasDays: response ? response[0]?.length : 0
					}
				})
			})
		).then(responses => {
			//console.log(responses)
			setDaysData(prevState =>
				prevState.map(e => {
					let data = responses.find(u => e.key === u.key)
					if (data) {
						e.disabled = !data.hasDays
						e.called = true
					}

					return e
				})
			)
		})
	}, [sliderIndex])

	const onDate = date => {
		setDataState(prevState => ({
			...prevState,
			date: date?.format('YYYY-MM-DD')
		}))
		setDate({ date: date?.format('YYYY-MM-DD') })
	}

	useEffect(() => {}, [sliderIndex])

	const onChangeDate = () => {
		setDataState(prevState => ({
			...prevState,
			date: '',
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

	const currentDate = dayjs()
	const currMonth = new Date().toLocaleString([], {
		month: 'long',
	  });
	
	
	return (
		<div>
			{dataState?.doctor_id && dataState?.date ? (
				<>
					<Space>
						<div className={'calendar_content'}>
							<h2 className={'calendar_title'}>Pick Date</h2>
						</div>
					</Space>
					<div style={{ padding: '10px' }}>
						<span className={'selected_text'} style={{ color: 'white' }}>
							{dataState?.date}
						</span>
					</div>
				</>
			) : dataState?.doctor_id || dataState?.date ? (
				<div className={'date_carousel_container'}>
					{
						//div className={'date_carousel_div'}
						loadingDate ? (
							<Loader small={10} />
						) : (
							<div>
								<div className={'calendar_title'} style={{ padding: '10px',display:'flex' ,justifyContent:'space-between'}}>
									Pick Date
									<LeftOutlined  style={{fontSize:'15px'}}/>
									<h2 className={'calendar_month'} style={{marginTop:'4px'}}>{currMonth}</h2>
									<RightOutlined style={{fontSize:'15px'}}/> 
								</div>
								<div style={{ margin: '15px' }}>
									<Slider
										{...settings}
										ref={sliderRef}
										afterChange={e => setSliderIndex(e)}
										className={'slider_date'}
									>
										{daysData.map(({ key, disabled, called }, i) => {
											const date = currentDate.add(key, 'day')

											return (
												<div>
													<div
														key={key}
														onClick={() => called && !disabled && onDate(date)}
														className={'date_box'}
													>
														<div
															className={
																disabled
																	? 'disabled_date_container'
																	: 'active_date_container'
															}
														>
															<div className={'calendar_day_content'}>
																<div style={{ fontSize: '12px' }}>
																	{Resources.Days[date.day()]}
																</div>
															</div>
															<hr style={{ borderTop: '1px solid white' }} />
															<>
																<Spin spinning={!called}>
																	<div className={'calendar_day_content'}>
																		<div>{date.format('DD')}</div>
																	</div>
																</Spin>
																{/*{disabled?<div>Disabled</div>:null}*/}
															</>
														</div>
													</div>
												</div>
											)
										})}
									</Slider>
								</div>
							</div>
						)
					}
				</div>
			) : (
				<div></div>
			)}
		</div>
	)
}
export default AppDate
