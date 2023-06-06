import axios from "axios";
import { useEffect, useRef, useState, useCallback } from "react";
import "./index.css";
import { Form, Button } from "react-bootstrap";
import RandomWords from "./Components/WordGenerator/RandomWords";

const API_URL = "https://api.unsplash.com/search/photos";
const API_KEY = import.meta.env.VITE_API_KEY;
const IMAGES_PER_PAGE = 15;

function App() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const resetSearch = () => {
    setPage(1);
    fetchImages();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    resetSearch();
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    resetSearch();
  };

  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        setErrorMessage("");
        const { data } = await axios.get(
          `${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${API_KEY}`
        );
        setImages(data.results);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      setErrorMessage("Error fetching images. Try again later.");
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <>
      <div className="container">
        <h1 className="title">Image Searcher 🔍</h1>
        <div className="search-section">
          <Form onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Type an idea..."
              className="search-input"
              ref={searchInput}
            />
          </Form>
        </div>
        {errorMessage && <p className="error-msg"> {errorMessage} </p>}
        <div>
          <RandomWords handleSelection={ handleSelection }/>
        </div>
        <div className="container">
          <ul>
            {images.map((image) => (
              <li key={image.id}>
                <img
                  src={image.urls.small}
                  alt={image.alt_description}
                  className="image"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="buttons">
          {page > 1 && (
            <Button onClick={() => setPage(page - 1)}>Previous</Button>
          )}
          {page < totalPages && (
            <Button onClick={() => setPage(page + 1)}>Next</Button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
