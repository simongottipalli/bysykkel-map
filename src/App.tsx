import { APIProvider } from '@vis.gl/react-google-maps';
import BysykkelMap from "./components/BysykkelMap.tsx";

const App = () => {
    return (
    <APIProvider apiKey={'AIzaSyC0xcBuSXYxhkonb8jYYXql_gNUIotFVZM'} onLoad={() => console.log('Maps API has loaded.')}>
        <BysykkelMap />
    </APIProvider>
);
};

export default App;