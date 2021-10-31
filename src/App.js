import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import {fetchTrending} from './Components/Services/Api';

import ErrorView from './Components/ErrorView/ErrorView';
import LoadingView from './Components/Loader/Loader';
import MoviesPage from './Components/MoviesPage/MoviesPage';
import Searchbar from './Components/Searchbar/Searchbar';
import Navigation from './Components/Navigation/Navigation';
import Homepage from './Components/Homepage/Homepage';
import NoPageView from './Components/NoPageView/NoPageView';

import s from'./App.css';

function App() {
  const [searchRequest, setSearchRequest] = useState('');
  // const [page, setPage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  // const [button, setButton] = useState(false);

   useEffect(() => {
    if (searchRequest === '') {
      return setError('Please enter something...');
    }  
    setStatus('pending');
    fetchTrending()
      .then((movies) => {
        console.log(movies);
        if (movies.total_results !== 0) {
          setStatus('resolved');
          setMovies(movies.results);
        } else {
          setStatus('rejected')
          setError('Nothing found...')
        }
      })
      .catch(error => {
          setError(error);
          setStatus('rejected');
      })
   }, [searchRequest]);


  const handleSubmit = (searchRequest, page) => {
    setSearchRequest(searchRequest);
    setMovies([]);
  }

  return (
    <div>
    <Searchbar onSubmit={handleSubmit} />
      <Navigation />
      {status === 'idle' && <div className={s.starter}>
        <Switch>
          <Route exact path="/">
            <Homepage/>
          </Route>
          <Route exact path="/movies">
            <MoviesPage movies={movies} />
          </Route>
          <Route>
            <NoPageView />
          </Route>
        </Switch>        
      </div>}
     {status === 'pending' && <LoadingView />}
     {status === 'rejected' && <ErrorView message={error} />}
     
     {/* {button && <Button onClick={handleBtnClick} />} */}
    </div>
  );
}

export default App;
