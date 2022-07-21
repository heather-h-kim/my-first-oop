import React, {useState, useEffect} from 'react';
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

 
 const handleSubmit = (event) => {
  event.preventDefault();
  const result = {
    guest: guestList[guestId-1],
    hotel: companyList[companyId-1],
    template: templateList[templateId-1]
  }

  console.log('result is', result);
  
  
   axios.post('/messages', result)
   .then((res) => {
    console.log(res.data);
    setGeneratedMessage(res.data);
   }).catch((error) => {
    console.log(error);
   });

   
  }


  console.log('message is', generatedMessage);
  

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
      <button type='submit'>Submit</button>

      </form>

      <h2>Generated Message</h2>
      <p>{generatedMessage}</p>
    </div>
  );
}

export default App;
