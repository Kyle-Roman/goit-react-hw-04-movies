const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=a133e5eaa98d9ee882329412325a3096';

async function fetchMovies(url = "") {
    const res = await fetch(url);
    return res.ok
        ? await res.json()
        : Promise.reject(new Error("Server collapse..."));
}

export function fetchTrending() {
    return fetchMovies(`${BASE_URL}/trending/movie/day?${API_KEY}`)
};

export function fetchMovieDetails(movieId) {
    return fetchMovies(`${BASE_URL}/movie/${movieId}?${API_KEY}`)
};

export function fetchMovieCredits(movieId) {
    return fetchMovies(`${BASE_URL}/movie/${movieId}/credits?${API_KEY}`)
};

export function fetchMovieReviews(movieId) {
    return fetchMovies(`${BASE_URL}/movie/${movieId}/reviews?${API_KEY}`)
};

export function fetchMovieBySerch(search) {
    return fetchMovies(`${BASE_URL}/search/movie?${API_KEY}&query=${search}`)
};