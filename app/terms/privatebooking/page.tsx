const Page = () => {

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Terms & Conditions</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Consultation and Agreement</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Before booking any services, clients must fill out our consultation form to ensure we understand their preferences and budget.</li>
          <li>A detailed holiday plan will be provided based on the client’s submitted information and agreed preferences.</li>
          <li>Clients must confirm the holiday plan within a specific time frame (usually 48-72 hours) to proceed with bookings.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Pricing and Payments</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Our fees are included in the total cost of your holiday package, which covers the location, hotel bookings, and any arranged services (e.g., flights, visa applications, excursions).</li>
          <li>Additional services outside of the agreed package (e.g., upgrades, extra activities) will incur extra charges, which will be discussed and approved by the client.</li>
          <li>Payments are due in full upon final approval of the holiday plan before bookings are made.</li>
          <li>While we strive to plan your holiday based on your specified budget, please be aware that if you choose a package that exceeds your budget, we may request an adjustment to your budget to accommodate your preferred selection.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Cancellations and Refunds</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Once a booking has been confirmed, cancellation policies of the individual service providers (hotels, airlines, etc.) apply. These will be communicated to the client before payment.</li>
          <li>If a client decides to cancel after the booking is confirmed, a cancellation fee may apply based on the providers' terms.</li>
          <li>Refunds for services already paid will be issued only if the service providers allow for refunds or cancellations.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Responsibility and Liability</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>While we strive to ensure all bookings and arrangements are handled smoothly, we are not responsible for delays, cancellations, or issues caused by third-party vendors (airlines, hotels, tour operators).</li>
          <li>It is the client’s responsibility to ensure they have the proper documentation (e.g., passport, visa) before traveling. We will assist with visa applications when applicable.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Client Privacy and Data Protection</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>We take your privacy seriously and will never share your personal information with third parties without your consent.</li>
          <li>All data provided for booking purposes will only be used to create your holiday plan and will be securely stored.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Modifications to Services</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>We reserve the right to modify or update our services or policies to ensure quality and efficiency.</li>
          <li>Any changes to services, pricing, or policies will be communicated to the client promptly.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Customer Support</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Our team is available to assist you with any questions or concerns before, during, and after your holiday. Contact details for customer support are provided on our website and in your holiday plan.</li>
        </ul>
      </section>

      <p className="text-center mt-4">
        By booking with us, you agree to these terms and acknowledge that you understand our pricing, cancellation, and service policies.
      </p>
    </div>
  );
}

export default Page;