import React from "react";
import { Container, PostForm } from "../components";
import Protected from "../components/AuthLayout";

function AddPost() {
    return (
        <div className='py-8'>
            <Container>
                <Protected>
                    <PostForm />
                </Protected>
            </Container>
        </div>
    )
}

export default AddPost;