import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingIcon({ loading }) {
    if (!loading) {
        return null
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {loading && (
                <>
                    <ClipLoader
                        color="#000000"
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </>
            )}
        </div>
    );
}