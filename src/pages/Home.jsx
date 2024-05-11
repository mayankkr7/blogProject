import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/setup";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { useSelector } from "react-redux";

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isLogin = useSelector((state) => state.auth.isLogin);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isLogin) {
                    const posts = await appwriteService.getPosts();
                    if (posts) {
                        setPosts(posts.documents.reverse());
                    }
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isLogin) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [isLogin]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
        );
    }

    if (!isLogin) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="w-full text-center">
                    <div className="relative w-fit h-fit">
                        <img
                            src="https://images.unsplash.com/photo-1505051508008-923feaf90180?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Background"
                            className='inset-0 h-screen w-screen'
                            style={{ opacity: 0.5 }}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <h1 className="text-4xl font-bold text-homeFont">
                                <Typewriter
                                    options={{
                                        strings: ["Welcome to your Personal Blog"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </h1>
                            <Link
                                to="/login"
                                className="mt-4 px-4 py-2 text-lg font-semibold text-white bg-button1 hover:bg-button2 active:bg-button3 rounded-lg transition-colors duration-300"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 text-center">
                <h1 className="font-bold text-homeFont">No posts available</h1>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                            <PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;


