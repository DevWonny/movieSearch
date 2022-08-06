import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './view/Main';
import Detail from './view/Detail';
import Search from './view/Search';
import Loading from './components/common/Loading';
import Footer from './components/common/Footer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
