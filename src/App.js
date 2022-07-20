import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
 const [guestList, setGuestList] = useState([]);
 const [guestId, setGuestId] = useState('');
 const getGuests = () => {
  console.log('in getGuests');
   axios.get('/guests')
   .then((res) => {
    console.log('response.data is', res.data);
    setGuestList(res.data);
   }).catch((error) => {
    console.log('error getting guests');
    
   })
 }

 useEffect(() => {
  getGuests();
 }, [])

 console.log('guestList is', guestList);
 

  return (
    <div className="App">
      <h1> Message Generator </h1>
      <label> Select Guest 
      <select
        value={guestId}
        onChange={(event) => {
          setGuestId(event.target.value);
        }}>
        {guestList.map(guest => (
          <option key={guest.id} value={guest.id}>{guest.firstName} {guest.lastName}</option>
        ))}
      </select>
      </label>
      <h2> Companies </h2>
      <h2> Templates </h2>

    </div>
  );
}

export default App;
