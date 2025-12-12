export const ShowcasePage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Showcase</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    A collection of projects demonstrating my journey and capabilities in software engineering.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Placeholder Cards */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-colors group">
                        <div className="h-48 bg-slate-800 flex items-center justify-center text-slate-600">
                            Project Preview Image
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">Project Title {i}</h3>
                            <p className="text-slate-400 text-sm mb-4">
                                A brief description of the project goes here. It explains the core problem solved and the value provided.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-slate-800 text-xs rounded-md text-slate-300">React</span>
                                <span className="px-2 py-1 bg-slate-800 text-xs rounded-md text-slate-300">TypeScript</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};