import { useNavigate, useParams } from 'react-router-dom';
import './update.css';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { PlanContext } from './planContext';
import { editSVG } from '../svg/svgbuttons';

import isAuthen from '../authentication/isAuth'


export function UpdateButton({id})
{
    const Navigate = useNavigate();
    const navi = `/plans/${id}/edit`
    const svg = editSVG();
    return(
        <button className="edit-button" title="Update Feature" onClick={() => { Navigate(navi) }}>

        <svg viewBox="0 0 512 512" className="edit-svgIcon" >
        <path d={svg} />
        </svg>
        </button>
    )
}


export function Update() {  
    const { plans, setPlans } = useContext(PlanContext);
    const Navigate = useNavigate();
    const { id } = useParams();
    const [planData, setPlanData] = useState({
        planName: '',
        price: '',
        duration_in_years: '',
        devices: ''
    });

    useEffect(() => {
        try {
            if (isAuthen()=="false")
            {
                Navigate("/login");
            }
            const url = `http://localhost:18185/plans/${id}/edit`;
            axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                }
            }).then(response => {
                if (response.data.success === "true") {
                    const { planName, price, duration_in_years, devices } = response.data.response;
                    setPlanData({
                        planName: planName,
                        price: price,
                        duration_in_years: duration_in_years,
                        devices: devices
                    });
                }
            });
        } catch (error) {
            console.error('Error fetching plan:', error);
        }
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        try 
        {
            if (isAuthen()=="false")
            {
                Navigate("/login");
            }
            else{

                const url = `http://localhost:18185/plans/${id}/edit`;
                const response = await axios.put(url, {
                    planname : planData.planName,
                    devices : planData.devices.toString(),
                    duration : planData.duration_in_years.toString(),
                    price : planData.price.toString()
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    }
                });
        
                if (response.data.success == "true")
                {
                    console.log(planData.planName,planData.price, planData.duration_in_years,planData.devices)
                    setPlans(prevPlans => prevPlans.map(plan =>  
                        plan.id == id ? { 
                            id,
                            "planName": planData.planName, 
                            "price" : planData.price, 
                            "duration_in_years": planData.duration_in_years, 
                            "devices": planData.devices,
                            "features" : plan.features
                        } : plan

                    ));
                                
                    alert(response.data.message)
                    
                    console.log(plans)  
                    Navigate("/plans")
                }
                else if (response.data.success == "false")
                {
                    alert(response.data.message)
                    Navigate("/plans")
                }
                else if (response.data.success == "error")
                {
                    alert(response.data.message)
                    Navigate("/plans")
                }
            }
        } catch (error) {
            console.error('Error updating plan:', error);
        }
        

    }
    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <center>
                <h1>Edit plan</h1>
              </center>
                <div className="outerCard">
                    <div className="card">
                        <div>
                            <div className="input-container">
                                <input
                                    id="planName"
                                    type="text"
                                    placeholder="Enter Plan Name"
                                    value={planData.planName}
                                    onChange={(e) => setPlanData({...planData, planName: e.target.value})}
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
                                    value={planData.price}
                                    onChange={(e) => setPlanData({...planData, price: e.target.value})}
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
                                    value={planData.duration_in_years}
                                    onChange={(e) => setPlanData({...planData, duration_in_years: e.target.value})}
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
                                    value={planData.devices}
                                    onChange={(e) => setPlanData({...planData, devices: e.target.value})}
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
