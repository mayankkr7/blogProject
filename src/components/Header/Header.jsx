import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";

function Header() {
    const authStatus = useSelector((state) => state.auth.isLogin);
    const navigate = useNavigate();
    const location = useLocation();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navRef = useRef(null);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsNavOpen(false);
            }
        };

        document.body.addEventListener("click", handleOutsideClick);

        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    // Nav-bar items in array
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];

    return (
        <header className="bg-blue2 text-gray-400 sticky top-0 z-50">
            <Container>
                <div className="container mx-auto px-4">
                    <nav className="flex items-center justify-between py-2" ref={navRef}>

                        <div className="flex items-center">
                            <Link to="/">
                                <Logo width="70px" />
                            </Link>
                        </div>

                        <ul className="hidden md:flex space-x-4">
                            {navItems.map((item) => item.active && (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className={`inline-block px-6 mr-8 py-2 duration-200 rounded-full hover:bg-blue3 ${location.pathname === item.slug ? 'text-white' : ''}`}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>

                        {/* Menu Icon */}
                        <div className="md:hidden">
                            <button onClick={toggleNav} className="block text-white focus:outline-none">
                                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M21 6H3V5h18v1zM21 10H3v1h18v-1zM21 14H3v1h18v-1z" />
                                </svg>
                            </button>
                        </div>
                    </nav>

                    {/* Mobile Navigation */}
                    <div className={`md:hidden ${isNavOpen ? 'block' : 'hidden'}`}>
                        <ul className="py-2">
                            {navItems.map((item) => item.active && (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className={`block py-2 px-4 hover:bg-blue3 ${location.pathname === item.slug ? 'text-blue-300' : 'text-white'}`}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;

