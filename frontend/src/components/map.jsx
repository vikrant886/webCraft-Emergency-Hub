import React, { useState, useContext, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Homecontext } from './Context/context';

const Map = () => {
    const { lat, long } = useContext(Homecontext);
    const libraries = ['places'];
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyCmSkvG2yYbZSNnKJR2lzIohk2kfVnbA50', // Replace with your actual API key
        libraries: libraries,
    });

    const [hospitals, setHospitals] = useState([]);
    const mapRef = useRef(null);

    const center = { lat: lat, lng: long };

    const onMapLoad = (map) => {
        mapRef.current = map;
    };

    const findHospitals = () => {
        if (!mapRef.current) return;

        const request = {
            location: { lat: lat, lng: long },
            radius: 5000, // Search radius in meters
            type: ['hospital'],
        };

        const service = new window.google.maps.places.PlacesService(mapRef.current);
        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                console.log(results);
                setHospitals(results);
            } else {
                console.error('Error fetching nearby hospitals:', status);
            }
        });
    };

    return (
        <>
            {isLoaded ? (
                <div className='p-20 pb-20 w-full h-full gap-8 flex flex-col'>
                    <GoogleMap
                        zoom={15}
                        center={center}
                        mapContainerStyle={{ width: '100%', height: '700px' }}
                        onLoad={onMapLoad}
                    >
                        {hospitals.map((hospital) => (
                            <Marker
                                key={hospital.place_id}
                                position={{ lat: hospital.geometry.location.lat(), lng: hospital.geometry.location.lng() }}
                                title={hospital.name}
                            />
                        ))}
                    </GoogleMap>
                    <div className='flex flex-row gap-40 justify-center'>
                        <button onClick={findHospitals} className='rounded-md p-4 bg-[#D76F30] text-white font-bold'>Find Hospitals</button>
                        <button onClick={findHospitals} className='rounded-md p-4 bg-[#D76F30] text-white font-bold'>Find Medical Routes</button>
                    </div>
                </div>
            ) : (
                <div>Loading Google Maps...</div>
            )}
        </>
    );
};

export default Map;
