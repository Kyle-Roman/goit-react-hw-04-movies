// import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as API from "../Services/Api";
import s from "./Reviews.module.css";

export default function Reviews({movieId}) {
  const [reviews, setReviews] = useState(null);
  // const { movieId } = useParams();

  useEffect(() => {
    API.fetchMovieReviews(movieId).then((res) => {
      setReviews(res.results);
    });
  }, [movieId]);

  return (
    <div>
      {reviews && (
        <ul className={s.list}>
          {reviews.map((review) => {
            return (
              <li key={review.id}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}