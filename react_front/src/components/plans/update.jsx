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
        <button className="edit-button" onClick={() => { Navigate(navi) }}>
        <svg className="edit-svgIcon" viewBox="0 0 512 512">
        <path d= {svg}>
        </path>
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
        try {
            if (isAuthen()=="true")
            {
                Navigate("/login");
            }
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
        } catch (error) {
            console.error('Error updating plan:', error);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="planName">Plan Name:</label>
            <input
                id="planName"
                type="text"
                placeholder="Enter Plan Name"
                value={planData.planName}
                onChange={(e) => setPlanData({...planData, planName: e.target.value})}
            />
            <br/>
            <label htmlFor="price">Price:</label>
            <input
                id="price"
                type="text"
                placeholder="Enter Price"
                value={planData.price}
                onChange={(e) => setPlanData({...planData, price: e.target.value})}
            />
            <br/>
            <label htmlFor="duration">Duration:</label>
            <input
                id="duration"
                type="text"
                placeholder="Enter Duration"
                value={planData.duration_in_years}
                onChange={(e) => setPlanData({...planData, duration_in_years: e.target.value})}
            />
            <br/>
            <label htmlFor="devices">Devices:</label>
            <input
                id="devices"
                type="text"
                placeholder="Enter Devices"
                value={planData.devices}
                onChange={(e) => setPlanData({...planData, devices: e.target.value})}
            />
            <br/>
            <button type="submit">Submit</button>
        </form>
    );
}
