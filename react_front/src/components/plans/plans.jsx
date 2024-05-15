import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './plans.css';
import Delete from './delete.jsx';
import {UpdateButton} from './update.jsx';
import { PlanContext } from './planContext';

export function Plan() {
  const { plans } = useContext(PlanContext);
  const Navigate = useNavigate();
  return (
    <>
      <button onClick={() => { Navigate("/plans/new") }}>New Plan</button>
      {plans.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>No plans available</p>
        </div>
        
      ) :(<div style={{ display: 'flex', justifyContent: 'space-around' }}>
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
    )}
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
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Delete id={id} ></Delete>
          <UpdateButton id={id} ></UpdateButton>
        </div>

      </center>
    </div>
  );
}




