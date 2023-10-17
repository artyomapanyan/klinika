import React, { useRef, useState } from 'react'
import {
	GoogleMap,
	LoadScript,
	Marker
} from '@react-google-maps/api'

function OfferMap({data}) {

	const googleRef = useRef()
	const [initialPosition, setInitialPosition] =useState({ lat: +data?.clinic?.location?.latitude, lng: +data?.clinic?.location?.longitude })
	const [marker, setMarker] = useState()
	const [map, setMap] = useState()
 
	const onLoadMap = map => {
		setMap(map)
	}
	
	const onDragMarker = pos => {
		let geocoder = new window.google.maps.Geocoder()
		setInitialPosition(pos.latLng)
	}

	const onLoadMarker = marker => {
		setMarker(marker)
	}

	const apiKey = 'AIzaSyD9MbMz7FESa79v-nntPfcxJHYTw8Am1S4'

	const uluru = { lat: 24.845909101072877, lng: 39.569421557617204 }

	return (
		<div>
			<LoadScript
				id='script-loader'
				googleMapsApiKey={apiKey}
				//language={this.props.state.Intl.locale}
				libraries={['places']}
			>
				<GoogleMap
					ref={googleRef}
					id='position-map-offer'
				    center={data ? initialPosition : uluru}
					zoom={11}
					onLoad={onLoadMap}
					options={{
						mapTypeControl: false,
						streetViewControl: false,
						rotateControl: false
					}} 
				>
					<Marker
						onMouseUp={onDragMarker}
						onLoad={onLoadMarker}
						//draggable
						position={initialPosition}
					/>
				</GoogleMap>
			</LoadScript>
		</div>
	)
}

export default OfferMap
