import React, {useEffect, useRef, useState} from 'react'
import './AllOffers.sass'
import off_head from '../../dist/Img/off_head.png'
import mobile_filter_icon from '../../dist/icons/mobile_filter_icon.png'

import {Button, Divider, Radio, Result, Row, Dropdown, Drawer, TreeSelect, Space} from 'antd'
import OffersPrices from './Fragments/OffersPrices'
import {changeLanguage, t} from 'i18next'
import OfferCard from './Fragments/OfferCard'
import OffersFooter from './Fragments/OffersFooter'
import { useGetResourceIndex } from '../Functions/api_calls'
import Preloader from '../Preloader'
import { useSearchParams } from 'react-router-dom'
import { paramsToObject } from '../../functions'

import AllOffersHeader from './Fragments/AllOffersHeader'
import AllOffersMobileHeader from './Fragments/AllOffersMobileHeader'
import OfferPriceMobile from './Fragments/OfferPriceMobile'

import {useDispatch, useSelector} from 'react-redux'

import {CarryOutOutlined, DownOutlined, StepForwardOutlined} from "@ant-design/icons";
import arrowDownPurple from "../../dist/icons/purple_arrow_down1.png";
import OffersTopPrice from "./Fragments/OffersTopPrice";
import low_to_high_icon from "../../dist/icons/purple_htree_line.png";



function  AllOffers() {
	let lngs = useSelector(state => state?.app?.current_locale)
	let dispatch = useDispatch()

	const currentUrl = window.location.href
	const [treeValue, setTreeValue] = useState('')
	let [searchParams, setSearchParams] = useSearchParams({})
	const [params, setParams] = useState({
		order_by: 'new_price',
		page: 1,
		per_page: 15,
		order: 'desc',
		...paramsToObject(searchParams.entries())
	})

	const [resetState, setResetState] = useState(false)
	const [open, setOpen] = useState(false)

	const [items, setItems] = useState([])





	const { loadingState, dataState, addData } = useGetResourceIndex(
		'PublicOffer',
		params,
		false,
		false,
		false,
		false,
		{
			PublicClinic: { per_page: 5000 },
			PublicCategory: {}
		},
		{
			loadMore: true
		}
	)

	const { loading } = loadingState
	const { data } = dataState

	useEffect(() => setSearchParams(params), [params])
	const handleNextPage = () => {
		setParams(prevState => ({
			...prevState,
			page: +prevState.page + 1
		}))

		//     setDataLength((prevState)=>(
		//         prevState + 5
		// ))
	}
	const onChangeRadio = e => {
		setParams({
			...params,
			category: null,
			sub_category: null
		})
	}

	const onClick = e => {
		setParams({
			...params,
			sub_category: e?.key
			//category: null
		})
	}

	const onDropBtnChange = e => {
		setParams({
			...params,
			category: e?.id,
			sub_category: null
		})
	}



	const onApply = () => {
		setOpen(false)
	}


	useEffect(() =>{

		if(addData?.PublicCategory) {
			let tree = [
				{
					className: 'ASDF',
					value: ' ',
					title: t('All Categories'),


				},
				...addData?.PublicCategory?.items.map((el) => {
					return {
						className: treeValue == el?.id ? 'selected_ASDF' : 'ASDF',
						title: <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',}}>
							<span className={'tree_seleqt_title_name'}>{el?.name}</span>
							<span className={'select_title_length'}
								  style={{ padding: '0 5px',
									  fontSize: 12,
									  color: '#000000',
									  fontWeight: 400,
									  background: '#F5F6FA',
									  borderRadius: 4,
									  marginTop: 3,
									  marginRight: 8,
									  marginLeft: 8

								  }}
							>
							{el?.sub_categories.length}
						</span>
						</div>,
						value: el?.id,
						icon: <DownOutlined />,
						children: el?.sub_categories?.map((e) => {
							return {
								style: { borderBottom: e[e?.length] = '2px solid #774D9D'},
								className: treeValue == e?.id + '-' + e.id ? 'selected_ASDF_children' : 'ASDF_children',
								title: <span className={'tree_seleqt_title_name'}>{e?.name}</span>,
								value: el.id + '-' + e.id,
							}
						})
					}
				})

			]
			setItems(tree)

		}


	}, [addData?.PublicCategory])





	const onChangeaaa = (val, a) => {

		setTreeValue(val)
		if(val) {
			if(val.toString().includes('-')) {
				setParams({
					...params,
					sub_category: val.slice(val.indexOf('-')+1, val.length),
					category: '',
					name: a[0]?.props?.children ? a[0]?.props?.children : ''

				},

				)
			} else {
				setParams({
					...params,
					category: val,
					sub_category: '',
					name: a[0]?.props?.children[0]?.props?.children ? a[0]?.props?.children[0]?.props?.children : ''
				})
			}
		}

	}


	useEffect(()=>{
		if(lngs!=='ar'){
			changeLanguage('ar')
			dispatch({
				type:'LANGUAGE_STATE',
				payload:'ar'
			})
			window.location.reload()
		}
	},[])



	return (
		<div style={{ backgroundColor: '#f5f6fa' }}>
			<div className={'header_img_lng'}>
				<div className={'bac_div'}>
					<img src={off_head} alt={'off_head'} style={{ width: '100%' }} />
				</div>

				<div className={'offer_logo_div'}>
					<AllOffersHeader headerState={true} />
				</div>
			</div>

			{resetState ? (
				<Preloader />
			) : (
				<div
					style={
						lngs === 'en'
							? {
									textAlign: 'left'
							  }
							: {
									textAlign: 'right',
									direction: 'rtl'
							  }
					}
				>
					<div className={'menu_div'}>
						<div className={'tab_div'}>



						{/*new categries*/}

							<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
								<div className={'treeSelect'} >




									<TreeSelect

										style={{
											width: 198,

										}}
										size={'large'}
										//value={value}
										dropdownStyle={{
											maxHeight: 400,
											//overflow: 'auto',
											minWidth: 300,
										}}
										treeData={items}
										placeholder={params?.name ? params?.name : t("Select Categories")}
										placement={'bottomLeft'}
										onChange={onChangeaaa}
										switcherIcon={()=><img src={arrowDownPurple} alt={'arrowDownPurple'}/>}



									/>
								</div>

								<div style={{width: '100%'}}>
									<OffersTopPrice currentUrl={currentUrl}
													clinics={addData?.PublicClinic?.items}
													resetState={resetState}
													setResetState={setResetState}
													setParams={setParams}
													params={params}
													data={data?.items}/>
								</div>

							</div>





							{/*<Button*/}
							{/*	type={*/}
							{/*		params?.category || params?.sub_category*/}
							{/*			? 'secondary'*/}
							{/*			: 'primary'*/}
							{/*	}*/}
							{/*	onClick={onChangeRadio}*/}
							{/*	className={'all_offer_btn_style'}*/}
							{/*	style={{*/}
							{/*		color:*/}
							{/*			params?.category || params?.sub_category*/}
							{/*				? '#000000'*/}
							{/*				: '#ffffff'*/}
							{/*	}}*/}
							{/*>*/}
							{/*	{t('All offers')}*/}
							{/*</Button>*/}

							{/*{addData?.PublicCategory?.items?.map(el => {*/}
							{/*	let subCategories = el?.sub_categories?.map(e => {*/}
							{/*		return {*/}
							{/*			label: e?.name,*/}
							{/*			key: e?.id*/}
							{/*		}*/}
							{/*	})*/}
							{/*	return (*/}
							{/*		<Dropdown*/}
							{/*			key={el?.id}*/}
							{/*			menu={{*/}
							{/*				items: subCategories,*/}
							{/*				onClick*/}
							{/*			}}*/}
							{/*			placement='bottom'*/}
							{/*			arrow*/}
							{/*		>*/}
							{/*			<Button*/}
							{/*				style={{*/}
							{/*					color:*/}
							{/*						params?.category === el?.id ? '#ffffff' : '#000000'*/}
							{/*				}}*/}
							{/*				className={'all_offers_category_radio_button'}*/}
							{/*				type={*/}
							{/*					params?.category === el?.id ? 'primary' : 'secondary'*/}
							{/*				}*/}
							{/*				onClick={() => onDropBtnChange(el)}*/}
							{/*			>*/}
							{/*				{el?.name}*/}
							{/*			</Button>*/}
							{/*		</Dropdown>*/}
							{/*	)*/}
							{/*})}*/}


							<Divider />
							<div>
								<OffersPrices
									currentUrl={currentUrl}
									clinics={addData?.PublicClinic?.items}
									resetState={resetState}
									setResetState={setResetState}
									setParams={setParams}
									params={params}
									data={data?.items}
									search={paramsToObject(searchParams.entries())}
								/>
							</div>

						</div>

						<div className={'tab_div_mobile'}>
							<div style={{padding: '0 14px 0 14px'}}>
								<AllOffersMobileHeader />
							</div>
							<div style={{display: 'flex', gap: 10, flexDirection: 'row', alignItem: 'center'}}>
								{/*<div className={'tab_div_mobile_filter_drp'} onClick={showDrawer}>*/}
								{/*	<img src={mobile_filter_icon} alt={'mobile_filter_icon'} />*/}
								{/*	<span className={'tab_div_mobile_filter_text'}>*/}
								{/*	{t('Filter')}*/}
								{/*</span>*/}
								{/*</div>*/}

								<Dropdown
									open={open}
									onOpenChange={(e)=>setOpen(e)}
									dropdownRender={()=>{
										return <div
											// title=''
											// placement='top'
											// onClose={onClose}
											// open={open}
											// closeIcon={false}
											 className={'all_offers_drawer'}
											 style={{background: '#ffffff', width: '100%', marginTop: 10, boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.12)'}}

											// height={414}
										>
											<OfferPriceMobile
												setOpen={setOpen}
												currentUrl={currentUrl}
												clinics={addData?.PublicClinic?.items}
												resetState={resetState}
												setResetState={setResetState}
												setParams={setParams}
												params={params}

												data={data?.items}
												onApply={onApply}
											/>
										</div>
									}}

									trigger={['click']}
									overlayStyle={{width: '100%'}}
									placement={'bottom'}
								>
									<div className={'tab_div_mobile_filter_drp'} >
										<img src={mobile_filter_icon} alt={'mobile_filter_icon'} />
										<span className={'tab_div_mobile_filter_text'}>
									{t('Filter')}
								</span>
									</div>
								</Dropdown>


								<TreeSelect

									style={{
										width: 50,


									}}
									size={'large'}
									//value={value}
									dropdownStyle={{
										maxHeight: 400,
										//overflow: 'auto',

										minWidth: '100%',
										marginTop: 10,
										marginRight: -30,
										borderRadius: 0
									}}
									treeData={items}
									placeholder={<StepForwardOutlined />}
									placement={'bottomLeft'}
									onChange={onChangeaaa}
									suffixIcon={<img src={low_to_high_icon} alt={'low_to_high_icon'} />}
									switcherIcon={()=><img src={arrowDownPurple} alt={'arrowDownPurple'}/>}



								/>
							</div>


						</div>

						{/*<Drawer*/}
						{/*	title=''*/}
						{/*	placement='top'*/}
						{/*	onClose={onClose}*/}
						{/*	open={open}*/}
						{/*	closeIcon={false}*/}
						{/*	className={'all_offers_drawer'}*/}
						{/*	height={414}*/}
						{/*>*/}
						{/*	<OfferPriceMobile*/}
						{/*		setOpen={setOpen}*/}
						{/*		currentUrl={currentUrl}*/}
						{/*		clinics={addData?.PublicClinic?.items}*/}
						{/*		resetState={resetState}*/}
						{/*		setResetState={setResetState}*/}
						{/*		setParams={setParams}*/}
						{/*		params={params}*/}
						{/*		data={data?.items}*/}
						{/*		onApply={onApply}*/}
						{/*	/>*/}
						{/*</Drawer>*/}

						<div className={'big_div_cards'}>
							{loading ? (
								<Preloader />
							) : (
								<Row gutter={[24, 14]} style={{ marginTop: 24 }}>
									{data?.items?.length < 1 ? (
										<div className={'no_offers'}>
											<Result title={t('No offers found')} />
										</div>
									) : (
										data?.items?.map(el => {
											return <OfferCard key={el?.id} data={el} id={el?.id} />
										})
									)}
								</Row>
							)}
						</div>
					</div>
				</div>
			)}

			<div align={'center'} style={{ marginTop: 30 }}>
				<Button
					type={'primary'}
					onClick={handleNextPage}
					disabled={data?.pagination?.total <= data?.items?.length}
				>
					{t('Load more')}
				</Button>
			</div>
			<div style={{ width: '100%' }}>
				<OffersFooter />
			</div>
		</div>
	)
}

export default AllOffers
