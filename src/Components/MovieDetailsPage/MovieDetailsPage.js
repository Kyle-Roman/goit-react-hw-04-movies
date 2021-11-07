import { useEffect, useState, lazy, Suspense } from "react";
import {useParams, Link, useRouteMatch, Route, useHistory, useLocation} from "react-router-dom";
import * as API from '../Services/Api';
import noPoster from '../../noimage.png';

import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast/Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() => import('../Reviews/Reviews' /* webpackChunkName: "reviews" */));

export default function MovieDetailsPage() {
  const [movie, setMovieDetails] = useState(null);
  const [locationState, setLocationState] = useState();
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  
   useEffect(() => {
    API.fetchMovieDetails(movieId).then(setMovieDetails);
   }, [movieId])
  
   useEffect(() => {
    location?.state?.from && setLocationState(location.state.from);
   }, [location]);
  
  const handleGoBack = () => {
    history.push(locationState ?? "/");
  }

  return (
    <div>
      <button type="button" onClick={handleGoBack} className={s.button}>Go back</button>
      {movie && <div>
        <div className={s.container}>
          {movie.poster_path 
              ? (<img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.original_title} className={s.poster}/>)
              : (<img src={noPoster} alt={movie.original_title} className={s.poster}></img>)}
            <div className={s.details}>
              <h1>
                {movie.original_title} (
                {new Date(movie.release_date).getFullYear()})
              </h1>
              <p className={s.score}>User Score: {movie.vote_average}/10</p>
              <h2>Overview</h2>
            <div className={s.overview}>{movie.overview}</div>
            <h3>Genres</h3>
                <ul className={s.genres_list}>
                  {movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>             
              </div>
        </div>            
        <h4>Additional information</h4>
        <div className={s.linkWrapper}>
          <Link to={`${url}/cast`} className={s.link}>Cast</Link>                    
          <Link to={`${url}/reviews`} className={s.link}>Reviews</Link>
        </div>
            <Suspense>
              <Route path="/movie/:movieId/cast">
              {<Cast movieId={movieId} />}
            </Route>
            <Route path="/movie/:movieId/reviews">
              {<Reviews movieId={movieId} />}
            </Route>
            </Suspense>                    
      </div>}
    </div>)    
}