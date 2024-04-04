import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { privateApi } from "../api";
import axios from "axios";

const SpotForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [places,setPlaces] = useState([])

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    spotType: "Indoor",
    pricePerHour: 15,
    features: [],
    carCapacity: 10,
    bikeCapacity: 10,
    imageUrls: [],
    cordinates:[]
  });

  function getCordinates(e) {
    
    e.preventDefault();
    console.log(address);

    let url = `https://nominatim.openstreetmap.org/search?
    street=${address.street}
    &city=${address.city}
    &state=${address.state}
    &country=${address.country}
    &postalcode=${address.postalcode}&format=json`;

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "https://o2cj2q.csb.app"
      }
    })
      .then((response ) => {
        if( response.ok){
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then(
        (data) => {
          setName(data[0].display_name);
          setCorrds({
            latitude: data[0].lat,
            longitude: data[0].lon
          });
        }
        // console.log(Object.keys(data[0])

        //   setCorrds(
        //   {
        //   'latitude':data[0].lat,
        //   'longitude': data[0].lon
        // });

        // setInfo({
        //   dispaly_name: data[0].dispaly_name,
        //   icon: data[0].icon
        // })
      ).catch((error) => {
        alert("Error in your input; unable to find the position");
      });;
  }


 


  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "pricePerHour" || name === "carCapacity" || name === "bikeCapacity") {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue) && parsedValue > 0) {
        setFormData({
          ...formData,
          [name]: parsedValue,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const mutation = useMutation(
    async (formData) => {
      const newFeatures = formData.features?.split(",").map((feature) => feature.trim());
      const newImages = formData.imageUrls?.split(",").map((img) => img.trim());

      const response = await privateApi.post("/spots", {
        name: formData.name,
        location: formData.location,
        spotType: formData.spotType,
        description: formData.description,
        pricePerHour: formData.pricePerHour,
        capacity: {
          bike: formData.bikeCapacity,
          car: formData.carCapacity,
        },
        features: newFeatures,
        imageUrls: newImages,
        cordinates: formData.cordinates
      });

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("spots");
        navigate("/spots");
      },
      onError: (error) => {
        console.error("Error:", error.message);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${formData.location}&key=a720b65e76f645f086d299956c1a2dc4`)
    setPlaces(res.data.results)
    console.log(formData.cordinates)
    if(formData.cordinates.length>0){
      mutation.mutate(formData);
    }
  };

  return (
    <div className="mx-auto my-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Description:</label>
          <input
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none"
          />
          {/* <select></select> */}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Spot Type:</label>
          <select
            required
            name="spotType"
            value={formData.spotType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border bg-zinc-900 border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="Indoor">Indoor</option>
            <option value="Open">Open</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Price Per Hour:</label>
          <input
            required
            type="number"
            name="pricePerHour"
            value={formData.pricePerHour}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Features: (comma, seperated)</label>
          <input
            required
            type="text"
            name="features"
            value={formData.features}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Car Capacity:</label>
          <input
            required
            type="number"
            name="carCapacity"
            value={formData.carCapacity}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Bike Capacity:</label>
          <input
            required
            type="number"
            name="bikeCapacity"
            value={formData.bikeCapacity}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="my-2 col-span-2 space-y-2">
          <label className="block text-sm font-medium">Image Urls: (comma seperated)</label>
          <input
            required
            type="text"
            name="imageUrls"
            value={formData.imageUrls}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Choose precise location</label>
          <select
           required
           name="cordinates"
          defaultValue={formData.cordinates}
           onChange={handleInputChange}
          className="w-full px-3 py-2 border bg-zinc-900 border-gray-300 rounded-lg focus:outline-none" >
              {
                places.map((place,key)=><option key={key} value={`${place.geometry.lat},${place.geometry.lng}`}>{place.formatted}</option>)
              }
          </select>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Create Parking Spot
        </button>
      </form>
    </div>
  );
};

export default SpotForm;
