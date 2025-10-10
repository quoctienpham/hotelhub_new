import dbConnect from "@/utils/dbConnect";
import Booking from "@/model/booking";
import BookedRoomlist from "@/model/bookingroomlist";
import { NextResponse } from "next/server";
import RoomNumber from "@/model/roomnumber";

export async function POST(req) {
  const body = await req.json();
  const { bookingId, roomsId, roomNumber } = body;

  try {
    await dbConnect();

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json({ message: "Booking not found" });
    }

    const assignedCount = await BookedRoomlist.countDocuments({
      booking_id: bookingId,
    });

    if (assignedCount < booking.number_of_rooms) {
      const assignData = new BookedRoomlist({
        booking_id: bookingId,
        room_id: roomsId,
        room_number_id: roomNumber,
      });

      await assignData.save();

      // ✅ Update the status field to 0 based on RoomNumber _id
      await RoomNumber.findByIdAndUpdate(roomNumber, {
        $set: { status: 0 },
      });

      return NextResponse.json({
        message: "Room assigned successfully",
        alertType: "success",
      });
    } else {
      return NextResponse.json({
        message: "Room already assigned",
        alertType: "error",
      });
    }
  } catch (error) {
    console.error("Assign Room Error:", error);
    return NextResponse.json({
      message: "Server error",
      alertType: "error",
    });
  }
}
