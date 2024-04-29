import axios from "axios"




const baseUrl = import.meta.env.VITE_baseUrl


const options = {
   
    params: {
        maxResults: '50'
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_apiKey,
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };

export const fetchFromApi = async (url)=>{
   const {data} = await axios.get(`${baseUrl}/${url}`, options)

   return data
}