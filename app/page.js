"use client";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AdbOutlinedIcon from "@mui/icons-material/AdbOutlined";

// import Navbar from "@/component/nav/Navbar";

import Top from "@/component/topimage/Top";

import Home from "@/component/home/Home";

import Rooms from "@/component/rooms/Rooms";

// import Quick from "@/components/quick/Quick";
import SnapBooking from "@/component/snapbooking/SnapBooking";

import Service from "@/component/service/Service";

import Team from "@/component/team/Team";

import Testimonial from "@/component/testimonial/Testimonial";
import Faqsection from "@/component/faqsection/Faqsection ";
import Blog from "@/component/blog/Blog";

import Footer from "@/component/footer/Footer";


export default function Homes() {
  return (
    <main>
      {/* <Top /> */}
      {/* <Navbar /> */}
      <Home />
      <Rooms />

      {/* <Quick /> */}
      <SnapBooking />

      <Service />

      <Team />
      <Testimonial />
      <Faqsection />
      <Blog />
      
      {/* <Footer /> */}
    </main>
  );
}

// ------------------------------------------------------------------------------------------
// import * as React from 'react';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import DownloadIcon from '@mui/icons-material/Download';
// import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

// import AdbOutlinedIcon from '@mui/icons-material/AdbOutlined';

// import AccessibleOutlinedIcon from '@mui/icons-material/AccessibleOutlined';

// export default function Home() {
//   return (
//     <div>

//     <h1>
//       Hotel Hub
//     </h1>

//     <Stack spacing={2} direction="row">
//       <Button variant="outlined">Outlined</Button>

//       <Button color="secondary">Secondary</Button>

//       <Button variant="outlined" color="error">
//         <AccessibleOutlinedIcon/>
//       </Button>

//       <Button variant="contained" endIcon={<SendIcon />}>
//         Send
//       </Button>

//       <Button variant="outlined" startIcon={<DownloadIcon />}>
//         Download
//       </Button>

//     </Stack>

//     </div>
//   );
// }
