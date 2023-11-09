import React from 'react'
import ReactDOM from 'react-dom/client'
import { MovieSearcher } from './MovieSearcher.jsx'
import './styles/movieSearch.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MovieSearcher/>
  </React.StrictMode>,
)
