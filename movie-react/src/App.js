import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import NaverMovieAPI from './api/NaverMovieAPI';
import MovieAPI from './api/MovieAPI';

function App() {
  useEffect(() => {
    MovieAPI();
    NaverMovieAPI('아이언 맨');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
