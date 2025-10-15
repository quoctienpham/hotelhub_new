// "use client";

// import { useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import Box from "@mui/material/Box";
// import HomeIcon from "@mui/icons-material/Home";
// import PhoneIcon from "@mui/icons-material/Phone";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import Button from "@mui/material/Button";
// import MenuIcon from "@mui/icons-material/Menu";
// import LanguageIcon from "@mui/icons-material/Language";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// import Link from "next/link";
// const Navbar = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const { data: session } = useSession();

//   console.log("session data", session);

//   const router = useRouter();

//   const handleClick = () => {
//     router.push(`/dashboard/${session?.user?.role}`);
//   };

//   const toggleDrawer = (newOpen) => () => {
//     setDrawerOpen(newOpen);
//   };

//   const drawer = (
//     <Box sx={{ width: 250 }}>
//       <List>
//         <ListItem>
//           <LanguageIcon sx={{ mr: 1 }} />
//           <Select
//             value="English"
//             variant="standard"
//             disableUnderline
//             sx={{ color: "black" }}
//           >
//             <MenuItem value="English">English</MenuItem>
//             <MenuItem value="Spanish">Spanish</MenuItem>
//           </Select>
//         </ListItem>
//         <ListItem>
//           <Button color="inherit" startIcon={<AccountCircleIcon />}>
//             Login
//           </Button>
//         </ListItem>
//         <ListItem>
//           <Button color="inherit" startIcon={<AccountCircleIcon />}>
//             Register
//           </Button>
//         </ListItem>
//       </List>
//     </Box>
//   );

//   return (
//     <AppBar position="static" sx={{ backgroundColor: "red" }}>
//       <Toolbar sx={{ justifyContent: "space-between" }}>
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <LanguageIcon sx={{ mr: 1 }} />
//           <Select
//             value="English"
//             variant="standard"
//             disableUnderline
//             sx={{ color: "white" }}
//           >
//             <MenuItem value="English">English</MenuItem>
//             <MenuItem value="Spanish">Spanish</MenuItem>
//             <MenuItem value="French">French</MenuItem>
//             <MenuItem value="German">German</MenuItem>
//             <MenuItem value="Chinese">Chinese</MenuItem>
//             <MenuItem value="Japanese">Japanese</MenuItem>
//             <MenuItem value="Hindi">Hindi</MenuItem>
//             <MenuItem value="Arabic">Arabic</MenuItem>
//           </Select>
//         </Box>
//         {isMobile ? (
//           <>
//             <IconButton
//               edge="end"
//               color="inherit"
//               aria-label="menu"
//               sx={{ zIndex: 1400 }}
//               onClick={toggleDrawer(true)}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
//               {drawer}
//             </Drawer>
//           </>
//         ) : (
//           <Box
//             sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
//           >
//             <HomeIcon sx={{ mr: 1 }} />
//             <Typography variant="body1" sx={{ color: "white", mr: 2 }}>
//               "The Yolk's On You Manor" 127.0.0.0.1
//             </Typography>
//             <PhoneIcon sx={{ mr: 1 }} />
//             <Typography variant="body1" sx={{ color: "white", mr: 2 }}>
//               +84 909 905 993
//             </Typography>

//             {session?.user ? (
//               <img
//                 onClick={handleClick}
//                 src={session.user.image || "/images/pic1.png"}
//                 alt="User Avatar"
//                 style={{
//                   width: "60px",
//                   height: "60px",
//                   borderRadius: "50%",
//                   objectFit: "cover",
//                   position: "relative",
//                   zIndex: 2,
//                   cursor: "pointer", // This makes the hand pointer appear on hover
//                 }}
//               />
//             ) : (
//               <>
//                 <Button color="inherit" startIcon={<AccountCircleIcon />}>
//                   <Link
//                     href="/login"
//                     style={{ textDecoration: "none", color: "inherit" }}
//                   >
//                     Login
//                   </Link>

//                   {/* <Link href="/login" passHref legacyBehavior>
//                     <Box
//                       component="a"
//                       sx={{ textDecoration: "none", color: "inherit" }}
//                     >
//                       Login
//                     </Box>
//                   </Link> */}
//                 </Button>
//                 {/* <Button color="inherit" startIcon={<AccountCircleIcon />}>
//                   <Link href="/register" passHref legacyBehavior>
//                     <Box
//                       component="a"
//                       sx={{ textDecoration: "none", color: "inherit" }}
//                     >
//                       Register
//                     </Box>
//                   </Link>
//                 </Button> */}
//                 <Button
//                   color="inherit"
//                   startIcon={<AccountCircleIcon />}
//                   component={Link}
//                   href="/register"
//                   sx={{ textDecoration: "none", color: "inherit" }}
//                 >
//                   Register
//                 </Button>
//               </>
//             )}
//           </Box>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;



// =================================================================================================


"use client"; // ✅ Bắt buộc trong Next.js để cho biết component này chạy phía client

// 🧩 Import các thư viện cần thiết
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useSession } from "next-auth/react"; // ✅ Lấy thông tin user đăng nhập
import { useRouter } from "next/navigation"; // ✅ Điều hướng trang
import Link from "next/link"; // ✅ Dùng để chuyển trang nội bộ

// 🎨 Import styles riêng cho Navbar
import { navStyles } from "./NavStyles";

const Navbar = () => {
  const theme = useTheme(); // 🎨 Lấy theme MUI hiện tại (màu, breakpoint,...)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // 📱 true nếu màn hình nhỏ hơn 600px
  const [drawerOpen, setDrawerOpen] = useState(false); // ⚙️ Quản lý Drawer
  const { data: session } = useSession(); // 🔐 Lấy thông tin user hiện tại

  const router = useRouter(); // 🚀 Điều hướng router

  // 🧭 Khi click vào avatar → điều hướng đến dashboard theo role user
  const handleClick = () => {
    router.push(`/dashboard/${session?.user?.role}`);
  };

  // ⚙️ Toggle Drawer (menu bên cạnh)
  const toggleDrawer = (newOpen) => () => setDrawerOpen(newOpen);

  // 📦 Nội dung Drawer hiển thị khi ở chế độ mobile
  const drawer = (
    <Box sx={navStyles.drawerBox}>
      <List>
        {/* 🌐 Chọn ngôn ngữ */}
        <ListItem>
          <LanguageIcon sx={{ mr: 1 }} />
          <Select
            value="English"
            variant="standard"
            disableUnderline
            sx={navStyles.languageSelectMobile}
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
          </Select>
        </ListItem>

        {/* 🔑 Login */}
        <ListItem>
          <Button color="inherit" startIcon={<AccountCircleIcon />}>
            Login
          </Button>
        </ListItem>

        {/* 📝 Register */}
        <ListItem>
          <Button color="inherit" startIcon={<AccountCircleIcon />}>
            Register
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  // 🧱 Giao diện chính của thanh điều hướng
  return (
    <AppBar position="static" sx={navStyles.appBar}>
      <Toolbar sx={navStyles.toolbar}>
        {/* 🌍 Bên trái: chọn ngôn ngữ */}
        <Box sx={navStyles.languageBox}>
          <LanguageIcon sx={{ mr: 1 }} />
          <Select
            value="English"
            variant="standard"
            disableUnderline
            sx={navStyles.languageSelect}
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
            <MenuItem value="French">French</MenuItem>
            <MenuItem value="German">German</MenuItem>
            <MenuItem value="Chinese">Chinese</MenuItem>
            <MenuItem value="Japanese">Japanese</MenuItem>
            <MenuItem value="Hindi">Hindi</MenuItem>
            <MenuItem value="Arabic">Arabic</MenuItem>
          </Select>
        </Box>

        {/* 📱 Mobile: hiển thị Drawer */}
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ zIndex: 1400 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawer}
            </Drawer>
          </>
        ) : (
          // 💻 Desktop: hiển thị thông tin + user
          <Box sx={navStyles.infoBox}>
            <HomeIcon sx={{ mr: 1 }} />
            <Typography variant="body1" sx={navStyles.text}>
              "Vườn Nhà Ngoại Garden Homestay"
            </Typography>

            <PhoneIcon sx={{ mr: 1 }} />
            <Typography variant="body1" sx={navStyles.text}>
              +84 909 905 993
            </Typography>

            {/* 👤 Nếu đã đăng nhập → avatar */}
            {session?.user ? (
              <img
                onClick={handleClick}
                src={session.user.image || "/images/pic1.png"}
                alt="User Avatar"
                style={navStyles.avatar}
              />
            ) : (
              <>
                {/* 🔑 Login */}
                <Button color="inherit" startIcon={<AccountCircleIcon />}>
                  <Link
                    href="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Login
                  </Link>
                </Button>

                {/* 📝 Register */}
                <Button
                  color="inherit"
                  startIcon={<AccountCircleIcon />}
                  component={Link}
                  href="/register"
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
