import {Map, useMap} from "@vis.gl/react-google-maps";
import {fetchData, StationResponse} from "../api/apiService.ts";
import BysykkelMarker from "./BysykkelMarker.tsx";
import {useEffect, useRef, useState} from "react";
import {Marker, MarkerClusterer} from "@googlemaps/markerclusterer";

const BysykkelMap = () => {
    const defaultZoom = 17;
    const mapId = 'bysykkel';

    const [defaultCenter, setDefaultCenter] = useState({ lat: 59.93012, lng: 10.77570 });
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setDefaultCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        }
    }, []);

    const [stations, setStations] = useState<StationResponse[]>([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchData();
                setStations(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData();
    }, []);

    const [openMarkerId, setOpenMarkerId] = useState<number | null>(null);

    const handleMarkerClick = (id: number | null) => {
        setOpenMarkerId(id);
    };

    const map = useMap();
    const [markers, setMarkers] = useState<{[key: string]: Marker}>({});
    const clusterer = useRef<MarkerClusterer | null>(null);
    useEffect(() => {
        if (!map) return;
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({map});
        }
    }, [map]);

    useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers));
    }, [markers]);

    const setMarkerRef = (marker: Marker | null, key: number) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;

        setMarkers(prev => {
            if (marker) {
                return {...prev, [key]: marker};
            } else {
                const newMarkers = {...prev};
                delete newMarkers[key];
                return newMarkers;
            }
        });
    };

    return (
        <Map
            defaultZoom={ defaultZoom }
            defaultCenter={ defaultCenter }
            mapId={ mapId }
        >
            {stations.map((station) => (
                <BysykkelMarker
                    key={station.stationId}
                    station={station}
                    openMarkerId={openMarkerId}
                    onMarkerClick={handleMarkerClick}
                    setMarkerRef={setMarkerRef}
                    map={map}
                />
            ))}
        </Map>
    );
}

export default BysykkelMap;