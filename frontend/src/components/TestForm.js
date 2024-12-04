import React, { useState } from 'react';

function TestForm() {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Ensure URL is provided
        if (!url) {
            setStatus('Please provide a URL');
            return;
        }

        try {
            // Send POST request to your backend to perform SQL injection test
            const response = await fetch("http://localhost:5000/api/test/sql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus(result.status);
            } else {
                setStatus("Error testing website");
            }

            // Reload the page to fetch updated logs
            window.location.reload();

        } catch (error) {
            console.error("Error during website testing:", error);
            setStatus("Error testing website");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                URL to Test:
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
            {status && <p>{status}</p>}
        </form>
    );
}

export default TestForm;
