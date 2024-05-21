import React, { useContext } from 'react';
import axios from 'axios';
import { PlanContext } from './planContext';
import isAuthen from '../authentication/isAuth'
import { useNavigate } from 'react-router-dom';
import { deleteSVG1, deleteSVG2 } from '../svg/svgbuttons';


function Delete({ id }) {
  const { setPlans } = useContext(PlanContext);
  const Navigate = useNavigate();
  const handleDelete = async () => {
    try {
      if (isAuthen()=="false")
      {
        Navigate("/login");
      }
      const url = `http://localhost:18185/plans/${id}`;
      const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': localStorage.getItem('token')
        }
      });

      if(response.data.success==="true")
      {
        setPlans(prevPlans => prevPlans.filter(plan => plan.id !== id));
        alert(response.data.message)
      }
      else{
        alert(response.data.message)
      }

    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };
  let svg1 = deleteSVG1()
  let svg2 = deleteSVG2()

  return (
    <button className="button" title="Delete Feature" onClick={handleDelete}>
      
      <svg
            fill="none"
            viewBox="0 0 69 14"
            className="svgIcon bin-top"
          >
            <g clipPath="url(#clip0_35_24)">
              <path
                fill="black"
                d= {svg1}
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_35_24">
                <rect fill="white" height="14" width="69"></rect>
              </clipPath>
            </defs>
          </svg>

          <svg
            fill="none"
            viewBox="0 0 69 57"
            className="svgIcon bin-bottom"
          >
            <g clipPath="url(#clip0_35_22)">
              <path
                fill="black"
                d={svg2}
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_35_22">
                <rect fill="white" height="57" width="69"></rect>
              </clipPath>
            </defs>
          </svg>
    </button>
  );
}

export default Delete;


