import randomWords from "random-words";
import { useState, useCallback } from "react";
import PropTypes from 'prop-types';
import "../../index.css";

const RandomWords = ( { handleSelection } ) => {
  const [words, setWords] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const generateWords = useCallback(() => {
    const randomWordsArray = randomWords({ exactly: 10, wordsPerString: 1 });
    setWords(randomWordsArray);
  });

  const handleSelect = (event) => {
    const word = event
    handleSelection(word)
  }

  return (
    <div>
      {
        words.length < 1 && (
          <div className="buttons">
            <button onClick={generateWords} className="btn">
              Need inspiration...
            </button>
          </div>
          )
      }
      {
          words.length > 1 && (
            <div className="buttons">
              <span className="tags-text">Try this ➡️</span>
              <span className="tags">
                {
                  words.map((word, index) => (
                  <span key={index} className="tag" onClick={() => handleSelect(word)}> { word } </span>))
                }
              </span>
              <button onClick={generateWords} className="btn">➕ more ideas</button>
            </div>
          )
      }

      
    </div>
  );
};

RandomWords.propTypes = {
  handleSelection: PropTypes.func.isRequired
}

export default RandomWords;
