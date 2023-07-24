import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import StarRating from './StarRating';

function Test() {
  const [moiveRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color='blue'  maxRating={10} size={28} onSetMovieRating={setMovieRating} />
      <p>This movie was rated {moiveRating} stars</p>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} size={48} color={"#fcc419"} className={"test"} messages={["Terrible","Bad", "Okay", "Good", "Amazing"]} defaultRating={3}/>
    <Test/>
    {/* <StarRating size={28} color={"red"} />
    <StarRating size={18} color={"green"} /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
