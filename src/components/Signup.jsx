import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Logo } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login } from "../store/features/authSlice";

function Signup() {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const signup = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center w-auto mx-8">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block mb-4">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)} className='mt-8'>
                    <div className="space-y-5">
                        <Input
                            label="Full Name "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: "Full Name is required",
                            })}
                        />
                        {errors.name && <p className="text-red-600">{errors.name.message}</p>}

                        <Input
                            label="Email "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be a valid address",
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})/,
                                    message: "Password must be 8 to 20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-600">{errors.password.message}</p>}

                        <Button type="submit" className="w-full bg-button1 hover:bg-button2 active:bg-button3 ">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;