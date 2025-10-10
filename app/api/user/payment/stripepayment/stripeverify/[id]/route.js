// Import necessary modules and functions
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Booking from "@/model/booking";

import Stripe from "stripe"; // Import Stripe API library for handling payments



// Initialize Stripe instance with a secret key (do not expose secret keys in production)
const stripeInstance = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);



export async function GET(req  ,context) {
  await dbConnect();

  const {id}=await  context?.params
  try {
    
     // Retrieve the Stripe session details using the session ID passed in the context
    const stripesession = await stripeInstance.checkout.sessions.retrieve(
     id // Retrieve session ID from URL params (provided by Stripe)
    );

  

  const bookingId = stripesession?.metadata?.booking_id;


    // Check if payment is successful
    if (stripesession && stripesession?.payment_status === "paid") {
      // Update the booking with payment details
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          transaction_id: stripesession.id, // Use payment._id or payment.id as transaction_id
          payment_status: "1", // Or you can use "completed", "success", etc.
        },
        { new: true } // Return the updated document
      );

      if (!updatedBooking) {
        return NextResponse.json(
          { error: "Booking not found" },
          { status: 404 }
        );
      }

      console.log("Updated booking:", updatedBooking);
      
      return NextResponse.json(
        { success: "Payment successful and booking updated" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { failed: "Payment failed, try again" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.log("payment error", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}