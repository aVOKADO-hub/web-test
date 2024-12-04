import React from "react";
import TestForm from "./components/TestForm";
import LogsTable from "./components/LogsTable";
import "./index.css";

function App() {
    const handleTestSubmit = async (url) => {
        const response = await fetch("/api/test/sql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
        });
        const data = await response.json();
        console.log("Test Results:", data);
    };

    return (
        <div>
            <h1>Automated Security Testing</h1>
            <TestForm onSubmit={handleTestSubmit} />
            <LogsTable />
        </div>
    );
}

export default App;
