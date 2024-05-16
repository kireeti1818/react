// PlanContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await axios.get("http://localhost:18185/plans/");
        if (response.data.success==="true")
        {
          setPlans(response.data.response);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    }
    fetchPlans();
  }, []);

  return (
    <PlanContext.Provider value={{ plans,setPlans }}>
      {children}
    </PlanContext.Provider>
  );
};
