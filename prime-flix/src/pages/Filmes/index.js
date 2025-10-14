import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './filmes-info.css'

import api from '../../services/api';

function Filmes (){
  const {id} = useParams();
  const [filmes, setFilmes] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    async function loadFilmes(){
      await api.get(`/movie/${id}`, {
        params:{
          api_key: "705236d5b5522ebbe290f28f32043592",
          language: "pt-BR",
        }
      })
      .then((response)=>{
        setFilmes(response.data);
        setLoading(false);
      })
      .catch(()=>{
        console.log("FILME NÂO ENCONTRADO")
      })
    }

    loadFilmes();

    return () => {
      console.log("COMPONENTE FOI DESMONTADO")
    }
  }, [])

  if(loading){
    return(
      <div className="filmes-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }
  
  return(
    <div className="filmes-info">
      <h1>{filmes.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filmes.backdrop_path}`} alt={filmes.title}/>

      <h3>Sinopse</h3>
      <span>{filmes.overview}</span>
      <strong>Avaliação: {filmes.vote_average.toFixed(1)} /10</strong>

      <div className='area-buttons'>
        <button>Salvar</button>
        <button>
          <a href="#">
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Filmes;