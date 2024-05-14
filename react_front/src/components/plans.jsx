import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Plan() {
  const [plans, setPlans] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await axios.get("http://localhost:18185/plans/");
        setPlans(response.data.response);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    }
    fetchPlans();
  }, []); 

  return (
    <>
      <button onClick={()=>{Navigate("/new")}}>New Plan</button>
      <div style={{display:'flex', justifyContent:'space-around'}}>
        {plans.map(plan => (
          <PlanDiv 
            key={plan.id} 
            id={plan.id} 
            planName={plan.planName} 
            price={plan.price} 
            duration={plan.duration_in_years} 
          />
        ))}
      </div>
    </>
  );
}

function PlanDiv({ id, planName, price, duration }) {
  return (
    <div>
      <center>
        <h1>{id}</h1>
        <h2>name {planName}</h2>
        <h3>price {price}</h3>
        <h4>duration {duration}</h4>
      </center>
    </div>
  );
}



export function Create() {
  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const planData = {
      planName: planName,
      price: price,
      duration: duration
    };
    fetch('http://localhost:18185/plans/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(planData)
    }).then(response => {
      alert("plan added")
    }) 
    .catch(error => {
      alert("error added")
    });
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

      <label htmlFor="price">Price:</label>
      <input
        id="price"
        type="text"
        placeholder="Enter Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label htmlFor="duration">Duration:</label>
      <input
        id="duration"
        type="text"
        placeholder="Enter Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
