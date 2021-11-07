import { useEffect, useState } from "react";
import * as API from '../Services/Api'
import noPoster from '../../noimage.png'

import s from './Cast.module.css'

const IMG_URL = 'https://image.tmdb.org/t/p/w300';

export default function Cast({ movieId }) {
   const [cast, setCast] = useState(null);

   useEffect(() => {
      API.fetchMovieCredits(movieId).then(res => setCast(res.cast))
   }, [movieId])

   return (
      <div className={s.container}>
      {cast && (
        <ul className={s.list}>
          {cast.map((cast) => {
            return (
              <li className={s.listItem} key={cast.id}>
                  {cast.profile_path
                     ? (<img src={`${IMG_URL}${cast.profile_path}`} alt={cast.name} width="120px" />)
                     : (<img src={noPoster} alt={cast.name} width="120px"></img>)}
                <h4 className={s.name}>{cast.name}</h4>
                <p className={s.text}>Character: {cast.character}</p>
              </li>
            );
          })}
        </ul>
      )}
      </div>
   );
}