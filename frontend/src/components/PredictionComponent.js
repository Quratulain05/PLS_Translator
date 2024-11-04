import React, { useState } from 'react';
import { getPrediction } from './api';

const PredictionComponent = () => {
  const [features, setFeatures] = useState([]);
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      const result = await getPrediction(features);
      setPrediction(result);
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  return (
    <div>
      <h1>ML Model Prediction</h1>
      <input
        type="text"
        placeholder="Enter features separated by commas"
        onChange={(e) => setFeatures(e.target.value.split(',').map(Number))}
      />
      <button onClick={handlePredict}>Get Prediction</button>
      {prediction !== null && <h2>Prediction: {prediction}</h2>}
    </div>
  );
};

export default PredictionComponent;
