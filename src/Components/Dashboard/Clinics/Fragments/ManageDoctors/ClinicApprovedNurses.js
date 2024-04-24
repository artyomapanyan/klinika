import { useParams } from 'react-router'
import React, { useState } from 'react'
import { t } from 'i18next'
import ResourceTable from '../../../../Fragments/ResourceTable'
import { Button, Form, Modal } from 'antd'
import LabTechnicianHoursModal from './LabTechnicianHoursModal'

function ClinicApprovedNurses({ dataService }) {
	const params = useParams()

	const [isModalOpen, setIsModalOpen] = useState({})

	const showModal = (id, type, keys) => {
		setIsModalOpen({
			id,
			keys,
			type
		})
	}

	const handleOk = () => {
		setIsModalOpen({})
	}
	const handleCancel = () => {
		setIsModalOpen({})
	}

	return (
		<div className={'manage_doctors_table_div'} style={{ overflow: 'auto' }}>
			<h1 className={'h1'} style={{ marginBottom: -120 }}>
				{t(`Manage Approved Nurses`)}
			</h1>
			<ResourceTable
				tableSmall={true}
				customHeader={({ setParams }) => (
					<Form onValuesChange={(e, v) => setParams(v)}></Form>
				)}
				noHeader={true}
				except={{
					edit: true
				}}
				tableParams={{
					clinic: params.id,
					is_approved: 1,
                    role: 'nurse'
				}}
				resource={'ClinicMedicalStaff'}
				tableColumns={[
					{
						dataIndex: 'id',
						title: 'Nurse id',
						key: 'plid',
						render: (e, record) => {
							return (
								<div style={{ padding: 2 }}>
									{record?.medical_staff?.first} {record?.medical_staff?.last}
								</div>
							)
						}
					},
					{
						dataIndex: ['hours'],
						title: 'Nursing',
						key: 'nursing',
						render: (e, record) => {
							return (
								<div style={{ padding: 2 }}>
									{dataService?.has_nursing_service &&
									dataService?.enable_nursing_service ? (
										<Button
											onClick={() =>
												showModal(record.id, 'nursing', [
													'nursing_activated_at',
													'nursing_diagnosis_price'
												])
											}
											type={'primary'}
											size={'middle'}
										>
											{t('Manage Working hours')}
										</Button>
									) : null}
								</div>
							)
						}
					}
				]}
			/>
			<Modal
				title={t('Working Hours')}
				width={'750px'}
				open={isModalOpen?.id}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={false}
			>
				{isModalOpen?.id ? (
					<LabTechnicianHoursModal
						key={Math.random()}
						id={isModalOpen?.id}
						type={isModalOpen?.type}
						handleCancel={handleCancel}
						keys={isModalOpen.keys}
						setIsModalOpen={setIsModalOpen}
					/>
				) : null}
			</Modal>
		</div>
	)
}
export default ClinicApprovedNurses
