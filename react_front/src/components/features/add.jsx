import { useNavigate, useParams } from 'react-router-dom';
import './add.css'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import isAuthen from "../authentication/isAuth"
import {PlanContext} from "../plans/planContext"
export function AddFeatureButton({id})
{
    const Navigate = useNavigate();
    const navi = `/plans/features/${id}/new`
    function handleAddFeatureSubmit()
    {
        if (isAuthen()=="true")
        {
            Navigate(navi);
        }
        else{
            Navigate("/login");
        }
        
    }
    return(
        <>
            <button 
            className="plus-button" title="Add New Feature" 
            onClick={handleAddFeatureSubmit}>
                <span className="plus-icon">+</span>
            </button>
        </>
    )

}


export function AddFeature() {
    const { setPlans } = useContext(PlanContext);
    const [feature,setFeature] = useState('');
    const { id } = useParams(); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = "http://localhost:18185/plans/features/"+id+"/new"
        try {
            if (isAuthen()=="false")
            {
                navigate("/login");
            }
            else{
                const response = await axios.post(url, {"feature" : feature}, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                }
                })
                if (response.data.success === "true") {
                    alert(response.data.message);
                    const newFeature = {
                        id: response.data.id,
                        plan_id: id,
                        feature_desc: feature
                    };
                    setPlans(prevPlans => {
                        const updatedPlans = prevPlans.map(plan => {
                            if (plan.id === parseInt(id)) {
                                return {
                                    ...plan,
                                    features: [...plan.features, newFeature]
                                };
                            }
                            return plan;
                        });
                        return updatedPlans;
                    });
                    navigate("/plans");
                }
                else if (response.data.success=="false")
                {
                    alert(response.data.message);
                }
                else if(response.data.success=="error")
                {
                    alert(response.data.message);
                    navigate("/plans");
                }
            }
        }
        catch(e)
        {
            console.log("erro "+e)
        }
    }

    return (
        <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <center>
            <h1>New feature</h1>
          </center>
            <div className="outerCard">
                <div className="card">
                    <div className="input-container">
                        <input
                            id="feature"
                            type="text"
                            placeholder="Enter feature"
                            value={feature}
                            onChange={(e) => setFeature(e.target.value)}
                            className="input-field"
                        />
                                <label htmlFor="feature" className="input-label">Feature:</label>
                              <span className="input-highlight"></span>
                        </div>
                       
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                          <button className="headerButton" onClick={() => { navigate("/plans") }}>Back</button>
                          <button className='headerButton' type="submit">Submit</button>
                        </div>
                </div>
            </div>
        </form>
    </div>
        
    );
}
