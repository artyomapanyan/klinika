import React, {useEffect, useRef, useState} from "react";
import {GoogleMap, LoadScript, Marker, Autocomplete} from "@react-google-maps/api";
import {Col, Form, Input, Row} from "antd";
import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";

function MyMapComponent({data,formRef}) {
    const googleRef = useRef();
    const [autocomplete, setAutocomplete] = useState()
    const [initialPosition,setInitialPosition] = useState({ lat: +data?.location?.latitude, lng: +data?.location?.longitude })
    const [marker,setMarker] = useState()
    const [map,setMap] = useState()
    const [mapData,setMapData] = useState({

    })

    const onLoadMap = (map) => {
        setMap(map);
    };
    const onClickMap = (position) => {
        marker.setPosition(position.latLng);
        onSetMarkerPosition(position.latLng);
    };
    function onSetMarkerPosition(latLng) {
        let geocoder =  new window.google.maps.Geocoder();
        setTimeout(() => {
            geocoder?.geocode({'latLng': marker.getPosition()}, function (results, status) {
                if (results[0]) {
                    formRef.current.setFieldValue('latitude',results[0]?.geometry?.location?.lat().toString())
                    formRef.current.setFieldValue('longitude',results[0]?.geometry?.location?.lng().toString())
                    formRef.current.setFieldValue('address',results[0]?.formatted_address)
                }
            });
        }, 100)
    }
    const onLoad = (autocomplete) => {
        setAutocomplete(autocomplete)
    }
    const onDragMarker = (pos) => {
        let geocoder =  new window.google.maps.Geocoder();
        setTimeout(() => {
            geocoder?.geocode({'latLng': marker.getPosition()}, function (results, status) {
                if (results[0]) {
                    formRef.current.setFieldValue('latitude',results[0]?.geometry?.location?.lat().toString())
                    formRef.current.setFieldValue('longitude',results[0]?.geometry?.location?.lng().toString())
                    formRef.current.setFieldValue('address',results[0]?.formatted_address)
                }
            });
        }, 100)
        setInitialPosition(pos.latLng)
    }

    const onLoadMarker = (marker) => {
        setMarker(marker)
    };


    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            map.setCenter(autocomplete.getPlace().geometry.location);
            marker.setPosition(autocomplete.getPlace().geometry.location);
            //onSetMarkerPosition(autocomplete.getPlace().geometry.location);
        } else {

        }
    }
    useEffect(()=>{
        if( mapData.country){
            let geocoder =  new window.google.maps.Geocoder();


            geocoder.geocode( { 'address':  [mapData.country,mapData.area,mapData.city].filter(e=>e).join(' ')}, function(results, status) {

                if (status == window.google.maps.GeocoderStatus.OK) {
                    formRef.current.setFieldValue('latitude',results[0]?.geometry?.location?.lat().toString())
                    formRef.current.setFieldValue('longitude',results[0]?.geometry?.location?.lng().toString())
                    marker.setPosition(results[0].geometry.location)
                    map.setCenter(results[0].geometry.location);
                   // onSetMarkerPosition(autocomplete.getPlace().results[0].geometry.location);

                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
        }


    },[mapData])
    useEffect(()=>{



    },[])

    const apiKey = 'AIzaSyD9MbMz7FESa79v-nntPfcxJHYTw8Am1S4'

    const uluru = { lat: 24.845909101072877, lng: 39.569421557617204 }


    return(
        <LoadScript
            id="script-loader"
            googleMapsApiKey={apiKey}
            //language={this.props.state.Intl.locale}
            libraries={['places']}
        >
        <div>

            <Row gutter={[20]}>
                <Col lg={6}>
                    <FormInput label={t('Country')} name={'country_id'} inputType={'resourceSelect'}
                               initialValue={data?.location?.region?.country?.id}
                               rules={[{required: true}]}
                               inputProps={{
                                   onChange:(e,data)=> {
                                       formRef?.current?.setFieldsValue({
                                           region_id:null,
                                           city_id:null
                                       })
                                       setMapData((prevState) => ({
                                           ...prevState,
                                           country: data.find(u => u.id === e).name
                                       }))
                                   }
                               }}
                               initialData={data?.location?.region?.country?[data?.location?.region?.country]:[]}
                               resource={'Country'} />
                </Col>
                <Col lg={6}>
                    <FormInput label={t('Area')} name={'region_id'} inputType={'resourceSelect'}
                               initialValue={data?.location?.region?.id}
                               rules={[{required: true}]}
                               resourceParams={{
                                   country:formRef?.current?.getFieldValue('country_id')
                               }}
                               inputProps={{
                                   onChange:(e,data)=> {
                                       formRef?.current?.setFieldsValue({
                                           city:null
                                       })
                                       setMapData((prevState) => ({
                                           ...prevState,
                                           area: data.find(u => u.id === e).name
                                       }))
                                   }
                               }}
                               initialData={data?.location?.region ? [data?.location?.region]:[]}
                               resource={'Region'} />
                </Col>
                <Col lg={6}>
                    <Form.Item hidden={true} name={'latitude'} initialValue={data?.location?.latitude}></Form.Item>
                    <Form.Item hidden={true} name={'longitude'} initialValue={data?.location?.longitude}></Form.Item>

                    <FormInput label={t('City')} name={'city_id'} inputType={'resourceSelect'}
                               initialValue={data?.location?.city?.id}
                               rules={[{required: true}]}

                               resourceParams={{
                                   region:formRef?.current?.getFieldValue('region_id')
                               }}
                               inputProps={{
                                   onChange:(e,data)=>setMapData((prevState)=>({
                                       ...prevState,
                                       city:data.find(u=>u.id===e).name
                                   }))
                               }}
                               initialData={data?.location?.city?[data?.location?.city]:[]}
                               resource={'City'} />
                </Col>
                <Col lg={6}>
                    <Autocomplete
                        onLoad={onLoad}
                        onPlaceChanged={onPlaceChanged}
                    >
                        <Form.Item name={'address'}>
                            <Input  style={{paddingLeft:16, paddingTop:13, paddingBottom:13, borderRadius:12}} />
                        </Form.Item>
                    </Autocomplete>
                </Col>


                {/*<Form.Item label={t('Latitude')} name={'latitude'} initialValue={data?.latitude} >*/}
                {/*    <Input style={{paddingLeft:16, paddingTop:13, paddingBottom:13, borderRadius:12}}/>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label={t('Longitude')}  name={'longitude'} initialValue={data?.longitude}>*/}
                {/*    <Input style={{paddingLeft:16, paddingTop:13, paddingBottom:13, borderRadius:12}}/>*/}
                {/*</Form.Item>*/}

            </Row>
            <div>
                    <GoogleMap
                        ref={googleRef}
                        id="position-map"
                        center={data ? initialPosition : uluru}
                        zoom={11}
                        onLoad={onLoadMap}
                        onClick={onClickMap}
                        options={{
                            mapTypeControl: false,
                            streetViewControl: false,
                            rotateControl: false,
                        }}

                    >


                        <Marker
                            onMouseUp={onDragMarker}
                            onLoad={onLoadMarker}
                            draggable
                            position={initialPosition}
                        />
                    </GoogleMap>

            </div>
        </div>
        </LoadScript>
    )










    // const ref = useRef();
    //
    // const uluru = { lat: +data.latitude, lng: +data.longitude };
    //
    // // const map = new window.google.maps.Map(document.getElementById("map"), {
    // //     zoom: 4,
    // //     center: uluru,
    // // });
    //
    // const marker = new window.google.maps.Marker({
    //     position: uluru,
    //     map: map,
    // });
    //
    //
    //
    //
    //     new window.google.maps.Map(ref.current, {
    //         center: uluru,
    //         zoom:10,
    //     })
    //
    //
    //
    // return <div style={{height:400, width:500}} ref={ref} id="map" />;
}
export default MyMapComponent;