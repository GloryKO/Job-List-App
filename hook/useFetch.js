import {useState,UseEffect, useEffect} from 'react'
import axios from 'axios'


const useFetch =(endpoint,query)=>{
    const [data,setData] = useState([]);
    const [isLoading,setisLoading] = useState(false);
    const [error,setError] = useState(null);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': a37fce9615msh4825d5232a80481p11b089jsn98ff8241c3f3,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
          },
        url: `https://jsearch.p.rapidapi.com/{$endpoint}`,
        params: {...query},
      };


const fetchData = async ()=>{
    setisLoading(true);
    try{
        const response = await axios.request(options);
        setData(response.data.data);
        setisLoading(false);

    }
    catch(error){
        setError(error);
        alert("Error fetching data");

    }
    finally{
        setisLoading(false);
    }
}

useEffect(()=>{
    fetchData();
},[])

const reFetch =()=>{
    setisLoading(true);
    fetchData()
}
return {error,data,isLoading,reFetch}
}
export default useFetch;