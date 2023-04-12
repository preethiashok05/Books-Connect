import React , {useEffect} from "react";
import useGeolocation from "../hooks/useGeolocation";

function AddressDetails({ formData, setFormData }) {
  const location = useGeolocation();

 useEffect( () => {
  if(location?.errror){
    alert("location access denied.kindly refresh the page to allow access");
    return;
  }
  setFormData({ ...formData, lat: location?.coordinates.lat , lng: location?.coordinates.lng });
 }, [location]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="user-details-container">
      {/* here I'm trying to setFormData for latitude , which is not working */}
        <input
        type="text"
        placeholder="country"
        value={formData.country}
        onChange={(e) => {
          setFormData({ ...formData, country: e.target.value });
        }}
      />
        <input
        type="text"
        placeholder="State ..."
        value={formData.state}
        onChange={(e) => {
          setFormData({ ...formData, state: e.target.value });
        }}
        required
      />
      <input
        type="text"
        placeholder="City"
        value={formData.city}
        onChange={(e) => {
          setFormData({ ...formData, city: e.target.value });
        }}
        required
      />
      <textarea
        placeholder="Extra Details (landmark , apartment-number ..)"
        value={formData.detail}
        onChange={(e) => {
          setFormData({ ...formData, detail: e.target.value });
        }}
        required
      />
         <input
        type="text"
        placeholder="pincode"
        value={formData.pincode}
        onChange={(e) => {
          setFormData({ ...formData, pincode: e.target.value });
        }}
        required
      />
    </div>
  );
}

export default AddressDetails;
