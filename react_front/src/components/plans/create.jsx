import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlanContext } from './planContext';
import "./create.css"

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
          'authorization': localStorage.getItem('token')
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
    <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <center>
            <h1>New plan</h1>
          </center>
            <div className="outerCard">
              
                <div className="card">
                    <div>
                    <div className="input-container">
                            <input
                                id="planName"
                                type="text"
                                placeholder="Enter Plan Name"
                                value={planName}
                                onChange={(e) => setPlanName(e.target.value)}
                                className="input-field"
                            />
                            <label htmlFor="planName" className="input-label">Plan Name:</label>
                            <span className="input-highlight"></span>
                        </div>
                        <div className="input-container">
                            <input
                                id="price"
                                type="text"
                                placeholder="Enter Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="input-field"
                            />
                            <label htmlFor="price" className="input-label">Price:</label>
                            <span className="input-highlight"></span>
                        </div>
                        
                        <div className="input-container">
                            <input
                                id="duration"
                                type="text"
                                placeholder="Enter Duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="input-field"
                            />
                            <label htmlFor="duration" className="input-label">Duration:</label>
                            <span className="input-highlight"></span>
                        </div>
                        
                        <div className="input-container">
                            <input
                                id="devices"
                                type="text"
                                placeholder="Enter Devices"
                                value={devices}
                                onChange={(e) => setDevices(e.target.value)}
                                className="input-field"
                            />
                            <label htmlFor="devices" className="input-label">Devices:</label>
                            <span className="input-highlight"></span>
                        </div>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                          <button className="headerButton" onClick={() => { Navigate("/plans") }}>Back</button>
                          <button className='headerButton' type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
}

export default Create;
