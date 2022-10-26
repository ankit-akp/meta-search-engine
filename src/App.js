import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './app/components/Home/Homepage';
import Result from './app/components/Result/Result';

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Homepage/>} />
        <Route path='/result' element={<Result/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
