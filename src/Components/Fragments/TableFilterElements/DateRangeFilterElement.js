import { Button, DatePicker } from 'antd'
import TFInput from './Elements/TFInput'
import React, {useState} from 'react';
import dayjs from 'dayjs'
import { t } from 'i18next'

function DateRangeFilterElement({ filterProps, type='date' ,resource}) {
	const [dateRange, setDateRange] = useState(null);

	const handleDateChange = dates => {
		setDateRange(dates);
		if (dates && dates.length === 2) {
			filterProps.setSelectedKeys({
				from: dayjs(dates[0]).format('YYYY-MM-DD').toString(),
				to: dayjs(dates[1]).format('YYYY-MM-DD').toString()
			})
		}
	}

	const onFilter = () => {
		if (filterProps.selectedKeys?.from && filterProps.selectedKeys?.to){
			filterProps.setSelectedKeys(
				filterProps.selectedKeys?.from + ',' + filterProps.selectedKeys?.to
			)
		}
		else {
			filterProps.setSelectedKeys(null)
		}
		filterProps.confirm()
	}
	const onReset = () => {		
		setDateRange(null);
		filterProps.setSelectedKeys(null);
		filterProps.confirm()
	}

	return (
		<div className={'date-range-filters-div'}>
			<div>
				<TFInput placeholder={t('From')}/>
				<TFInput placeholder={t('To')}/>
				<DatePicker.RangePicker onChange={handleDateChange} value={dateRange}/>
			</div>
			<div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
				<Button size={'large'} type={'primary'} htmlType={'button'} onClick={onFilter} style={{ width: '100%' }} > Filter </Button>
				<Button size={'large'} style={{ width: '100%' }} type={'secondary'} onClick={onReset} > Reset </Button>
			</div>
		</div>
	)
}
export default DateRangeFilterElement
