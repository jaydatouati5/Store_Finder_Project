import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import DisplayAll from './components/DisplayAll';
import StoreForm from './components/StoreForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import StoreDetails from './components/StoreDetails';



function App() {
    const [stores, setStores] = useState([])

    useEffect(() => {
      axios.get('http://localhost:8000/api/store')
      .then(res => setStores(res.data))
      .catch(err => console.error(err))
  } , [])

    return (
    <div className="container">
      <Routes>
        <Route path='/' element={<DisplayAll stores={stores} setStores={setStores}/>}/>
        <Route path='/stores/add' element={<StoreForm stores={stores} setStores={setStores} type="create"/>}/>
        <Route path='/stores/edit/:id' element={<StoreForm stores={stores} setStores={setStores} type="update"/>}/>
        <Route path='/stores/:id' element={<StoreDetails />}/>
      </Routes>
    </div>
  );
}

export default App;
