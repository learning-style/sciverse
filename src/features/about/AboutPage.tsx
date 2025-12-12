export const AboutPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-8">About Me</h2>
            <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-slate-400">
                    [Placeholder] I am a Citizen Architect, dedicated to crafting software that bridges the gap between technical complexity and human utility.
                </p>
                <div className="mt-8 p-6 bg-slate-900 rounded-lg border border-slate-800">
                    <h3 className="text-xl font-semibold mb-4 text-white">Core Skills</h3>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-slate-300">
                        <li>• React & TypeScript</li>
                        <li>• Modern CSS (Tailwind)</li>
                        <li>• Node.js</li>
                        <li>• System Architecture</li>
                        <li>• UX/UI Design</li>
                        <li>• Git & CI/CD</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};