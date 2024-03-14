import React from 'react'
import { Button, Card, Space, Radio } from 'antd'
import TFInput from './Elements/TFInput'
import {useGetResourceIndex} from "../../Functions/api_calls";

function RadioFilterElement({
	filterProps,
	type = 'input',
	resource,
	resourceData
}) {
    const {loadingState, dataState} = useGetResourceIndex(resource, {}, true, true, resourceData)
    const {loading} = loadingState;
    const {data} = dataState;

	const onChangeValue = e => {
		filterProps.setSelectedKeys(e?.target?.value.toString())
	}
	const onFilter = () => {
		filterProps.confirm()
	}
	const onReset = () => {
		filterProps.setSelectedKeys(null)
		filterProps.confirm()
	}

	return (
		<Card
			className={'card-filters'}
			title={
                <Radio.Group onChange={onChangeValue} value={filterProps.selectedKeys}>
                {data?.items?.map(option => (
                    <Radio key={option.id.toString()} value={option.id.toString()}>
                    {option.name}
                    </Radio>
                ))}
                </Radio.Group>
			}
		>
			<Space>
				<Button type={'primary'} htmlType={'button'} onClick={onFilter}>
					Filter
				</Button>{' '}
				<Button type={'secondary'} onClick={onReset}>
					Reset
				</Button>
			</Space>
		</Card>
	)
}
export default RadioFilterElement
