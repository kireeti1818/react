import axios from "axios";



export async function handleDeleteFeature(id,featuerId,setPlans) 
{
    try {
        let url = "http://localhost:18185/plans/features/"+featuerId;
        const response = await axios.delete(url,{
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
              }
            }
        );
        if(response.data.success=="true")
        {
            setPlans(prevPlans => {
                const updatedPlans = prevPlans.map(plan => {
                    if (plan.id === parseInt(id)) {
                        return {
                            ...plan,
                            features: plan.features.filter(feature => feature.id !== featuerId)
                        };
                    }
                    return plan;
                });
                return updatedPlans;
            });
            alert(response.data.message)
        }
        else
        {
            alert(response.data.message)
        }
        
    }
    catch(e){
        alert("error"+e)
    }
}