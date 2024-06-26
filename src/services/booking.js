import supabase from "../lib/supabase";
import { incrementId } from "./utils";

export const createBooking = async (
  userId,
  fieldId,
  bookingDate,
  startTime,
  endTime,
) => {
  const { data, error } = await supabase.from("booking").insert([
    {
      bookingid: await incrementId("booking"),
      userid: userId,
      fieldid: fieldId,
      bookingdate: bookingDate,
      starttime: startTime,
      endtime: endTime,
    },
  ]);

  if (error) {
    console.error("Error creating booking:", error);
    throw error;
  }

  return data;
};

export const getBookings = async (userId) => {
  const { data, error } = await supabase.from("booking").select("*");

  if (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }

  return data;
};

export const getBookingsByUserId = async (userId) => {
  const { data, error } = await supabase
    .from("booking")
    .select("*")
    .eq("userid", userId);

  if (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }

  return data;
};

export const getBookingById = async (bookingId) => {
  const { data, error } = await supabase
    .from("booking")
    .select("*")
    .eq("bookingid", bookingId)
    .single();

  if (error) {
    console.error(`Error fetching booking with ID ${bookingId}:`, error);
    throw error;
  }

  return data;
};
