import { APIProvider } from '@vis.gl/react-google-maps';
import BysykkelMap from "./components/BysykkelMap.tsx";

const App = () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        console.error('Google Maps API key is not set. Please set it in your environment variables.');
        return <div>Error: Google Maps API key is not set.</div>;
    }
    return (
    <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
        <BysykkelMap />
    </APIProvider>
);
};

export default App;