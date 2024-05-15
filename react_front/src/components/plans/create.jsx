import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlanContext } from './planContext';



function Create() {
  const { plans,setPlans } = useContext(PlanContext);
  const Navigate = useNavigate();

  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [devices, setDevices] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const planData = {
      planname: planName,
      price: price,
      duration: duration,
      devices: devices
    };
    try {
      const response = await axios.post('http://localhost:18185/plans/new', planData, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpcmVldGlAZ21haWwuY29tIiwiaWF0IjoxNzE1NzY5MjM4LCJleHAiOjE3MTU3ODcyMzh9.7UtIdImhjbYfHATx5IFQxgFlAdwuOzs6X5ia0-eEjhE'
        }
        ,body: JSON.stringify(planData)
      });
      if (response.data.success=="true")
      {
        setPlans([...plans,{
          id : response.data.id,
          planName: planName,
          price: price,
          duration_in_years: duration,
          devices: devices,
          features : []
        }])
        alert(response.data.message);
        Navigate("/plans")
      }
      else if(response.data.success=="false")
      {
        alert(response.data.message);
      }
      else if (response.data.success=="error")
      {
        let errorJson= response.data.error 
        for (let key in errorJson) {
          alert(`${errorJson[key]}`);
      }
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="planName">Plan Name:</label>
      <input
        id="planName"
        type="text"
        placeholder="Enter Plan Name"
        value={planName}
        onChange={(e) => setPlanName(e.target.value)}
      />
      <br/>
      <label htmlFor="price">Price:</label>
      <input
        id="price"
        type="text"
        placeholder="Enter Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br/>
      <label htmlFor="duration">Duration:</label>
      <input
        id="duration"
        type="text"
        placeholder="Enter Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <br/>
      <label htmlFor="devices">Devices:</label>
      <input
        id="devices"
        type="text"
        placeholder="Enter Devices"
        value={devices}
        onChange={(e) => setDevices(e.target.value)}
      />
      <br/>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Create;
