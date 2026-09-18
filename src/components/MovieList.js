import Movie from "./Movie";
import "./MovieList.css";

function MovieList(props) {
    let movies = props.movies;

    if (movies === undefined) {
        movies = [];
    }

    if (movies.length === 0) {
        return (
            <div className="movies">
                <h4>Ничего не найдено</h4>
            </div>
        );
    }

    return (
        <div className="movies">
            {
                movies.map(function (movie) {
                    return <Movie key={movie.imdbID} {...movie} />;
                })
            }
        </div>
    )
}

export default MovieList;