import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { db } from "./config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);

  //New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleasedDate, setNewReleasedDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(true);

  const moviesCollectionRef = collection(db, "movies");
  const getMovieList = async () => {
    // READ THE DATA
    // SET THE MOVIE LIST
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleasedDate,
        receivedAnOscar: isNewMovieOscar,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Auth />
      <div>
        <input
          placeholder="Movie Title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Released Date..."
          type="number"
          onChange={(e) => setNewReleasedDate(Number(e.target.value))}
        />
        <input
          type={"checkbox"}
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label> Received An Oscar </label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
