"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Contactpage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await fetch("/api/contactpage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(" Message sent successfully!", { icon: "✅" });
                setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
            } else {
                toast.error(` Failed: ${data.error || "Something went wrong"}`, { icon: "❌" });
            }
        } catch (error) {
            toast.error(" Error sending message.", { icon: "❌" });
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen dark:bg-gray-950 flex items-center justify-center p-2 md:p-4 mt-6 md:mt-2">
            <div className="w-full max-w-md">
                <div className="bg-[#202020] rounded-2xl p-2 md:p-4 xl:p-8 border border-gray-700 relative gradient-shadow">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Get in touch with us</h1>
                        <p className="text-gray-400 text-sm">
                            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="How can we help you?"
                                rows={4}
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`cursor-pointer w-full font-semibold py-3 px-6 rounded-lg transition-colors duration-200 
    ${loading
                                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                                    : "bg-white text-gray-900 hover:bg-gray-100"
                                }`}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
}
