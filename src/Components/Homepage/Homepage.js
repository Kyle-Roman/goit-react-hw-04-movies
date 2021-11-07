import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../Services/Api'

import s from './Homepage.module.css'

export default function Homepage() {
   const [trendingMovies, setTrendingMovies] = useState([]);

   useEffect(() => {
    API.fetchTrending().then(res => setTrendingMovies(res.results));
   }, [])

   console.log(trendingMovies);
  return (
        <div className={s.listContainer}>
            <ul className={s.MoviesList}>
                {trendingMovies && trendingMovies.map((movie) => (
                <li key={movie.id} className={s.MoviesListItem}>
                  <Link to={`/movie/${movie.id}`} className={s.MoviesListLink}>{movie.original_title}</Link>
                </li>
                ))}                
            </ul>        
        </div>)
}