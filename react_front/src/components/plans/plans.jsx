import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import './plans.css';
import Delete from './delete.jsx';
import { UpdateButton } from './update.jsx';
import { PlanContext } from './planContext';
import { Header } from '../header.jsx';
import isAuthen from '../authentication/isAuth';
import {AddFeatureButton} from '../features/add.jsx'
import { handleDeleteFeature } from '../features/delete.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export function Plan() {
    const { plans } = useContext(PlanContext);
    const Navigate = useNavigate();

    function handleNewPlanClick() {
        if (isAuthen() === "true") {
            Navigate("/plans/new");
        } else {
            Navigate("/login");
        }
    }

    return (
        <>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'right', margin: '0px 30px 0px 0px' }}>
                <button className="Button" onClick={handleNewPlanClick}>New Plan</button>
            </div>
            {plans.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <p>No plans available</p>
                </div>
            ) : (
                <div>
                    {chunkArray(plans, 4).map((chunk, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-around' }}>
                            {chunk.map(plan => (
                                <PlanDiv
                                    key={plan.id}
                                    id={plan.id}
                                    planName={plan.planName}
                                    price={plan.price}
                                    duration={plan.duration_in_years}
                                    devices={plan.devices}
                                    features = {plan.features}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

function PlanDiv({ id, planName, price, duration, devices ,features}) {
    const Navigate = useNavigate();
    const { setPlans } = useContext(PlanContext);

    return (
        <div className='planCard'>
            <center>
                <h1 className='capitalize'>{planName}</h1>
                <h3>Price  ${price}</h3>
                <h4>Duration  {duration}</h4>
                <h4>Devices  {devices}</h4>
                <h4>Features</h4>
                
                {features.length==0 ? (
                    <p>No features added...</p>
                ) : (
                    <>
                        {features.map(feature => (
                            <p key={feature.id}>
                            {feature.feature_desc}
                            <button
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0',
                                marginLeft: '10px',
                                color: 'white',
                              }}
                              onClick={() => handleDeleteFeature(id,feature.id,setPlans)}
                            >
                                <FontAwesomeIcon icon={faTrash} />

                            </button>
                          </p>
                        ))}
                    </>
                )}

                <AddFeatureButton id={id}></AddFeatureButton>
                
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Delete id={id}></Delete>
                    <UpdateButton id={id}></UpdateButton>
                </div>
            </center>
        </div>
    );
}


function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}
