import './header.css'
import { Link } from 'react-router-dom'


function Header(){
  return(
    <header>
      <Link className="logo" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Prime Flix</Link>
      <Link className="favoritos" to="/favoritos">Meus Filmes</Link>
    </header>
  )
}

export default Header;