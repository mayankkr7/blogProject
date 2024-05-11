import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-blue2 pt-8">
            <div className="max-w-screen-lg px-4 sm:px-6 text-gray-100 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
                <div className="p-5">
                    <Link to="/" className=' cursor-text'>
                        <h3 className="font-bold text-xl">JOTTER</h3>
                    </Link>
                </div>
                <div className="p-5">
                    <div className="text-sm uppercase">Resources</div>
                    <Link to="/" className="my-3 block text-gray-100 hover:text-opacity-70">Documentation</Link>
                    <Link to="/" className="my-3 block text-gray-100 hover:text-opacity-70">Tutorials</Link>
                    <Link to="/" className="my-3 block text-gray-100 hover:text-opacity-70">Support</Link>
                </div>
                <div className="p-5">
                    <div className="text-sm uppercase">Support</div>
                    <Link to="/" className="my-3 block text-gray-100 hover:text-opacity-70">Help Center</Link>
                    <Link to="/" className="my-3 block text-gray-100 hover:text-opacity-70">Privacy Policy</Link>
                    <Link to="/" className="my-3 block text-gray-100 hover:text-opacity-70">Conditions</Link>
                </div>
                <div className="p-5">
                    <div className="text-sm uppercase">Contact us</div>
                    <Link to="/" className="my-3 block text-gray-100 hover:text-opacity-70">Tower D, Sector 24, Gurgaon - Haryana 122002</Link>
                    <Link to="/" className="my-3 block text-gray-100 hover:text-opacity-70">contact@jotter.com</Link>
                </div>
            </div>

            <div className="bg-blue2 pt-2">
                <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-100 text-sm flex-col max-w-screen-lg items-center">
                    <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
                        {/* I can add social media icons here */}
                    </div>
                    <div className="my-2 text-gray-400">&copy; Copyright {year}. All Rights Reserved.</div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

