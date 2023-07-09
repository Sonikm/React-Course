import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
   return (
    <div>
       <Steps/>
       <Steps/>
    </div>
   )
  }



 function Steps() {
  const [step, setStep] = useState(1);
  // const [test] = useState({name: "Soni"});
  const [test, setTest] = useState({ name: " Soni" });
  const [isOpen, setIsOpen] = useState(true);

  // let step = 1;

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = () => {
    if (step < 3) {
      // setStep(step + 1)
      setStep((s) => s + 1);
      // setStep( s=> s + 1);
    }

    // BAD PRACTICE
    // test.name = "Radha";
    setTest({ name: " Naina" });
  };

  // function closeSteps(){
  //  setIsOpen(isOpen ? false : true);
  // }

  return (
    <div>
      <button onClick={() => setIsOpen(s => !s)} className="close">
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Steps {step}: {messages[step - 1]} {test.name}{" "}
          </p>

          <div className="buttons">
            <button
              onClick={handlePrevious}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Previous
            </button>
            <button
              // onClick={()=> alert("Next")}
              onClick={handleNext}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
