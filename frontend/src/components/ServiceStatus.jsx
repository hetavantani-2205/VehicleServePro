import { useEffect, useState } from "react";

export default function ServiceStatus({ bookingId }) {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
  if (!bookingId) return;

  const fetchBooking = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Booking not found");
        }
        return res.json();
      })
      .then(data => {
        console.log("Fetched booking:", data);
        setBooking(data);
      })
      .catch(err => {
        console.error("Fetch error:", err);
      });
  };

  fetchBooking();

  const interval = setInterval(fetchBooking, 4000);

  return () => clearInterval(interval);

}, [bookingId]);

   if (!booking) {
  return <h3 style={{ padding: "40px" }}>Loading booking...</h3>;
}

return (
  <div style={{ padding: "40px" }}>
    <h2>Track Your Service</h2>

    <p><strong>Name:</strong> {booking.name}</p>
    <p><strong>Car:</strong> {booking.carNumber}</p>
    <p>
      <strong>Status:</strong>{" "}
      <span style={{ color: "blue", fontWeight: "bold" }}>
        {booking.status}
      </span>
    </p>

    <p style={{ marginTop: "20px", color: "#666" }}>
      Status auto-updates every few seconds.
    </p>
  </div>
);
}
