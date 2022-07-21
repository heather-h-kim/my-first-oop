import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [guestList, setGuestList] = useState([]);
  const [guestId, setGuestId] = useState('');
  const [companyList, setCompanyList] = useState([]);
  const [companyId, setCompanyId] = useState('');
  const [templateList, setTemplateList] = useState([]);
  const [templateId, setTemplateId] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [templateMessage, setTemplateMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Fetch guests to select from
  const getGuests = () => {
    console.log('in getGuests');
    axios.get('/guests')
      .then((res) => {
        console.log('response.data is', res.data);
        setGuestList(res.data);
      }).catch((error) => {
        console.log('error getting guests', error);
      })
  }

  //Fetch hotels to select from
  const getCompanies = () => {
    console.log('in getCompanies');
    axios.get('/companies')
      .then((res) => {
        console.log('response.data is', res.data);
        setCompanyList(res.data);
      }).catch((error) => {
        console.log('error getting companies');
      })
  }

  //Fetch template messages to select from
  const getTemplates = () => {
    console.log('in getTemplates');
    axios.get('/templates')
      .then((res) => {
        console.log('response.data is', res.data);
        setTemplateList(res.data);
      }).catch((error) => {
        console.log('error getting templates');
      })
  }

  useEffect(() => {
    getGuests();
    getCompanies();
    getTemplates();
  }, [])


  //Send the selected guest, hotel and template message to the server so that the message can be generated on the server
  const handleSubmit = (event) => {
    event.preventDefault();
    const result = {
      guest: guestList[guestId - 1],
      hotel: companyList[companyId - 1],
      template: templateList[templateId - 1]
    }

    axios.post('/messages', result)
      .then((res) => {
        console.log(res.data);
        setGeneratedMessage(res.data);
      }).catch((error) => {
        console.log(error);
      });

  }

  //Send the added template message to the server so that the new template can be added to the dropdown menu
  const addTemplate = (event) => {
    event.preventDefault();

    const result = {
      type: messageType,
      message: templateMessage
    }

    axios.post('/templates', result)
      .then((res) => {
        console.log(res.status);
        getTemplates();
      }).catch((error) => {
        console.log(error);
      });

    setTemplateMessage('');

  }


  return (
    <div className="App">
      <h1> Message Generator </h1>
      <form onSubmit={handleSubmit}>
        <label> Select Guest
          <select
            value={guestId}
            onChange={(event) => {
              setGuestId(event.target.value);
            }}>
            <option>select</option>
            {guestList.map(guest => (
              <option key={guest.id} value={guest.id}> {guest.firstName} {guest.lastName} </option>
            ))}
          </select>
        </label>

        <label> Select Company
          <select
            value={companyId}
            onChange={(event) => {
              setCompanyId(event.target.value);
            }}>
            <option>select</option>
            {companyList.map(company => (
              <option key={company.id} value={company.id}> {company.company} </option>
            ))}
          </select>
        </label>

        <label> Select Template
          <select
            value={templateId}
            onChange={(event) => {
              setTemplateId(event.target.value);
            }}>
            <option>select</option>
            {templateList.map(template => (
              <option key={template.id} value={template.id}> {template.type} </option>
            ))}
          </select>
        </label>

        <br></br>
        <br></br>
        <button type='submit'>Submit</button>

      </form>

      <h2>Generated Message</h2>
      <p>{generatedMessage}</p>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <form onSubmit={addTemplate}>
        <label>Add template message:
          <textarea
            rows="5"
            cols="100"
            placeholder="Use placeholder instead of guest name, hotel name and room number using curly braces({}). The placeholders should be {hotelName} for hotel name and {roomNumber} for room number. Ex) Hope you enjoyed your stay at {hotelName}."
            value={templateMessage}
            onChange={(event) => setTemplateMessage(event.target.value)}
          />
        </label>
        <br></br>
        <label>Add message type: 
          <textarea
            rows="1"
            cols="30"
            placeholder="Specify the message category."
            value={messageType}
            onChange={(event) => setMessageType(event.target.value)}
          />
        </label>
        
        <br></br>
        <br></br>
        <button type='submit'> Add </button>
      </form>

    </div>
  );
}

export default App;
