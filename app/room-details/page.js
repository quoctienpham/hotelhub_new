// ⚙️ Đây là file "Server Component" mặc định của Next.js.
// ❌ Không được gọi trực tiếp useSearchParams() ở đây.
// ✅ Thay vào đó, ta import Client Component bên dưới và bọc bằng <Suspense>.

import { Suspense } from "react";
import RoomDetailClient from "./RoomDetailClient";

export const dynamic = "force-dynamic"; // ⚡ Bắt buộc: tắt prerender để tránh lỗi SSG

export default function Page() {
  return (
    // ✅ Suspense giúp trì hoãn render của Client Component cho đến khi sẵn sàng
    <Suspense fallback={<div className="p-4 text-gray-600">Đang tải dữ liệu phòng...</div>}>
      <RoomDetailClient />
    </Suspense>
  );
}


// 🔹 Giải thích:

// page.jsx vẫn là Server Component, nên không được gọi hook client như useSearchParams().

// <Suspense> là bắt buộc để Next.js cho phép render client component có chứa hook này.

// fallback là nội dung hiển thị tạm thời trong khi client component load.













// "use client";
// export const dynamic = "force-dynamic"; // ⚡ Tắt prerender khi build

// import { useState, useEffect } from "react";

// import HotelDetails from "@/component/Bookingdetails/BookingComponent";
// import { useSearchParams } from "next/navigation";

// const ContentViewPage = () => {
//   const [content, setContent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const searchParams = useSearchParams();
//   const search = searchParams.get("search");

//   useEffect(() => {
//     if (!search) {
//       setLoading(false);
//       return;
//     }

//     const fetchContent = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API}/getsingleroom/${search}`,
//           {
//             method: "GET",
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch content");
//         }

//         const data = await response.json();
//         setContent(data);
//       } catch (err) {
//         setError(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContent();
//   }, [search]);

//   if (error) {
//     return <p>Error: {error}</p>;
//   }
//   return (
//     <>
//       <HotelDetails
//         content={content}
//         loading={loading}
//         setLoading={setLoading}
//       />
//     </>
//   );
// };

// export default ContentViewPage;
