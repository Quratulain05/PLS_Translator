import loginBg from "../../assets/images/loginBgI.jpg";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

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

export const SignupScreen = () => {
  const [open, setOpen] = React.useState(true); // Modal should open by default
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleClose = () => setOpen(false);

  const handleSignup = () => {
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Clear error if inputs are valid
    setError("");
    
    // Here, add your authentication logic, e.g., API call

    console.log("User data:", { name, email, password });
  };

  return (
    <div className="bgImg z-0 w-auto">
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="rounded-3xl">
          <div>
            <Typography
              className="text-center"
              style={{
                color: "#4D115C",
                fontFamily: "Montserrat",
                fontSize: 40,
                fontWeight: "bolder",
              }}
            >
              Sign Up
            </Typography>
            <div className="flex flex-col items-center">
              <TextField
                className="mt-16 w-80"
                placeholder="Enter Name"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                className="mt-8 w-80"
                placeholder="Enter Email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                className="mt-8 w-80"
                placeholder="Enter Password"
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                className="mt-8 w-80"
                placeholder="Confirm Password"
                variant="standard"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && (
                <Typography color="error" className="mt-4">
                  {error}
                </Typography>
              )}
            </div>
            <div className="flex justify-center">
              <Button
                className="w-80 text-white mt-20"
                style={{ background: "#4D115C" }}
                onClick={handleSignup}
              >
                Create Account
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
