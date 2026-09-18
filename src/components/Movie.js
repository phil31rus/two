import "./Movie.css";

function Movie(props) {
    const { Title, Year, Type, Poster } = props;

    return (
        <div className="card">
            {
                Poster === "N/A" ? <img src="https://placehold.co/300x444/silver/silver" alt="" /> : <img src={Poster} alt="" />
            }

            <div>
                <h3>{Title}</h3>
                <p>{Year} <span>{Type}</span></p>
            </div>
        </div>
    )
}

export default Movie;