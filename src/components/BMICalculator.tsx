import React, { useState } from "react";

import underweight from "../assets/underweight.svg";
import normal from "../assets/normal.svg";
import overweight from "../assets/overweight.svg";
import obese from "../assets/obese.svg";
import morbid from "../assets/morbid.svg";

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [result, setResult] = useState<number | "">("");

  //Updating the field values
  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number | "">>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value ? Number(e.target.value) : "");
    };

  // BMI Calculation
  const calculateBMI = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (weight && height) {
      const heightInMeters = Number(height) / 100;
      const bmiValue = Number(weight) / (heightInMeters * heightInMeters);
      setResult(bmiValue);
    } else {
      setResult(""); // If the fields are empty, reset the result.
    }
  };

  // Function to get the interpretation
  const getInterpretation = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 25) return "Normal";
    if (bmi >= 25 && bmi < 30) return "Overweight";
    if (bmi >= 30 && bmi < 35) return "Obese";
    return "Morbid obesity";
  };

  // Dynamic interpretation after calculation
  const interpretation = result !== "" ? getInterpretation(Number(result)) : "";

  return (
    <form onSubmit={calculateBMI}>
      <h1>Calculate your Body Mass Index (BMI)</h1>
      <input
        type="number"
        value={weight === "" ? "" : weight}
        placeholder="Enter your weight (kg)"
        onChange={handleInputChange(setWeight)}
      />
      <input
        type="number"
        value={height === "" ? "" : height}
        placeholder="Enter your height (cm)"
        onChange={handleInputChange(setHeight)}
      />
      <button type="submit">Calculate</button>

      <div className="resulat-desc">
        {[
          { category: "Underweight", range: "< 18.5", image: underweight },
          { category: "Normal", range: "18.5-24.9", image: normal },
          { category: "Overweight", range: "25-29.9", image: overweight },
          { category: "Obese", range: "30-39.9", image: obese },
          { category: "Morbid obesity", range: "40 <", image: morbid },
        ].map(({ category, range, image }) => (
          <div
            key={category}
            className={`body ${category.toLowerCase().replace(" ", "-")} ${
              interpretation === category ? "active" : ""
            }`}
          >
            <img src={image} alt={category} />
            <div className="description">
              <p>{range}</p>
              <span>{category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Display the result after the calculation */}
      {result && (
        <div
          className={`result-value ${interpretation
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          Your BMI is: {result.toFixed(2)}
        </div>
      )}
    </form>
  );
};

export default BMICalculator;
