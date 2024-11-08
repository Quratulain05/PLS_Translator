import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import doct from "../../assets/images/doctor.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected video file:", file.name);
    }
  };

  const handleRecordToggle = async () => {
    if (!isRecording) {
      // Start recording
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(newStream);
        videoRef.current.srcObject = newStream;

        const newMediaRecorder = new MediaRecorder(newStream);
        setMediaRecorder(newMediaRecorder);
        setRecordedChunks([]);

        newMediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setRecordedChunks((prev) => [...prev, event.data]);
          }
        };

        newMediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing webcam:", error);
        alert("Please enable camera permissions to record video.");
      }
    } else {
      // Stop recording
      mediaRecorder.stop();
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/mp4" });
        const url = URL.createObjectURL(blob);
        videoRef.current.srcObject = null;
        videoRef.current.src = url;
        videoRef.current.controls = true;
      };
      stream.getTracks().forEach((track) => track.stop()); // Stop the webcam stream
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-row px-20 items-center mainbgImg min-h-full">
      <div className="bg-white h-3/4 z-0" style={{ flex: 6 }}>
        <div className="flex flex-row mt-80 pt-10">
          {/* Browse Button with file input */}
          <input
            accept="video/*"
            type="file"
            id="browse-video-input"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
          <label htmlFor="browse-video-input">
            <Button component="span" className="button w-60 mx-3 flex" sx={{ background: "white" }}>
              <Typography className="text-black flex justify-end z-10" style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}>
                Browse
              </Typography>
            </Button>
          </label>

          {/* Record Button */}
          <Button onClick={handleRecordToggle} className="button w-60 mx-3 flex" sx={{ background: "white" }}>
            <Typography className="text-black flex justify-end z-10" style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}>
              {isRecording ? "Stop" : "Record"}
            </Typography>
          </Button>
        </div>

        {/* Video Preview */}
        <video ref={videoRef} className="mt-5 w-full" autoPlay muted />
      </div>

      {/* Submit Button */}
      <div className="flex ml-10 justify-center flex-col" style={{ flex: 4 }}>
        <Button onClick={handleOpen} className="button w-60 flex justify-center" sx={{ background: "white" }}>
          <Typography className="text-black" style={{ fontWeight: "bolder", fontFamily: "Montserrat" }}>
            Submit
          </Typography>
        </Button>
      </div>

      {/* Image Section */}
      <img
        src={doct}
        className="bg-white bounce-animation rounded-full"
        style={{ flex: 4, height: "350px" }}
        alt="Doctor"
      />

      {/* Modal for Language Selection */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="rounded-3xl">
          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>English</MenuItem>
                  <MenuItem value={20}>Urdu</MenuItem>
                  <MenuItem value={30}>French</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="flex justify-center items-center">
            <Button className="w-80 text-white mt-10" style={{ background: "#4D115C" }}>
              Translate
            </Button>
          </div>
          <div>
            <div className="mt-20 bg-red-100 w-full h-60 flex">
              <Typography className="m-10" style={{ fontSize: 20, fontWeight: "bolder" }}>
                You are experiencing Heartburn.
              </Typography>
            </div>
            <div className="flex mt-5 mx-10 justify-end">
              <VolumeUpIcon />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
