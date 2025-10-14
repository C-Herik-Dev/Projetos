import { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './filmes-info.css'
import api from '../../services/api';
import { toast } from 'react-toastify';

function Filmes (){
  const {id} = useParams();
  const navigate = useNavigate();

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
        navigate("/", { replace: true });
        return;
      })
    }

    loadFilmes();

    return () => {
      console.log("COMPONENTE FOI DESMONTADO")
    }
  }, [navigate, id])

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some( (filmesSalvo)=> filmesSalvo.id === filmes.id)

    if(hasFilme){
      toast.warn("Esse filme já está na sua lista!")
      return;
    }

    filmesSalvos.push(filmes);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
    toast.success("Filme salvo com sucesso!")
  }


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
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a href={`https://youtube.com/results?search_query=${filmes.title} Trailer`} target="blank" rel="external">
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Filmes;