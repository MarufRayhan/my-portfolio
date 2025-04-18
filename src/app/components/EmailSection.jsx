"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const email = "maruf.rayhan14@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    console.log("Submitting form data:", data);
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    try {
      const response = await fetch(endpoint, options);
      const resData = await response.json();

      if (response.ok) {
        console.log("Message sent successfully:", resData);
        setEmailSubmitted(true);
        e.target.reset(); // Clear form fields
      } else {
        console.error("Failed to send message:", resData);
        setError(resData.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-16 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">
          Let&apos;s Connect
        </h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          I&apos;m currently looking for new opportunities. Whether you have a
          question or just want to say hi, I&apos;ll get back to you! Below is
          my personal email address or you can fill out the form to send me a
          message &#128578;!
        </p>
        <div className="flex items-center bg-gray-800/50 rounded-lg px-4 py-2 mb-6 border border-white/10 max-w-md">
          <span className="text-white mr-2 font-medium">{email}</span>
          <button
            onClick={handleCopyEmail}
            className="ml-auto bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md transition-colors flex items-center"
            aria-label="Copy email"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                <span className="text-xs">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="socials flex flex-row gap-2">
          {/* Add your social media icons here */}
        </div>
      </div>
      <div>
        {emailSubmitted ? (
          <div className="rounded-xl border border-primary-500 p-8 flex flex-col items-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Thank you for your message!
            </h3>
            <p className="text-[#ADB7BE]">
              I'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setEmailSubmitted(false)}
              className="px-6 py-3 rounded-full bg-primary-500 hover:bg-primary-600 text-white mt-4"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-white block mb-2 text-sm font-medium"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="jacob@google.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-white block text-sm mb-2 font-medium"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Just saying hi"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-white block text-sm mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Let's talk about..."
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary-500  hover:bg-slate-800 text-white font-medium py-2.5 px-5 rounded-lg w-full disabled:opacity-70 border border-primary-700"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
