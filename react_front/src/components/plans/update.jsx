import { useNavigate, useParams } from 'react-router-dom';
import './update.css';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';


export function UpdateButton({id})
{
    const Navigate = useNavigate();
    const navi = `/plans/${id}/edit`
    return(
        <button className="edit-button" onClick={() => { Navigate(navi) }}>
        <svg className="edit-svgIcon" viewBox="0 0 512 512">
        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
        </path>
        </svg>
        </button>
    )
}


export function Update() {  
    const { id } = useParams();

    const [planData, setPlanData] = useState({
        planName: '',
        price: '',
        duration_in_years: '',
        devices: ''
    });

    useEffect(() => {
        try {
            const url = `http://localhost:18185/plans/${id}/edit`;
            axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpcmVldGlAZ21haWwuY29tIiwiaWF0IjoxNzE1NzY5MjM4LCJleHAiOjE3MTU3ODcyMzh9.7UtIdImhjbYfHATx5IFQxgFlAdwuOzs6X5ia0-eEjhE'
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

    function handleSubmit(event) {
        event.preventDefault();
        
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
