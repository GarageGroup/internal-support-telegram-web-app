import React, { } from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import UpdateSupportForm from './components/UpdateSupportForm/UpdateSupportForm';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={'updateSupportForm'} element={<UpdateSupportForm />} />
      </Routes>
    </div>
  );
}

export default App;