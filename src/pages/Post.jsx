import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/setup";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((isLogin) => {
            if (isLogin) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 px-5 bg-blue4 h-full">
            <div className="w-full mb-6">
                <h1 className="text-2xl text-gray-100 font-bold">{post.title}</h1>
            </div>
            <div className="browser-css text-white">
                {parse(post.content)}


                {/* Edit and Delete buttons (for larger screens) */}
                <div className="absolute right-6 top-36 hidden md:block">
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor="bg-green-500" className="mr-3">
                            Edit
                        </Button>
                    </Link>
                    <Button bgColor="bg-red-500" onClick={deletePost}>
                        Delete
                    </Button>
                </div>

                {/* Edit and Delete buttons (for mobile) */}
                <div className="md:hidden align-bottom ml-52 mt-3">
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor="bg-green-500" className="mr-3 mb-2">
                            Edit
                        </Button>
                    </Link>
                    <Button bgColor="bg-red-500" onClick={deletePost}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    ) : null;
}

