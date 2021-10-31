import React, { useEffect, useState } from "react";
import * as API from '../Services/Api'

import s from './MoviesPage.module.css';

export default function MoviesPage() {
  const [trendingMovies, setMovies] = useState([]);

  useEffect(() => {
    API.fetchTrending().then((res) => {setMovies(res.results)});
  }, [])

  return (
        <div className={s.listContainer}>
            <ul className={s.MoviesList}>
                {trendingMovies && trendingMovies.map((movie) => (
                <li key={movie.id} className={s.MoviesListItem}>
                  <p>{movie.original_title}</p>
                </li>
                ))}                
            </ul>        
        </div>)
};
