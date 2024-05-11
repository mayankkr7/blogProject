import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/setup";
import { Container, PostCard } from "../components";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await appwriteService.getPosts([]);
                if (result) {
                    setPosts(result.documents.reverse());
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                {error ? (
                    <div className="flex items-center justify-center w-full">
                        <p className="text-red-500">Error: {error.message}</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap">
                        {isLoading ? (
                            <div className="flex items-center justify-center w-full h-screen">
                                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <div key={post.$id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                                    <PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} />
                                </div>
                            ))
                        )}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;

