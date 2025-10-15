// components/Navbar.js
"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Box from "@mui/material/Box";
import HotelHubLogo from "./HotelHubLogo";

import { useTheme } from "@mui/material/styles";

// 🎨 Import styles riêng cho Navbar
import { navStyles } from "./NavStyles";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  //   const isMobile = useMediaQuery("(max-width:600px");

  // State để quản lý anchor (vị trí mở menu)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  // Hàm mở menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Hàm đóng menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navLinks = [
    "About",
    "Restaurent",
    "Gallery",
    "AllBlogs",
    "AllRooms",
    "Contact",
  ];

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "white", color: "black" }}
    >
      <Box
        sx={{
          margin: "0 auto",
          width: "80%",
          maxWidth: "1070px",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/" passHref>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: "bold",
                  }}
                >
                  {/* <img src="/logo.png" alt="HotelHub" style={{ height: '40px', marginRight: '10px' }} /> */}
                  <HotelHubLogo />
                </Box>
              </Link>
            </Typography>
            {isMobile ? (
              <>
                <IconButton
                  sx={{ zIndex: 1400 }}
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                >
                  {navLinks.map((link) => (
                    <MenuItem key={link} onClick={handleClose}>
                      <Link href={`/${link.toLowerCase()}`} passHref>
                        <Box
                          component="p"
                          sx={{ textDecoration: "none", color: "inherit" }}
                        >
                          {link}
                        </Box>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box display="flex" alignItems="center">
                {navLinks.map((link) => (
                  <Button color="inherit" key={link}>
                    <Link href={`/${link.toLowerCase()}`} passHref>
                      <Box
                        component="p"
                        sx={{ textDecoration: "none", color: "inherit" }}
                      >
                        {link}
                      </Box>
                    </Link>
                  </Button>
                ))}
                <Button
                  variant="contained"
                  style={navStyles.bookNowButton}
                  // style={{
                  //   backgroundColor: "blue",
                  //   color: "white",
                  //   marginLeft: "20px",
                  // }}
                >
                  Book Now
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;

// // ==========================================================================================


// // components/nav/Navbar.js
// "use client"; // ⚙️ Chỉ thị cho Next.js rằng component này là client component (chạy trên trình duyệt)

// import React from "react"; // 📦 Import React để tạo component
// import Link from "next/link"; // 🔗 Dùng để điều hướng nội bộ trong Next.js (thay cho thẻ <a>)
// import {
//   AppBar,       // 🧱 Thành phần thanh điều hướng chính (Material UI)
//   Toolbar,      // 📏 Thanh chứa các thành phần con (logo, nút...)
//   Typography,   // 📝 Thành phần văn bản
//   Button,       // 🔘 Nút bấm (Material UI)
//   IconButton,   // 🎯 Nút icon (dạng tròn, thường dùng cho menu mobile)
//   Menu,         // 📋 Thành phần menu xổ xuống
//   MenuItem,     // 📄 Mục trong menu
//   Box,          // 📦 Hộp chứa linh hoạt (thay cho <div>)
//   useMediaQuery // 📱 Hook kiểm tra kích thước màn hình (mobile/desktop)
// } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu"; // 📱 Icon menu 3 gạch (hamburger)
// import { useTheme } from "@mui/material/styles"; // 🎨 Hook để truy cập theme (breakpoints, màu sắc,...)
// import HotelHubLogo from "./HotelHubLogo"; // 🏨 Logo riêng của dự án

// // 🧩 Import style & theme config (được định nghĩa trong file NavStyles.js)
// import { navStyles, themeConfig } from "./NavStyles";

// const Navbar = () => {
//   // 🎨 Lấy theme hiện tại từ Material UI (để xác định breakpoint, màu...)
//   const theme = useTheme();

//   // 📱 Kiểm tra xem đang ở kích thước màn hình mobile (true/false)
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // 🎯 Quản lý trạng thái menu (khi nhấn icon menu trên mobile)
//   const [anchorEl, setAnchorEl] = React.useState(null); // anchorEl = phần tử gốc để menu bám theo
//   const open = Boolean(anchorEl); // ✅ Xác định menu đang mở hay đóng

//   // ⚡ Hàm mở menu (khi click icon menu)
//   const handleMenu = (event) => setAnchorEl(event.currentTarget);

//   // ⚡ Hàm đóng menu (khi click ra ngoài hoặc chọn item)
//   const handleClose = () => setAnchorEl(null);

//   // 📄 Danh sách các liên kết điều hướng trên navbar
//   const navLinks = ["About", "Restaurent", "Gallery", "AllBlogs", "AllRooms", "Contact"];

//   return (
//     // 🧱 Thanh AppBar chính, dùng style từ NavStyles.js
//     <AppBar position="static" sx={navStyles.appBar}>
//       {/* 📦 Container để canh giữa và giới hạn chiều rộng */}
//       <Box sx={navStyles.container}>
//         {/* 🔧 Toolbar chứa nội dung bên trong navbar */}
//         <Toolbar sx={navStyles.toolbar}>

//           {/* 🔰 LOGO khu vực bên trái */}
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             <Link href="/" passHref>
//               <Box sx={navStyles.logoBox}>
//                 <HotelHubLogo /> {/* 🏨 Hiển thị logo (component riêng) */}
//               </Box>
//             </Link>
//           </Typography>

//           {/* ⚙️ Điều hướng: Hiển thị khác nhau trên mobile và desktop */}
//           {isMobile ? (
//             // ===== 📱 Giao diện mobile =====
//             <>
//               {/* 🪄 Nút icon menu (3 gạch) */}
//               <IconButton
//                 color="inherit"
//                 aria-label="menu"
//                 onClick={handleMenu}
//                 sx={{ zIndex: 1400 }} // Đảm bảo icon luôn nằm trên cùng
//               >
//                 <MenuIcon />
//               </IconButton>

//               {/* 📋 Menu xổ xuống khi nhấn icon */}
//               <Menu
//                 id="nav-menu"
//                 anchorEl={anchorEl} // Gắn vị trí menu theo nút bấm
//                 keepMounted
//                 open={open} // Hiển thị khi open = true
//                 onClose={handleClose}
//               >
//                 {/* 🧩 Lặp qua danh sách navLinks để tạo menu item */}
//                 {navLinks.map((link) => (
//                   <MenuItem key={link} onClick={handleClose}>
//                     <Link href={`/${link.toLowerCase()}`} passHref>
//                       <Box component="p" sx={navStyles.menuText}>
//                         {link}
//                       </Box>
//                     </Link>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </>
//           ) : (
//             // ===== 💻 Giao diện desktop =====
//             <Box display="flex" alignItems="center">
//               {/* 🔁 Lặp để tạo các nút menu */}
//               {navLinks.map((link) => (
//                 <Button key={link} sx={navStyles.navButton}>
//                   <Link href={`/${link.toLowerCase()}`} passHref>
//                     <Box component="p" sx={navStyles.menuText}>
//                       {link}
//                     </Box>
//                   </Link>
//                 </Button>
//               ))}

//               {/* 🔴 Nút “Book Now” nổi bật */}
//               <Button variant="contained" sx={navStyles.bookNowButton}>
//                 Book Now
//               </Button>
//             </Box>
//           )}
//         </Toolbar>
//       </Box>
//     </AppBar>
//   );
// };

// export default Navbar; // 🚀 Xuất component để dùng ở nơi khác (layout hoặc trang chính)


// // 📘 Giải thích thêm

// // sx={navStyles.xxx}: cách dùng style từ file riêng (NavStyles.js), giúp tách logic & style.

// // useMediaQuery: hook của MUI giúp phát hiện kích thước màn hình, từ đó hiển thị khác nhau cho mobile & desktop.

// // themeConfig: bạn có thể định nghĩa trong NavStyles.js để đổi màu, font, background linh hoạt mà không cần sửa trong code.