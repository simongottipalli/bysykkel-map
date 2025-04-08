import axios from 'axios';

const baseUrl = 'http://localhost:8085/';

export interface StationResponse {
    stationId: number;
    stationName: string;
    latitude: number;
    longitude: number;
    bikesAvailable: number;
    docksAvailable: number;
}

export const fetchData = async () => {
    try {
        const stationsEndpoint = `${baseUrl}stations`;

        const response = await axios.get(stationsEndpoint);
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }
        const stations: StationResponse[] = response.data.stations;
        return stations;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};