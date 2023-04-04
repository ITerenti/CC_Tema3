import { GoogleMap, GoogleMapProps, MarkerF } from "@react-google-maps/api";
import { AutoComplete, Input } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import './styles.css'
import { LocationCard } from "../locationCard";

export const MapComponent = () => {
    const initCenter = useMemo(() => ({ lat: 47.15, lng: 27.6 }), []);
    const [selected, setSelected] = useState<{ lat: number, lng: number }>(initCenter);
    const [dropdownData, setDropdownData] = useState<{ label: string, value: string }[]>([]);
    const [locationValue, setLocationValue] = useState<string>()
    const [mapObject, setMapObject] = useState<any>();
    const [attractions, setAttractions] = useState<any>([])

    const {
        value,
        setValue,
        suggestions: { data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const onSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);

        let service = new google.maps.places.PlacesService(mapObject);
        const request = {
            location: {lat, lng},
            radius: 500,
            type: 'tourist_attraction',
        }

        service.nearbySearch(request, (val) => {
            setAttractions(val)
            console.log(val)
        })

        setSelected({ lat, lng });
    };

    useEffect(() => {
        const newData = data.map((item) => {
            return { label: item.description, value: item.description };
        });
        setDropdownData(newData);
    }, [data]);

    useEffect(() => {
        if (locationValue) {
            onSelect(locationValue);
            setValue(locationValue);
        }
    }, [locationValue]);

    return (
        <div>
            <AutoComplete
            placeholder="Enter your location address"
            className="autocomplete-field"
            options={dropdownData}
            onChange={(value) => {
                setValue(value)
                setLocationValue(value)
            }}
            onSelect={(address) => {
                onSelect(address);
            }}
          />

            <GoogleMap
                onLoad={(map) => setMapObject(map as any)}
                zoom={15}
                center={!selected ? initCenter : selected}
                mapContainerClassName="map-container"
            >
                {selected && <MarkerF position={selected} />}
                {attractions?.length && attractions.map((item: any) => {
                    return <MarkerF title={item.name} key={item.place_id} position={{lat: item.geometry.location.lat(), lng: item.geometry.location.lng()}}  />
                })}
            </GoogleMap>

            <div className="attractions-list-container">
            {attractions?.length && attractions.map((item: any) => {
                return <LocationCard key={item.place_id} name={item.name} vicinityAddress={item.vicinity} liked={false} iconUrl={item.icon} />
            })}
            </div>
        </div>
    )
}