"use client"
// components/SignupForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';


export default function SignupForm() {
    
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const validateForm = () => {
        const errors = {};
      
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }
       
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerMessage('');
        if (!validateForm()) return;

        const response = await fetch(`${process.env.API}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        console.log(response);
        if (!response?.ok) {
            setIsSuccess(false);
            setServerMessage(data?.err);
        } else {


            setIsSuccess(true);
            setServerMessage(data.msg);
        }
    };

    return (

        <Box sx={{
            backgroundImage: 'url(/images/hotel8.jpg)',


            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',



        }}   >


        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column',
             gap: 2, maxWidth: 900, margin: '0 auto' ,
             
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                marginTop: "99px",
                padding: '40px',
                color: "white"
             
             
             }}
      
      
      
        >
            <Typography variant="h4" component="h1" gutterBottom>
                forgot-password
            </Typography>
            {serverMessage && (
                <Alert severity={isSuccess ? 'success' : 'error'}>{serverMessage}</Alert>
            )}
        
            <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth

                InputProps={{
                    style: {
                      color: "#fff",
                      borderColor: "red",
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "red" },
                  }}
                  sx={{
                    input: { color: "#fff" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "red",
                      },
                      "&:hover fieldset": {
                        borderColor: "red",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "red",
                      },
                    },
                  }}
            />
           
          
            <Button type="submit" variant="contained"
            
            sx={{
                color:"white",
                  backgroundColor: 'red',
                  '&:hover': {
                    color:"white",
                      backgroundColor: 'red'
                  },
                  mt: 2,
                  width: '100%'
              }}
             
             
             >
               send link
            </Button>
            </Box> </Box>
    );
}