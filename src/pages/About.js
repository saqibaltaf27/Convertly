export default function About() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 to-indigo-600 text-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            About <span className="text-yellow-300">Convertly</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Empowering individuals and businesses to simplify their document workflows —
            compress, convert, and collaborate with ease.
          </p>
        </div>
      </section>

      {/* Mission + Story */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-center">Our Mission</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            We believe managing digital documents should be effortless. Convertly was created to
            remove technical barriers and deliver a clean, fast, and secure platform for everyone —
            from freelancers to global enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Team collaborating on laptops"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3">Where We Started</h3>
            <p className="text-gray-600 leading-relaxed">
              Our journey began as a small side project aiming to make PDF compression simpler.
              Today, Convertly supports dozens of formats and has become a trusted platform for
              thousands of users worldwide.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              As we continue to grow, our focus remains the same: build intuitive, lightning-fast
              tools that help people save time and stay productive.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2 text-blue-700">Simplicity</h4>
              <p className="text-gray-600">
                We craft tools with clean design and zero clutter — so you can focus on your work,
                not on figuring out our UI.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2 text-blue-700">Security</h4>
              <p className="text-gray-600">
                Your files are protected with enterprise-grade encryption. Privacy isn’t a feature —
                it’s our foundation.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2 text-blue-700">Innovation</h4>
              <p className="text-gray-600">
                We constantly evolve our tools, integrating AI and modern tech to stay ahead and
                give you more power in fewer clicks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Simplify Your Document Management?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of professionals who trust Convertly for their daily work.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-yellow-300 transition transform hover:-translate-y-1"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}
