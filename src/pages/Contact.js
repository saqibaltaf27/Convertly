export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>

      <p className="text-center text-gray-600 mb-8">
        Have questions, feedback, or partnership inquiries? We’d love to hear from you. 
        Use the form below or reach out directly via email.
      </p>

      <div className="bg-white shadow-md rounded-2xl p-6 mb-10">
        <h3 className="text-xl font-semibold mb-3">Our Contact Details</h3>
        <p className="mb-1">
          <span className="font-medium">Email:</span> saqibkh1805@gmail.com
        </p>
        <p className="mb-1">
          <span className="font-medium">Phone:</span> +92 300 1234567
        </p>
        <p className="mb-1">
          <span className="font-medium">Location:</span> Islamabad, Pakistan
        </p>
      </div>

      <form className="bg-white shadow-md rounded-2xl p-6 space-y-4">
        <h3 className="text-xl font-semibold mb-3">Send Us a Message</h3>

        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            placeholder="Write your message..."
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
