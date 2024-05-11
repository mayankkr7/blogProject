import React from "react";

export default function Button({
    children,  // here (children) can be called anything like btnText,..etc.
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props  // if user also give another attributes other than className, then we can pass that using it(...props) spreading here
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}