import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/model/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

import Booking from "@/model/booking";
import RoomBookedDate from "@/model/roombookeddate";

function generateBookingCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function generateDateRange(startDate, endDate) {
  const dates = [];
  const current = new Date(startDate);

  while (current <= new Date(endDate)) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export async function POST(req) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  console.log("session", session);

  if (!session?.user?._id) {
    return NextResponse.json({ err: "Not authenticated" }, { status: 401 });
  }

  try {
    const {
      pricePerNight,
      nights,
      subtotal,
      discountPercent,
      discountAmount,
      total,
      rooms,
      guests,
      roomTypeName,
      room_id,
      checkIn,
      checkOut,
      image,
      billingDetails,
      paymentMethod,
    } = await req.json();

    const { country, name, email, phone, address, state, zipCode } =
      billingDetails;

    const newBooking = new Booking({
      rooms_id: room_id,
      user_id: session?.user._id,
      check_in: checkIn,
      check_out: checkOut,
      person: guests,
      number_of_rooms: rooms,
      total_night: nights,
      actual_price: pricePerNight,
      subtotal,
      discount: discountAmount,
      total_price: parseFloat(total.toFixed(2)),
      payment_method: paymentMethod,
      transaction_id: "",
      payment_status: 0,
      name,
      email,
      phone,
      country,
      state,
      zip_code: zipCode,
      address,
      code: generateBookingCode(),
      status: "inactive",
    });

    await newBooking.save();

    if (!room_id || !newBooking?._id || !checkIn || !checkOut) {
      return NextResponse.json({ message: "Missing fields" });
    }

    const dates = generateDateRange(checkIn, checkOut);

    const bookedDates = dates.map((date) => ({
      booking_id: newBooking?._id,
      room_id,
      book_date: date,
    }));

    await RoomBookedDate.insertMany(bookedDates);

      // Trả về JSON khi thành công
    return NextResponse.json({
      message: "Order placed successfully",
      status: 200,
      orderId: newBooking._id,
      bookingCode: newBooking.code,
      total: newBooking.total_price,
    });

  } catch (err) {
    console.error("Order creation error:", err);
    return NextResponse.json(
      { err: err.message || "Failed to create order" },
      { status: 500 }
    );
  }
}




























// // app/api/bookings/route.js  (Next.js App Router - Route Handler)
// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import dbConnect from "@/utils/dbConnect"; // hàm kết nối mongoose
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/utils/authOptions";

// import Booking from "@/model/booking";
// import RoomBookedDate from "@/model/roombookeddate";
// import Room from "@/model/room"; // (tùy muốn update trạng thái phòng)

// // ---------------- Helper functions ----------------

// /**
//  * Parse a 'YYYY-MM-DD' string to a local Date at midnight.
//  * Returns null if input invalid.
//  */
// function parseYMDToLocalDate(ymd) {
//   if (!ymd || typeof ymd !== "string") return null;
//   const parts = ymd.split("-").map((p) => Number(p));
//   if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return null;
//   const [y, m, d] = parts;
//   // new Date(year, monthIndex, day) -> local midnight
//   return new Date(y, m - 1, d);
// }

// /**
//  * Generate array of Date objects representing nights to be booked.
//  * This is EXCLUSIVE of checkout date (i.e., includes checkIn, up to day before checkOut).
//  * Example: checkIn=2025-10-01, checkOut=2025-10-04 => dates for 1,2,3 (3 nights).
//  */
// function generateNightsRange(checkInDate, checkOutDate) {
//   const dates = [];
//   const current = new Date(checkInDate);
//   // ensure we only include nights where current < checkOutDate
//   while (current < checkOutDate) {
//     dates.push(new Date(current)); // push a copy
//     current.setDate(current.getDate() + 1); // next day
//   }
//   return dates;
// }

// /** Simple booking code generator (not guaranteed unique) */
// function generateBookingCode(length = 8) {
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
// }

// // ---------------- Route handler ----------------

// export async function POST(req) {
//   // 1) Ensure DB connected before anything
//   await dbConnect();

//   // 2) Auth: get session on server
//   const session = await getServerSession(authOptions);

//   if (!session?.user?._id) {
//     // Not authenticated -> 401
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }

//   // 3) Parse body safely
//   let body;
//   try {
//     body = await req.json();
//   } catch (err) {
//     // Invalid JSON
//     return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
//   }

//   // Accept either room_id or roomId from client for flexibility
//   const roomId = body.room_id || body.roomId;
//   const checkInStr = body.checkIn;
//   const checkOutStr = body.checkOut;
//   const guests = Number(body.guests || body.people || 1);
//   const rooms = Number(body.rooms || 1);
//   const pricePerNight = Number(body.pricePerNight || body.actual_price || 0);
//   const subtotal = Number(body.subtotal || 0);
//   const discountAmount = Number(body.discountAmount || body.discount || 0);
//   const total = Number.isFinite(Number(body.total)) ? Number(body.total) : null;
//   const billingDetails = body.billingDetails || {};
//   const paymentMethod = body.paymentMethod || "cod"; // default COD if none

//   // 4) Basic validation (required fields)
//   if (!roomId || !checkInStr || !checkOutStr) {
//     return NextResponse.json({ error: "Missing required fields: roomId / checkIn / checkOut" }, { status: 400 });
//   }

//   // 5) Parse dates (local midnight) and validate ordering
//   const checkInDate = parseYMDToLocalDate(checkInStr);
//   const checkOutDate = parseYMDToLocalDate(checkOutStr);

//   if (!checkInDate || !checkOutDate) {
//     return NextResponse.json({ error: "Invalid date format. Use YYYY-MM-DD." }, { status: 400 });
//   }

//   if (checkOutDate <= checkInDate) {
//     return NextResponse.json({ error: "Check-out must be after check-in" }, { status: 400 });
//   }

//   // Calculate nights (integer)
//   const msPerDay = 24 * 60 * 60 * 1000;
//   const nights = Math.round((checkOutDate - checkInDate) / msPerDay);
//   // optional: cap nights if your business rules require (e.g., max 30 nights)
//   // if (nights > 30) return NextResponse.json({ error: "Max booking length is 30 nights" }, { status: 400 });

//   // Compose list of nights (dates to block) - excludes checkout
//   const nightsToBook = generateNightsRange(checkInDate, checkOutDate);

//   // 6) Start mongoose session & transaction for atomicity
//   const mongoSession = await mongoose.startSession();

//   try {
//     // Run everything inside transaction
//     await mongoSession.withTransaction(async () => {
//       // 6.1) Availability check:
//       // Query RoomBookedDate collection for any overlapping booked date for same room.
//       // We check if any document exists with room_id == roomId and book_date in nightsToBook.
//       // NOTE: book_date stored as Date at midnight — our nightsToBook are Date at local midnight as well.
//       const conflict = await RoomBookedDate.findOne({
//         room_id: roomId,
//         book_date: { $in: nightsToBook }
//       }).session(mongoSession);

//       if (conflict) {
//         // If conflict found, throw inside transaction -> will abort
//         throw new Error("Room is not available for the selected dates");
//       }

//       // 6.2) Build booking document
//       const bookingData = {
//         rooms_id: roomId,
//         user_id: session.user._id,
//         check_in: checkInStr,
//         check_out: checkOutStr,
//         person: String(guests),
//         number_of_rooms: String(rooms),
//         total_night: nights,
//         actual_price: pricePerNight,
//         subtotal,
//         discount: discountAmount,
//         total_price: total !== null ? parseFloat(Number(total).toFixed(2)) : parseFloat((subtotal - discountAmount).toFixed(2)),
//         payment_method: paymentMethod,
//         transaction_id: "",
//         payment_status: paymentMethod === "cod" ? 0 : 0, // 0 = unpaid by default
//         name: billingDetails.name || session.user.name || "",
//         email: billingDetails.email || session.user.email || "",
//         phone: billingDetails.phone || "",
//         country: billingDetails.country || "",
//         state: billingDetails.state || "",
//         zip_code: billingDetails.zipCode || billingDetails.zip || "",
//         address: billingDetails.address || "",
//         code: generateBookingCode(),
//         status: "inactive", // or "confirmed" depending on payment flow
//       };

//       // 6.3) Create booking (in transaction)
//       const newBooking = await Booking.create([bookingData], { session: mongoSession });
//       // Booking.create with array returns an array of docs
//       const createdBooking = newBooking[0];

//       // 6.4) Prepare bookedDates documents (one doc per night)
//       const bookedDatesDocs = nightsToBook.map((dt) => ({
//         booking_id: createdBooking._id,
//         room_id: roomId,
//         book_date: dt,
//       }));

//       // 6.5) Insert booked dates inside same transaction
//       await RoomBookedDate.insertMany(bookedDatesDocs, { session: mongoSession });

//       // Optional: update Room status or inventory if needed (also within transaction)
//       // await Room.findByIdAndUpdate(roomId, { $inc: { booked_count: rooms } }, { session: mongoSession });

//       // If everything ok, transaction will be committed by withTransaction returning normally.
//       // We can optionally return something from here, but we'll construct response below.
//     }); // end withTransaction

//     // 7) Success -> return created booking info (201)
//     return NextResponse.json(
//       {
//         message: "Order placed successfully",
//         // Note: createdBooking is only accessible inside withTransaction; if you need to return booking doc,
//         // you can re-query it here (outside transaction) or design withTransaction to return value.
//       },
//       { status: 201 }
//     );
//   } catch (err) {
//     // Any error thrown inside transaction => rolled back automatically by withTransaction
//     console.error("Order creation error:", err);
//     const msg = err?.message || "Failed to create booking";
//     // If conflict (availability), send 409 Conflict
//     if (msg.toLowerCase().includes("not available")) {
//       return NextResponse.json({ error: msg }, { status: 409 });
//     }
//     return NextResponse.json({ error: msg }, { status: 500 });
//   } finally {
//     // End session
//     try {
//       mongoSession.endSession();
//     } catch (e) {
//       // ignore
//     }
//   }
// }
