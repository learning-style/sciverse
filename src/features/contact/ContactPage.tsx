export const ContactPage = () => {
    return (
        <div className="max-w-2xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
            <div className="bg-slate-900 rounded-xl p-8 border border-slate-800">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                        <input 
                            type="text" 
                            id="name"
                            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                        <textarea 
                            id="message"
                            rows={5}
                            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
                            placeholder="How can I help you?"
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};