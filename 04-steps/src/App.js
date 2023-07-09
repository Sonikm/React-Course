import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
      <StepMessage step={1} className="message">
        <p>Pass in componenets</p> <p>😎</p>
      </StepMessage>
      <StepMessage step={2} className="message">
        <p>Read children props</p> <p>✌️</p>
      </StepMessage>
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  // let step = 1;

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((s) => s + 1);
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen((s) => !s)} className="close">
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage className="message buttons" step={step}>
            {messages[step - 1]}
            <Button
              bgColor="#e7e7e7"
              textColor="#7950f2"
              onClick={() => alert(`Learn how to ${messages[step - 1]}`)}
            >
              Learn more
            </Button>
          </StepMessage>

          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              {" "}
              <span>👈</span> Previous <span>🤡</span>{" "}
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              {" "}
              <span>👉</span> Next <span>🤠</span>{" "}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ children, className, step }) {
  return (
    <div className={className}>
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
      x
    >
      {children}
    </button>
  );
}
