import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import BysykkelPin from "./BysykkelPin.tsx";
import { StationResponse } from "../api/apiService.ts";
import {Marker} from "@googlemaps/markerclusterer";

export interface MarkerProps {
    station: StationResponse;
    map: google.maps.Map | null;
    openMarkerId: number | null;
    onMarkerClick: (id: number | null) => void;
    setMarkerRef: (marker: Marker | null, key: number) => void;
}

const BysykkelMarker = (props: MarkerProps) => {
    const selectedZoom = 19;
    const { station, openMarkerId, onMarkerClick } = props;

    const handleMarkerClick = () => {
        if (!props.map) return;
        if (!props.map.getBounds()) return;

        const latlng = { lat: station.latitude, lng: station.longitude };
        props.map.panTo(latlng);
        props.map.setZoom(selectedZoom)
        if (openMarkerId === station.stationId) {
            onMarkerClick(null);
        } else {
            onMarkerClick(station.stationId);
        }
    };

    return (
        <>
            <AdvancedMarker
                position={{ lat: station.latitude, lng: station.longitude }}
                clickable = {true}
                onClick={handleMarkerClick}
                ref={marker => props.setMarkerRef(marker, station.stationId)}
            >
                <BysykkelPin />
            </AdvancedMarker>
            {openMarkerId === station.stationId && (
                <InfoWindow position={{ lat: station.latitude, lng: station.longitude }} onCloseClick={() => onMarkerClick(null)}>
                    <h4>{station.stationName}</h4>
                    <p>Bikes Available: {station.bikesAvailable | 0}</p>
                    <p>Docks Available: {station.docksAvailable | 0}</p>
                </InfoWindow>
            )}
        </>
    );
}

export default BysykkelMarker;