// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";
// import BlogPost from "@/model/blog";
// import Category from "@/model/category";

// export async function GET(req, context) {
//   await dbConnect();
//   const { id } = await context.params;

//   try {
//     // Get the main blog post with category populated
//     const post = await BlogPost.findOne({ slug: id })
//       .populate("categories") // Populate the category
//       .lean();

//     if (!post) {
//       return NextResponse.json(
//         { error: "Blog post not found" },
//         { status: 404 }
//       );
//     }

//     // Get similar posts (from the same category)
//     let similarPosts = [];
//     if (post.categories?.length) {
//       const categoryIds = post.categories.map((c) => c._id);
//       similarPosts = await BlogPost.find({
//         _id: { $ne: post._id },
//         categories: { $in: categoryIds },

//         // similarPosts = await BlogPost.find({
//         //   _id: { $ne: post._id }, // Exclude current post
//         //   categories: post.categories._id // Match the same category
//       })
//         .limit(4)
//         .select("title slug image views likes createdAt") // Only select needed fields
//         .lean();
//     }

//     // Get all categories with counts
//     const categories = await Category.aggregate([
//       {
//         $lookup: {
//           from: "blogposts",
//           localField: "_id",
//           foreignField: "categories",
//           as: "posts",
//         },
//       },
//       {
//         $project: {
//           name: 1,
//           count: { $size: "$posts" },
//         },
//       },
//       { $sort: { count: -1 } },
//     ]);

//     return NextResponse.json(
//       {
//         post: {
//           ...post,
//           // Transform single category to array for frontend consistency
//           // categories: post.categories ? [post.categories] : [],
//           categories: post.categories || [],
//         },
//         similarPosts,
//         categories,
//       },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("API Error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// // Bản tối ưu hóa & fix hoàn chỉnh ChatGPT

// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";
// import BlogPost from "@/model/blog";
// import Category from "@/model/category";

// export async function GET(req, { params }) {
//   await dbConnect();
//   const { id } = params;

//   try {
//     const post = await BlogPost.findOne({ slug: id })
//       .populate("categories")
//       .lean();

//     if (!post) {
//       return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
//     }

//     // Get similar posts from same categories
//     let similarPosts = [];
//     if (post.categories?.length) {
//       const categoryIds = post.categories.map((c) => c._id);
//       similarPosts = await BlogPost.find({
//         _id: { $ne: post._id },
//         categories: { $in: categoryIds },
//       })
//         .limit(4)
//         .select("title slug image views likes createdAt")
//         .lean();
//     }

//     // Get all categories with count
//     const categories = await Category.aggregate([
//       {
//         $lookup: {
//           from: "blogposts",
//           localField: "_id",
//           foreignField: "categories",
//           as: "posts",
//         },
//       },
//       {
//         $project: {
//           name: 1,
//           count: { $size: "$posts" },
//         },
//       },
//       { $sort: { count: -1 } },
//     ]);

//     return NextResponse.json(
//       {
//         post: {
//           ...post,
//           categories: post.categories || [],
//         },
//         similarPosts,
//         categories,
//       },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("API Error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// Bản tối ưu hóa & fix hoàn chỉnh ChatGPT

import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import BlogPost from "@/model/blog";
import Category from "@/model/category";

// 🔹 Simple in-memory cache (TTL 5 phút)
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 5; // 5 phút

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;

  const cacheKey = `blog_${id}`;
  const cached = cache.get(cacheKey);
  const now = Date.now();

  // ✅ Trả dữ liệu từ cache nếu còn hạn
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    // 🔹 Lấy bài viết chính
    const post = await BlogPost.findOne({ slug: id })
      .populate("categories")
      .lean();

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // 🔹 Lấy bài viết tương tự
    let similarPosts = [];
    if (post.categories?.length) {
      const categoryIds = post.categories.map((c) => c._id);
      similarPosts = await BlogPost.find({
        _id: { $ne: post._id },
        categories: { $in: categoryIds },
      })
        .sort({ views: -1, createdAt: -1 }) // Ưu tiên bài nhiều view, mới
        .limit(4)
        .select("title slug image views likes createdAt")
        .lean();
    }

    // 🔹 Fallback nếu chưa đủ 4 bài
    if (similarPosts.length < 4) {
      const excludeIds = [post._id, ...similarPosts.map((p) => p._id)];
      const additionalPosts = await BlogPost.find({
        _id: { $nin: excludeIds },
      })
        .sort({ createdAt: -1 })
        .limit(4 - similarPosts.length)
        .select("title slug image views likes createdAt")
        .lean();

      similarPosts = [...similarPosts, ...additionalPosts];
    }

    // 🔹 Lấy tất cả categories + đếm số bài trong từng category
    let categories = await Category.aggregate([
      {
        $lookup: {
          from: "blogposts",
          localField: "_id",
          foreignField: "categories",
          as: "posts",
        },
      },
      {
        $project: {
          name: 1,
          count: { $size: "$posts" },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // ✅ CHỈ LẤY CATEGORY CÓ ÍT NHẤT 1 BÀI VIẾT
    // (👉 Đây là phần bạn yêu cầu sửa)
    categories = categories.filter((cat) => cat.count > 0);

    // 🔹 Dữ liệu trả về
    const responseData = {
      post: {
        ...post,
        categories: post.categories || [],
      },
      similarPosts,
      categories,
    };

    // ✅ Lưu cache
    cache.set(cacheKey, { data: responseData, timestamp: now });

    return NextResponse.json(responseData, { status: 200 });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
