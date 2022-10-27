import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import searchGoogle from "../../services/googleSearch";
import tp from "../../apiResults/google.json"
import Card from "./Card";

const Result = () => {

    const {state} = useLocation();
    const [result, setResult] = useState([])

    
    
    

    useEffect(() => {
        const {engines} = state;
        if(engines?.google){
            test();
        }
    },[state]);

    const test = async () => {
        setResult(tp.organic_results);
        
    }

    
    
    

    console.log(result)
    return (<div>
        {result.map((ele)=>
            
                
            <Card/>
                    

                

            
            
            
            )}
    </div>)
}

export default Result;