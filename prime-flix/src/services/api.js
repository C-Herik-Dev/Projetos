import axios from 'axios';

//Base da URL: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=705236d5b5522ebbe290f28f32043592&language=pt-BR

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
})
  
export default api;