// @ts-nocheck
import { useState } from 'react';

const usePost = () => {
    const [postData, setData] = useState(null);
    const [postLoading, setLoading] = useState(false)
    const [postError, setError] = useState(null)

    const postFetch = async (url, formData) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/todo${url}`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            console.log(response.ok)
            if (!response.ok) {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.message || 'Unknown error'
                console.log(errorMessage)
                throw new Error(`POST status: ${response.status} <br> Error message: ${errorMessage}`);
            }
            const result = await response.json();
            setData(result)

        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }

    }

    return { postFetch, postData, postLoading, postError }
};

export default usePost;