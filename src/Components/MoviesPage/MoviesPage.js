import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as API from '../Services/Api'

import Searchbar from '../Searchbar/Searchbar';
import LoadingView from "../Loader/Loader";
import ErrorView from '../ErrorView/ErrorView';

import s from './MoviesPage.module.css';


export default function MoviesPage() {
  const [resultList, setResultList] = useState([]);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setError] = useState("");

  const location = useLocation();
  const history = useHistory();
  
  const handleInputSubmit = (userSearch) => {
    history.push({ ...location, search: `query=${userSearch}` });
  };

  const searchRequest = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (location.search === "") {
      setStatus("idle");
      return;
    }
    setStatus("pending");

    API.fetchMovieBySerch(searchRequest).then((res) => {
      if (res.total_results !== 0) {
        setResultList(res.results);
        setStatus("resolved");
          return;
        }
        setStatus("rejected");
        setError("No movies found");
      })
      .catch((error) => {
        setError(`${errorMsg}`);
        setStatus("rejected");
      });
  }, [location.search, searchRequest, errorMsg]);
  
  return (
    <div className={s.listContainer}>
      <Searchbar onSubmit={handleInputSubmit} />
      {status === "idle" && <p>Find your movie!</p>}
      {status === "pending" && <LoadingView />}
      {status === "rejected" && <ErrorView />}
      {status === "resolved" && <ul>
          {resultList.map((movie) => {
            return (
              <li className={s.listItem} key={movie.id}>
                <Link className={s.link}
                  to={{
                    pathname: `movie/${movie.id}`,
                    state: { from: location },
                  }}
                >
                  {movie.original_title}
                </Link>
              </li>
            );
          })}
        </ul>}
                    
    </div>)

};

  //  useEffect(() => {
  //   if (searchRequest === '') {
  //     return setError('Please enter something...');
  //   }  
  //   setStatus('pending');
  //   fetchTrending()
  //     .then((movies) => {
  //       console.log(movies);
  //       if (movies.total_results !== 0) {
  //         setStatus('resolved');
  //         setMovies(movies.results);
  //       } else {
  //         setStatus('rejected')
  //         setError('Nothing found...')
  //       }
  //     })
  //     .catch(error => {
  //         setError(error);
  //         setStatus('rejected');
  //     })
  //  }, [searchRequest]);


  // const handleSubmit = (searchRequest, page) => {
  //   setSearchRequest(searchRequest);
  //   setMovies([]);
  // }