import React, { useEffect, useRef, useState } from 'react'
import { Button, Divider, Space, Spin } from 'antd'
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
import SamplePrevArrow from './SamplePrevArrow'
import SampleNextArrow from './SampleNextArrow'

function AppDate({ setDataState, dataState, data, setDate, setDataTimes }) {
	let token = useSelector(state => state.auth.token)
	let sliderRef = useRef()
	const [dayOff, setDayOff] = useState([])
	const [sliderIndex, setSliderIndex] = useState(-1)
	const [loadingDate, setLoadingDate] = useState(false)
	const [timesLoading, setTimesLoading] = useState(false)

	const [daysData, setDaysData] = useState([])
	const [times, setTimes] = useState([])

	const currentDate = dayjs()
	const [today, setToday] = useState(currentDate)

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]

	useEffect(() => {
		if (dataState?.doctor_id) {
			setLoadingDate(true)
			setTimesLoading(true)
			postResource(
				'PublicClinicDoctorWorkingHours',
				'single',
				token,
				dataState?.doctor_id + '/' + data?.clinic?.id,
				{ service: 'clinic_visit' }
			).then(response => {
				console.log('response', response)
				const res = response?.working_hours
				let day = []
				let time = []
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
				setTimesLoading(false)
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
					setTimes(response[0])
					return {
						key: callableDay.key,
						hasDays: response ? response[0]?.length : 0
					}
				})
			})
		).then(responses => {
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

	const onTime = time => {
		setDataState(prevState => ({
			...prevState,
			time: time
		}))
		setDataTimes({ time: time })
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
		],
		nextArrow: (
			<SampleNextArrow
				width='32px'
				height='36px'
				background='#774D9D'
				right='-2px'
				left=''
				top='70px'
				borderRadius='10px'
			/>
		),
		prevArrow: (
			<SamplePrevArrow
				width='32px'
				height='36px'
				background='#774D9D'
				left='200px'
				top='30px'
				borderRadius='10px'
			/>
		)
	}

	const settings2 = {
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
		],
		nextArrow: (
			<SampleNextArrow
				width='30px'
				height='35px'
				background='#BF539E'
				right='0px'
				top='40px'
				borderRadius='10px'
				paddingRight='10'
			/>
		),
		prevArrow: (
			<SamplePrevArrow
				width='30px'
				height='35px'
				background='#BF539E'
				left='200px'
				top='0px'
				borderRadius='10px'
				paddingRight='10'
			/>
		)
	}

	const nextMonth = () => {
		setToday(today.month(today.month() + 1))
	}
	const prevMonth = () => {
		setToday(today.month(today.month() - 1))
	}

	return (
		<div>
			{dataState?.doctor_id ? (
				<>
					<div className={'calendar_content'}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between'
							}}
						>
							<h2 className={'calendar_title'}>Pick Date</h2>
							<LeftOutlined
								style={{ fontSize: '15px', color: 'white' }}
								onClick={prevMonth}
							/>
							<h2 className={'calendar_month'} style={{ marginTop: '4px' }}>
								{months[today.month()]}
							</h2>
							<RightOutlined
								style={{ fontSize: '15px', color: 'white' }}
								onClick={nextMonth}
							/>
						</div>

						{loadingDate ? (
							<Loader small={25} background='#774D9D' />
						) : (
							<div>
								<Slider
									{...settings}
									ref={sliderRef}
									afterChange={e => setSliderIndex(e)}
									style={{ display: 'absolute', paddingRight: '30px' }}
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
														</>
													</div>
												</div>
											</div>
										)
									})}
								</Slider>
							</div>
						)}
					</div>
					<div className={'time_div'}>
						<div className={'calendar_content'}>
							<h2 className={'calendar_title'}>Select Time</h2>
							{timesLoading ? (
								<Loader small={25} />
							) : (
								<div>
									<Slider
										{...settings2}
										style={{
											display: 'absolute',
											paddingRight: '40px',
											paddingTop: '10px',
											paddingBottom: '10px'
										}}
									>
										{times?.map((time, key) => {
											return (
												<div
													key={key}
													onClick={() => onTime(time)}
													style={{ width: 100 }}
													className={'date_div'}
													align={'center'}
												>
													<div className={'calendar_time'}>
														<div>
															<div>{time}</div>
														</div>
													</div>
												</div>
											)
										})}
									</Slider>
								</div>
							)}
						</div>
					</div>
				</>
			) : (
				''
			)}
		</div>
	)
}
export default AppDate
