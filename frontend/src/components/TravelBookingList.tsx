import "../style/TravelBookingList.css";

export interface TravelBooking {
  id: string;
  duration: string;
  additionalnotes: string;
  flightvisa: string[];
  holidaybudget: number;
  holidaybudgetcurrency: string;
  holidayvibe: string;
  hotelpref: string[];
  packagetype: string;
  status: string;
  submittedat: string;
}

interface TravelBookingListProps {
  bookings: TravelBooking[];
}


export default function TravelBookingList(bookings: TravelBookingListProps) {
    return (
        <div className="booking-list">
            {bookings.bookings.map((booking) => (
                <div key={booking.id} className="booking-item">
                    {/* Left section */}
                    <div className="booking-details">
                        <h2 className="package-type">
                            {booking.packagetype || "Travel Package"}
                        </h2>
                        <span
                            className={`status ${booking.status === "confirmed"
                                ? "confirmed"
                                : booking.status === "pending"
                                    ? "pending"
                                    : "other"
                                }`}
                        >
                            {booking.status || "Pending"}
                        </span>

                        {booking.duration && (
                            <p className="info">📅 Duration: {booking.duration}</p>
                        )}

                        {booking.flightvisa?.length > 0 && (
                            <p className="info">✈️ Flight: {booking.flightvisa.join(", ")}</p>
                        )}

                        {booking.hotelpref?.length > 0 && (
                            <p className="info">🏨 Hotel: {booking.hotelpref.join(", ")}</p>
                        )}

                        {(booking.holidaybudget || booking.holidaybudgetcurrency) && (
                            <p className="info">
                                💰 Budget: {booking.holidaybudgetcurrency || "$"}
                                {booking.holidaybudget || "N/A"}
                            </p>
                        )}

                        {booking.holidayvibe && (
                            <p className="vibe">“{booking.holidayvibe}”</p>
                        )}

                        {booking.additionalnotes && (
                            <p className="notes">{booking.additionalnotes}</p>
                        )}

                        {booking.submittedat && (
                            <p className="submitted">
                                Submitted at: {new Date(booking.submittedat).toLocaleString()}
                            </p>
                        )}
                    </div>

                    {/* Right section */}
                    <div className="booking-action">
                        <button className="details-btn">View Details</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
