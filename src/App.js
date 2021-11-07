import {lazy, Suspense} from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadingView from './Components/Loader/Loader';
import Navigation from './Components/Navigation/Navigation';
import NoPageView from './Components/NoPageView/NoPageView';

import s from './App.module.css'

const Homepage = lazy(() => import('./Components/Homepage/Homepage' /* webpackChunkName: "homepage" */));

const MoviesPage = lazy(() => import('./Components/MoviesPage/MoviesPage' /* webpackChunkName: "movies_page" */));

const MovieDetailsPage = lazy(() => import('./Components/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movies_details_page" */));

function App() {
  return (
    <div className={s.container}>
     <Navigation />
      <Suspense fallback={<LoadingView />}>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/movie/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route exact path="/movies">
            <MoviesPage />
          </Route>
          <Route>
            <NoPageView />
          </Route>
        </Switch> 
      </Suspense>       
    </div>
  );
}

export default App;
