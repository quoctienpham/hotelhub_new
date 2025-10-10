import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const RoomCardContainer = styled(Box)({
  display: "flex",
  flexDirection: "row", // giống skeleton: ảnh bên trái, nội dung bên phải
  alignItems: "stretch",
  width: "100%",
  backgroundColor: "white",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  marginBottom: "16px",
  height: "100%", // tránh card lùn hơn skeleton
  "@media (max-width: 600px)": {
    flexDirection: "column", // trên mobile xếp dọc
  },
});

export const RoomImage = styled("img")({
  width: "55%",
  // height: 'auto',
  height: "100%", // ép ảnh luôn full chiều cao container (Skeleton cũng vậy)
  objectFit: "cover", // tránh méo ảnh
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "@media (max-width: 600px)": {
    width: "100%",
    height: "200px", // cố định cao trên mobile
  },
});

export const RoomContent = styled(Box)({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const RoomDetails = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});
