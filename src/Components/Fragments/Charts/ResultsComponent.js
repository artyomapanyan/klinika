import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {postResource} from "../../Functions/api_calls";


function ResultsComponent() {
    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);

    const [data,setData] = useState([]);


    useEffect(() => {
        postResource('ClinicOwner','TotalEntries', token,  ownerClinics?.id, ).then((response) => {
            setData(response)
        });

    }, [])
    return (
        <div className={'result_component'}>
                    <div className={'result_component_conteiner'} >
                        <div className={'result_comp_num'}>{data?.clinic_visit_appointments_count}</div>
                        <div className={'result_comp_text'}>Visits</div>

                    </div>
                    <div className={'result_component_conteiner'}>
                        <div className={'result_comp_num'}>{data?.appointments_count}</div>
                        <div className={'result_comp_text'}>Appointments</div>

                    </div>
                    <div className={'result_component_conteiner'} >
                        <div className={'result_comp_num'}>{data?.doctors_count}</div>
                        <div className={'result_comp_text'}>Doctors</div>

                    </div>
                    <div className={'result_component_conteiner'} >
                        <div className={'result_comp_num'}>{data?.review_count}</div>
                        <div className={'result_comp_text'}>Reviews</div>
                    </div>
        </div>
    )
}
export default ResultsComponent;