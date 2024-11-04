from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import os  # Ensure this is imported

app = FastAPI()

# Load your ML model
model_path = os.path.join(os.path.dirname(__file__), "models", "label_encoder.pkl")
model = joblib.load(model_path)  # Load the model using joblib

# Define the request and response schemas
class PredictionRequest(BaseModel):
    features: list

class PredictionResponse(BaseModel):
    prediction: float

# Create a prediction endpoint
@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    features = np.array(request.features).reshape(1, -1)
    prediction = model.predict(features)
    return {"prediction": float(prediction[0])}
