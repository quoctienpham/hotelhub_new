// // components/XpointLogo.js
// import { Box, Typography } from "@mui/material";
// import { styled, keyframes } from "@mui/system";

// const pulse = keyframes`
//   0% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(1.1);
//   }
//   100% {
//     transform: scale(1);
//   }
// `;

// const glow = keyframes`
//   0% {
//     text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15pxrgb(189, 22, 22), 0 0 20px #ff00ff, 0 0 25px #ff00ff, 0 0 30px #ff00ff, 0 0 35px #ff00ff;
//   }
//   50% {
//     text-shadow: 0 0 10px #fff, 0 0 20pxrgb(201, 22, 15), 0 0 30pxrgb(204, 8, 8), 0 0 40px #ff00ff, 0 0 50px #ff00ff, 0 0 60px #ff00ff, 0 0 70px #ff00ff;
//   }
//   100% {
//     text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15pxrgb(231, 66, 16), 0 0 20px #ff00ff, 0 0 25px #ff00ff, 0 0 30px #ff00ff, 0 0 35px #ff00ff;
//   }
// `;

// const rotate = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   50% {
//     transform: rotate(360deg);
//   }
//   100% {
//     transform: rotate(0deg);
//   }
// `;

// const styles = [
//   {
//     background: "red",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//     fontSize: "2.3rem",
//     fontStyle: "italic",
//     textShadow: "2px 2px 4px #000000",
//   },
//   {
//     color: "#ff4d4d",
//     fontSize: "2rem",
//     textDecoration: "underline",
//     fontWeight: "bolder",
//     transform: "skewX(-10deg)",
//   },
//   {
//     color: "red",
//     fontSize: "2.7rem",
//     fontWeight: "bold",
//     textShadow: "2px 2px 4px #000000",
//     animation: `${rotate} 2s infinite`,
//   },
//   {
//     background: "linear-gradient(to right, #30CFD0 0%, #330867 100%)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//     fontSize: "2rem",
//     letterSpacing: "5px",
//     textShadow: "2px 2px 4px #000000",
//     animation: `${pulse} 2s infinite`,
//   },
//   {
//     background: "linear-gradient(to right, #30CFD0 0%, #330867 100%)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//     fontSize: "2rem",
//     letterSpacing: "5px",
//     textShadow: "2px 2px 4px #000000",
//     animation: `${pulse} 2s infinite`,
//   },
//   {
//     color: "orange",
//     fontSize: "2rem",
//     textShadow: "2px 2px 4px #000000",
//     transform: "rotate(10deg)",
//   },
//   {
//     background: "linear-gradient(to left, #f7ff00, red)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//     fontSize: "2rem",
//     fontWeight: "lighter",
//     animation: `${glow} 1.5s infinite`,
//   },
//   {
//     color: "#990000",
//     fontSize: "2rem",
//     textDecoration: "underline",
//     fontWeight: "bolder",
//     transform: "skewX(-10deg)",
//   },
// ];

// const StyledTypography = styled(Typography)``;

// const XpointLogo = () => {
//   const logoText = "Hotelhub";
//   return (
//     <Box display="flex">
//       {logoText.split("").map((char, index) => (
//         <StyledTypography key={index} sx={styles[index]}>
//           {char}
//         </StyledTypography>
//       ))}
//     </Box>
//   );
// };

// export default XpointLogo;

// ===================================================================================

// components/XpointLogo.js
"use client";
import { Box, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/system";

// keyframes
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px rgb(189,22,22), 0 0 20px #ff00ff; }
  50% { text-shadow: 0 0 10px #fff, 0 0 20px rgb(201,22,15), 0 0 30px rgb(204,8,8), 0 0 40px #ff00ff; }
  100% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px rgb(231,66,16), 0 0 20px #ff00ff; }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
`;

// styles array
const styles = [
  {
    background: "red",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "2.3rem",
    fontStyle: "italic",
    textShadow: "2px 2px 4px #000000",
  },
  {
    color: "#ff4d4d",
    fontSize: "2rem",
    textDecoration: "underline",
    fontWeight: "bolder",
    transform: "skewX(-10deg)",
  },
  {
    color: "red",
    fontSize: "2.7rem",
    fontWeight: "bold",
    textShadow: "2px 2px 4px #000000",
    animation: `${rotate} 2s infinite`,
  },
  {
    background: "linear-gradient(to right, #30CFD0 0%, #330867 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "2rem",
    letterSpacing: "5px",
    textShadow: "2px 2px 4px #000000",
    animation: `${pulse} 2s infinite`,
  },
  {
    color: "orange",
    fontSize: "2rem",
    textShadow: "2px 2px 4px #000000",
    transform: "rotate(10deg)",
  },
  {
    background: "linear-gradient(to left, #f7ff00, red)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "2rem",
    fontWeight: "lighter",
    animation: `${glow} 1.5s infinite`,
  },
  {
    color: "#990000",
    fontSize: "2rem",
    textDecoration: "underline",
    fontWeight: "bolder",
    transform: "skewX(-10deg)",
  },
];

// helper: chọn style theo index hoặc ngẫu nhiên
const getStyleForChar = (index) => {
  if (index < styles.length) {
    return styles[index];
  }
  // nếu vượt quá, lấy ngẫu nhiên
  const randomIndex = Math.floor(Math.random() * styles.length);
  return styles[randomIndex];
};

const StyledTypography = styled(Typography)({});

const XpointLogo = () => {
  const logoText = "VuonNhaNgoai"; // thử với chuỗi dài hơn

  return (
    <Box display="flex">
      {logoText.split("").map((char, index) => (
        <StyledTypography
          key={index}
          sx={{ ...getStyleForChar(index), display: "inline-block" }}
        >
          {char}
        </StyledTypography>
      ))}
    </Box>
  );
};

export default XpointLogo;
