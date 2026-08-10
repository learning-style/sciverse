import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Showcase', path: '/showcase' },
    { label: 'Contact', path: '/contact' },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold tracking-tight text-white">
                            Citizen<span className="text-blue-500">Architect</span>
                        </Link>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        location.pathname === item.path
                                            ? 'text-blue-400'
                                            : 'text-slate-300 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-300 hover:text-white p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-slate-900 border-b border-slate-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    location.pathname === item.path
                                        ? 'text-blue-400 bg-slate-800'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};