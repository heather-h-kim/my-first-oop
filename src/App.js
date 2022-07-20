import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
 console.log('in App');
 const getGuests = () => {
  console.log('in getGuests');
   axios.get('/guests')
   .then((res) => {
    console.log('response.data is', res.data);
    
   }).catch((error) => {
    console.log('error getting guests');
    
   })
 }

 useEffect(() => {
  getGuests();
 }, [])

  return (
    <div className="App">
      <h1> Message Generator </h1>
      <h2> Guests </h2>
      <h2> Companies </h2>
      <h2> Templates </h2>

    </div>
  );
}

export default App;
