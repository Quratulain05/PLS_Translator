# from fastapi import FastAPI
# from pydantic import BaseModel
# import joblib
# import numpy as np
# import os  # Ensure this is imported

# app = FastAPI()

# # Load your ML model
# model_path = os.path.join(os.path.dirname(__file__), "models", "label_encoder.pkl")
# model = joblib.load(model_path)  # Load the model using joblib

# # Define the request and response schemas
# class PredictionRequest(BaseModel):
#     features: list

# class PredictionResponse(BaseModel):
#     prediction: float

# # Create a prediction endpoint
# @app.post("/predict", response_model=PredictionResponse)
# async def predict(request: PredictionRequest):
#     features = np.array(request.features).reshape(1, -1)
#     prediction = model.predict(features)
#     return {"prediction": float(prediction[0])}
import pickle
import numpy as np
import cv2
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend domain in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model from the .pkl file
with open("models/label_encoder.pkl", "rb") as f:
    model = pickle.load(f)

@app.post("/predict-gesture/")
async def predict_gesture(file: UploadFile = File(...)):
    # Save the uploaded video temporarily
    video_path = f"temp_{file.filename}"
    with open(video_path, "wb") as f:
        f.write(await file.read())

    # Process the video and extract frames
    cap = cv2.VideoCapture(video_path)
    frames = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.resize(frame, (224, 224))  # Resize to expected input size
        frames.append(frame)
    cap.release()

    # Convert frames to NumPy array
    frames = np.array(frames)

    # Pass frames to the model for prediction
    try:
        prediction = model.predict(frames)  # Ensure this aligns with your model's requirements
        gesture = prediction.argmax(axis=1).tolist()
        return {"gesture": gesture}
    except Exception as e:
        return {"error": str(e)}

