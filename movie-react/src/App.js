import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './view/Main';
import Detail from './view/Detail';
import Footer from './components/common/Footer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:title" element={<Detail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
