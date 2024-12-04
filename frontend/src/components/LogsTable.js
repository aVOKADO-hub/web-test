import React, { useEffect, useState } from "react";
import "../style/logsTable.css";

function LogsTable() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        // Fetch logs from the server
        fetch("http://localhost:5000/api/logs")
            .then((response) => response.json())
            .then((data) => setLogs(data));
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Vulnerability</th>
                    <th>Status</th>
                    <th>Payload</th>
                    <th>Tested At</th>
                </tr>
            </thead>
            <tbody>
                {logs.map((log) => (
                    <tr key={log._id}>
                        <td>{log.url}</td>
                        <td>{log.vulnerability ? log.vulnerability.join(', ') : "No vulnerabilities found"}</td>
                        <td>{log.status}</td>
                        <td>{log.payload}</td>
                        <td>{new Date(log.testedAt).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default LogsTable;
