import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactComponentTable from './react_component_table';

function App() {
  return (
    <div>
      <ReactComponentTable values = {[{id: 1, name: "Ankit", email: "dfd", address: "dfds",  bio: "dfd", image: "df"}]}
                           columns = {["name","email","address"]} 
      />
    </div>
  );
}

export default App;
