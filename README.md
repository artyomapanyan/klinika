    useEffect(() => {

        if(data.service_type){
            if(data?.service_type === 'nursing' || data?.service_type === 'laboratory_clinic_visit' || data?.service_type === 'laboratory_home_visit') {
                setLoading(true)
                postResource('Clinic', 'ClinicsAvailableTimes', token, clinicID, {
                    date: selectedDate,
                    service: data.service_type,
                }).then(response => {
                    setLoading(false)
                    setTimes(response.flat())
                    setNoTimes(response)

                })
            } else {
                setLoading(true)
                postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, docItem?.doctor.id + "/" + clinicID, {
                    service: data.service_type,
                    date: selectedDate
                }).then(response => {
                    setLoading(false)
                    setTimes(response.flat())
                    setNoTimes(response)
                })
            }

        }

    }, [selectedDate, docItem,data.service_type])****