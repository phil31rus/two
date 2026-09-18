import "./Movie.css";

function Movie(props) {
    const title = props.Title;
    const year = props.Year;
    const type = props.Type;
    const poster = props.Poster;

    let typeNaRusskom = "";

    if (type === "movie") {
        typeNaRusskom = "Фильм";
    } else if (type === "series") {
        typeNaRusskom = "Сериал";
    } else if (type === "game") {
        typeNaRusskom = "Игра";
    } else {
        typeNaRusskom = type;
    }

    let kartinka = "";

    if (poster === "N/A") {
        kartinka = <img src="https://placehold.co/300x444/e0e0e0/666?text=Нет+постера" alt="Нет постера" />;
    } else {
        kartinka = <img src={poster} alt={title} />;
    }

    return (
        <div className="card">
            {kartinka}

            <div>
                <h3>{title}</h3>
                <p>{year} <span>{typeNaRusskom}</span></p>
            </div>
        </div>
    )
}

export default Movie;