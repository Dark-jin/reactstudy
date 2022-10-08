import ProTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({id, coverImg, title, summary, genres}) {
    return (
        <div>
            <img src={coverImg} alt={title}/>
            <h2>
              <Link to ={`/movie/${id}`}>{title}</Link>
            </h2>
            <p>{summary}</p>
            <ul>
              {genres.map((g)=>(
                <li key={g}>{g}</li>
              ))}
            </ul>
        </div>
    );
}

Movie.proTypes = {
    id:ProTypes.number.isRequired,
    coverImg: ProTypes.string.isRequired,
    title: ProTypes.string.isRequired,
    summary: ProTypes.string.isRequired,
    genres: ProTypes.arrayOf(ProTypes.string).isRequired,
};

export default Movie;