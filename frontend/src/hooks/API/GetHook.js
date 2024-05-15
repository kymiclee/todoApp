// @ts-nocheck
import { useState, useEffect } from 'react';

const useGet = (queryParams = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async (url) => {
        try {
            setLoading(true);
            const response = await fetch(`api/todo/${url}`, { credentials: 'include' });
            if (!response.ok) {
                throw new Error(`Fetch failed with status ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, data, loading, error }
};
export default useGet