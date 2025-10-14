"use client"; // ✅ Bắt buộc: kích hoạt môi trường Client để dùng hook

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import HotelDetails from "@/component/Bookingdetails/BookingComponent";

export default function RoomDetailClient() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Hook này chỉ được phép dùng trong Client Component
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    if (!search) {
      setLoading(false);
      return;
    }

    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/getsingleroom/${search}`,
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }

        const data = await response.json();
        setContent(data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [search]);

  if (error) return <p className="text-red-600 p-4">Lỗi: {error}</p>;

  return (
    <HotelDetails content={content} loading={loading} setLoading={setLoading} />
  );
}


// 🔹 Giải thích:

// "use client" đặt đầu file: bắt buộc để file này chạy hoàn toàn ở phía client.

// Giữ nguyên logic fetch API như bạn đã làm.

// Không cần dynamic = "force-dynamic" trong file này (chỉ cần trong page.jsx).

// HotelDetails vẫn nhận props y hệt trước.