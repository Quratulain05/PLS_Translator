from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# Load your ML model
model = joblib.load("path/to/your_model.pkl")  # Update with the correct path

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
