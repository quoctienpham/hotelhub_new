// "use client";

// import Rooms from "@/component/room/Rooms";



// export default function Roomss() {
//   return <Rooms />;
// }


"use client";

import { Suspense } from "react";
import Rooms from "@/component/room/Rooms";

export default function Roomss() {
  return (
    <Suspense fallback={<div>Loading rooms...</div>}>
      <Rooms />
    </Suspense>
  );
}


// 💡 Giải thích:

// useSearchParams() là Client-side hook nhưng NextJS vẫn muốn bạn bao <Suspense> để đảm bảo React có thể “pause rendering” khi hydration xảy ra.

// Khi không có <Suspense>, build (prerender) sẽ fail với lỗi:
// useSearchParams() should be wrapped in a suspense boundary


// ===============================================================================
 
// "use client";

// import Rooms from "@/component/room/Rooms";

// export const dynamic = "force-dynamic";

// export default function Roomss() {
//   return <Rooms />;
// }

// Nếu bạn không muốn dùng <Suspense>, bạn có thể buộc trang không prerender bằng cách thêm:

// export const dynamic = "force-dynamic";

// ⚠️ Cách này giúp build qua được, nhưng sẽ làm mất hiệu năng SSG (mỗi request đều render động).