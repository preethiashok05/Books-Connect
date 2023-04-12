import  {useEffect , useState}from 'react';


export default function useGeolocation() {
    const [location , setlocation] = useState({
        loaded:false,
        errror:false,
        coordinates:{lat:"",lng:""},
      });
      
      const onSuccess = (locn) => {
        setlocation({
          loaded:true,
          errror:false,
          coordinates :{
            lat : locn.coords.latitude,
            lng :locn.coords.longitude
          }
        })
      }
      const onError = (error) => {
        setlocation({
          loaded:true,
          errror:true,
          error, 
        })
      }
     
     useEffect(() => {
     
            if(!("geolocation" in navigator)){
                onError({
                    code :0,
                    message :"Geolacation not supported"
                });
            }  
        navigator.geolocation.getCurrentPosition(onSuccess , onError);

     }, []);

  return location;
}
