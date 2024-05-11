import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Button, SelectBtn, RTE } from "../index";
import appwriteService from "../../appwrite/setup";

function PostForm({ post }) {
    const { register, handleSubmit, setValue, getValues, watch, control } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submit = async (data) => {
        setLoading(true);
        try {
            if (post) {
                const updatePost = await appwriteService.updatePost(post.$id, {
                    ...data,
                });
                if (updatePost) {
                    navigate(`/post/${updatePost.$id}`);
                }
            } else {
                const createPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                });
                if (createPost) {
                    navigate(`/post/${createPost.$id}`);
                }
            }
        } catch (error) {
            // setError(error.message || "An error occurred");
            setError("An error occurred while submitting the form.");
            console.error("Server error:", error);
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue, slugTransform]);

    return (
        <>
            {loading && (
                <div className="flex items-center justify-center w-full">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
            )}
            {error && <div className="text-red-500">{error}</div>}
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                <div className="w-2/3 px-2">
                    <Input label="Title :" placeholder="Title" className="mb-4" {...register("title", { required: true })} />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className="w-1/3 px-2">
                    <SelectBtn
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4 mt-7"
                        {...register("status", { required: true })}
                    />
                    <Button
                        type="submit"
                        bgColor={post ? "bg-green-500" : undefined}
                        className="w-full mt-7 bg-button1 hover:bg-button2 active:bg-button3"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </>
    );
}

export default PostForm;



















































// import React, { useCallback, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Input, Button, SelectBtn, RTE } from "../index";
// import appwriteService from "../../appwrite/setup";

// function PostForm({ post }) {
//     const { register, handleSubmit, setValue, getValues, watch, control } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             slug: post?.$id || "",
//             content: post?.content || "",
//             status: post?.status || "active",
//         },
//     });

//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const submit = async (data) => {
//         setLoading(true);
//         try {
//             let result;
//             if (post) {
//                 result = await appwriteService.updatePost(post.$id, { ...data });
//             } else {
//                 result = await appwriteService.createPost({ ...data, userId: userData.$id });
//             }
//             if (result) {
//                 navigate(`/post/${result.$id}`);
//             }
//         } catch (error) {
//             setError("An error occurred while submitting the form.");
//             console.error("Server error:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string") {
//             return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
//         }
//         return "";
//     }, []);

//     useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "title") {
//                 setValue("slug", slugTransform(value.title), { shouldValidate: true });
//             }
//         });
//         return () => subscription.unsubscribe();
//     }, [watch, setValue, slugTransform]);

//     return (
//         <>
//             {loading && (
//                 <div className="flex items-center justify-center w-full">
//                     <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
//                 </div>
//             )}
//             {error && <div className="text-red-500">{error}</div>}
//             <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//                 <div className="w-2/3 px-2">
//                     <Input label="Title :" placeholder="Title" className="mb-4" {...register("title", { required: true })} />
//                     <Input
//                         label="Slug :"
//                         placeholder="Slug"
//                         className="mb-4"
//                         {...register("slug", { required: true })}
//                         onInput={(e) => {
//                             setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                         }}
//                     />
//                     <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
//                 </div>
//                 <div className="w-1/3 px-2">
//                     <SelectBtn
//                         options={["active", "inactive"]}
//                         label="Status"
//                         className="mb-4 mt-7"
//                         {...register("status", { required: true })}
//                     />
//                     <Button
//                         type="submit"
//                         bgColor={post ? "bg-green-500" : undefined}
//                         className="w-full mt-7 bg-button1 hover:bg-button2 active:bg-button3"
//                         disabled={loading}
//                     >
//                         {loading ? "Submitting..." : post ? "Update" : "Submit"}
//                     </Button>
//                 </div>
//             </form>
//         </>
//     );
// }

// export default PostForm;


