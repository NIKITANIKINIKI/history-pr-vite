import React, {useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./App.scss";
import "swiper/css";
import SwipperBlock from "./components/SwipperBlock";
import CircleBlock from "./components/CircleBlock";
// import {data} from './mokky-data'

const App: React.FC = () => {
 
  const [data, setData]=useState<Timeline>([])
  const [curentPeriod, setCurentPeriod] = useState<number>(1);
  const [currentData, setCurrentData] = useState<number>(0);

  interface EventData {
    date: string; 
    text: string; 
  }
  
  interface EventCategory {
    name: string; 
    data: EventData[]; 
  }
  
  interface EventPeriod {
    period: string; 
    event: EventCategory[]; 
  }
  
  type Timeline = EventPeriod[];

  useEffect(() =>{
    const fetchData= async () =>{

      try{
        const res=await fetch('https://540d3b3546dc38fa.mokky.dev/items')
        if(!res.ok){
          throw new Error(`Error: ${res.statusText}`);
        }
        const jsonData = await res.json(); 
        setData(jsonData);
      }
      catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [])

  if (data.length === 0) {
    return;
  }

  return (
    
    <div className="content">
      <div className="line"></div>
      <div className="circle"></div>
      <div className="mobile-line"></div>
      <div className="cross">
        {
          data && (
            <>
            
            <div className="left-line"></div>
            <div className="right-line"></div>
            <div className="bottom-line"></div>
            <div className="years-date">
              <span className="blue-text">
                {data[curentPeriod - 1].period.split("-")[0]}
              </span>
              <span className="pink-text">
                {data[curentPeriod - 1].period.split("-")[1]}
              </span>
            </div>
            <CircleBlock
              event={data[curentPeriod - 1].event}
              setCurrentData={setCurrentData}
              currentData={currentData}
              curentPeriod={curentPeriod}
            />
            <div className="label">Исторические даты</div>
            <div className="switching">
              <label>{"0" + String(curentPeriod) + "/0" + data.length}</label>
              <div className={`buttons`}>
                <button
                  onClick={() => {
                    if (curentPeriod > 1) setCurentPeriod((prev) => prev - 1);
                  }}
                  className={1 < curentPeriod ? "active" : ""}
                >
                  <svg
                    className="left-button"
                    // width="10"
                    // height="14"
                    viewBox="0 0 10 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
                      stroke="#42567A"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    if (curentPeriod < data.length)
                      setCurentPeriod((prev) => prev + 1);
                  }}
                  className={curentPeriod < data.length ? "active" : ""}
                >
                  <svg
                    className="right-button"
                    // width="10"
                    // height="14"
                    viewBox="0 0 10 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
                      stroke="#42567A"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>
    
            <SwipperBlock event={data[curentPeriod - 1].event[currentData]} />
          
            </>
          )
        }
        </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
