import React, {useRef, useState} from "react";
import {GoogleMap, LoadScript, Marker, Autocomplete} from "@react-google-maps/api";
import {AutoComplete, Col, Form, Input, Row} from "antd";
import {t} from "i18next";
import Preloader from "../../../Preloader";
import FormInput from "../../../Fragments/FormInput";

function MyMapComponent({data,formRef}) {
    const googleRef = useRef();
    const [autocomplete, setAutocomplete] = useState()
    const [initialPosition,setInitialPosition] = useState({ lat: +data.latitude, lng: +data.longitude })
    const [marker,setMarker] = useState()
    const [map,setMap] = useState()

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
            onSetMarkerPosition(autocomplete.getPlace().geometry.location);
        } else {
            // console.log('Autocomplete is not loaded yet!')
        }
    }

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
                    <FormInput label={t('Area')} name={'areas'} inputType={'resourceSelect'}
                               initialValue={data?.location?.region?.country?.id}
                               resource={'Country'} />
                </Col>
                <Col lg={6}>
                    <FormInput label={t('City')} name={'citys'} inputType={'resourceSelect'}
                               initialValue={data?.citys?.map(e=>e.id)}
                               initialData={data?.citys??[]}
                               resource={'City'} />
                </Col>
                <Col lg={12}>
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