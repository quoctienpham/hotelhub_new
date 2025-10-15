// 🎨 Tập trung định nghĩa style cho Navbar
// 👉 Dễ chỉnh màu, font, layout mà không cần sửa trong JSX

// ================================
// 🔧 1️⃣ Cấu hình theme tổng thể
// ================================
export const themeConfig = {
  primaryColor: "#74c78f", // 🌿 Màu nền chính của thanh Navbar (AppBar)
  textColor: "#FFFFFF", // 🎨 Màu chữ mặc định trên Navbar
  accentColor: "#74c78f", // 🔴 Màu nổi bật dùng cho nút "Book Now" hoặc phần nhấn
  fontFamily: "'Poppins', sans-serif", // 🧩 Font chữ toàn bộ Navbar (có thể đổi sang Roboto, Montserrat,...)
};
// ================================
// 💅 2️⃣ Các style chi tiết cho Navbar
// ================================
export const navStyles = {
  // 🎯 Style cho thanh AppBar (thanh điều hướng trên cùng)
  appBar: {
    backgroundColor: themeConfig.primaryColor, // Màu nền AppBar lấy từ themeConfig
    color: themeConfig.textColor, // Màu chữ lấy từ themeConfig
    boxShadow: "0px 2px 8px rgba(0,0,0,0.15)", // Đổ bóng nhẹ để tạo chiều sâu
  },
  
  toolbar: {
    justifyContent: "space-between",
    padding: "0 24px",
  },
  languageBox: {
    display: "flex",
    alignItems: "center",
  },
  languageSelect: {
    color: "white",
    minWidth: 120,
    fontFamily: "'Poppins', sans-serif",
    "& .MuiSvgIcon-root": { color: "white" }, // 🎯 Màu mũi tên dropdown
  },
  languageSelectMobile: {
    color: "black",
    minWidth: 120,
    fontFamily: "'Poppins', sans-serif",
  },
  infoBox: {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
  },
  text: {
    color: "white",
    marginRight: 16,
    fontSize: "0.95rem",
    fontFamily: "'Poppins', sans-serif",
  },
  avatar: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer",
    border: "2px solid white",
    marginLeft: 8,
  },
  drawerBox: {
    width: 250,
    paddingTop: 2,
  },

  // 🔴 Style cho nút "Book Now" (nút đặc biệt)
  bookNowButton: {
    backgroundColor: themeConfig.accentColor, // Màu nền nổi bật
    color: "#fff", // Màu chữ trắng
    fontFamily: themeConfig.fontFamily, // Font đồng bộ với toàn Navbar
    fontWeight: "bold", // Tô đậm chữ
    marginLeft: "20px", // Cách nút cuối cùng 20px
    "&:hover": {
      // Hiệu ứng hover (khi di chuột)
      backgroundColor: "#d62828", // Đổi màu nhấn khi hover
    },
  },
};

// ===============================================================

// // 🎨 Tập trung định nghĩa style cho Navbar
// // 👉 Mục tiêu: tách phần giao diện ra riêng để dễ chỉnh màu, font, layout mà không cần sửa code JSX

// // ================================
// // 🔧 1️⃣ Cấu hình theme tổng thể
// // ================================
// export const themeConfig = {
//   primaryColor: "#74c78f", // 🌿 Màu nền chính của thanh Navbar (AppBar)
//   textColor: "#FFFFFF",    // 🎨 Màu chữ mặc định trên Navbar
//   accentColor: "#E63946",  // 🔴 Màu nổi bật dùng cho nút "Book Now" hoặc phần nhấn
//   fontFamily: "'Poppins', sans-serif", // 🧩 Font chữ toàn bộ Navbar (có thể đổi sang Roboto, Montserrat,...)
// };

// // ================================
// // 💅 2️⃣ Các style chi tiết cho Navbar
// // ================================
// export const navStyles = {
//   // 🎯 Style cho thanh AppBar (thanh điều hướng trên cùng)
//   appBar: {
//     backgroundColor: themeConfig.primaryColor, // Màu nền AppBar lấy từ themeConfig
//     color: themeConfig.textColor,              // Màu chữ lấy từ themeConfig
//     boxShadow: "0px 2px 8px rgba(0,0,0,0.15)", // Đổ bóng nhẹ để tạo chiều sâu
//   },

//   // 🧱 Style cho vùng bao ngoài (container chính của navbar)
//   container: {
//     margin: "0 auto",   // Canh giữa nội dung
//     width: "80%",       // Chiếm 80% chiều ngang trang
//     maxWidth: "1070px", // Giới hạn chiều rộng tối đa
//   },

//   // 🔧 Thanh chứa bên trong AppBar (Toolbar)
//   toolbar: {
//     display: "flex",                 // Sử dụng flexbox để bố trí các phần tử ngang hàng
//     justifyContent: "space-between", // Logo bên trái, menu bên phải
//     alignItems: "center",            // Canh giữa theo trục dọc
//   },

//   // 🏨 Style cho logo (và box bao quanh logo)
//   logoBox: {
//     display: "flex",          // Đặt logo & chữ (nếu có) cùng hàng
//     alignItems: "center",     // Căn giữa logo theo chiều dọc
//     textDecoration: "none",   // Bỏ gạch chân mặc định của thẻ Link
//     color: "inherit",         // Kế thừa màu chữ của AppBar
//     fontWeight: "bold",       // Làm chữ logo đậm hơn
//   },

//   // 🔗 Style cho các nút menu (About, Rooms, Contact,...)
//   navButton: {
//     textTransform: "none",             // Giữ nguyên chữ (không tự động viết hoa)
//     fontFamily: themeConfig.fontFamily,// Font chữ lấy từ theme
//     color: themeConfig.textColor,      // Màu chữ của các nút menu
//   },

//   // 🔴 Style cho nút "Book Now" (nút đặc biệt)
//   bookNowButton: {
//     backgroundColor: themeConfig.accentColor, // Màu nền nổi bật
//     color: "#fff",                            // Màu chữ trắng
//     fontFamily: themeConfig.fontFamily,       // Font đồng bộ với toàn Navbar
//     fontWeight: "bold",                       // Tô đậm chữ
//     marginLeft: "20px",                       // Cách nút cuối cùng 20px
//     "&:hover": {                              // Hiệu ứng hover (khi di chuột)
//       backgroundColor: "#d62828",             // Đổi màu nhấn khi hover
//     },
//   },

//   // 📋 Style cho chữ trong menu (MenuItem, cả desktop & mobile)
//   menuText: {
//     textDecoration: "none",             // Bỏ gạch chân
//     color: "inherit",                   // Kế thừa màu chữ của parent (tự động theo theme)
//     fontFamily: themeConfig.fontFamily, // Font thống nhất toàn hệ thống
//   },
// };
