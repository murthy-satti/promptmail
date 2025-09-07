export default function Contactpage() {
    return (
        <div className="min-h-screen bg-gray-950  flex items-center justify-center p-2 md:p-4 mt-5 md:mt-2">
            <div className="w-full max-w-md">
                <div className="bg-[#202020] rounded-2xl p-2 md:p-4 xl:p-8 border border-gray-700 relative gradient-shadow">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Get in touch with us</h1>
                        <p className="text-gray-400 text-sm">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                    </div>
                    
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="First Name"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Last Name"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <input 
                                type="email" 
                                placeholder="Email Address"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                        
                        <div>
                            <input 
                                type="tel" 
                                placeholder="Phone Number"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                        
                        <div>
                            <textarea 
                                placeholder="How can we help you?"
                                rows={4}
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                            ></textarea>
                        </div>
                        
                        <button 
                            type="submit"
                            className="w-full bg-white text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}