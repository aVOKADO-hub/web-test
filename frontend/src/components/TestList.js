import React, { useEffect, useState } from 'react';
import { fetchTests } from '../services/api';

const TestList = () => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const getTests = async () => {
            const { data } = await fetchTests();
            setTests(data);
        };
        getTests();
    }, []);

    return (
        <div>
            <h2>Available Tests</h2>
            <ul>
                {tests.map((test) => (
                    <li key={test._id}>{test.testName}</li>
                ))}
            </ul>
        </div>
    );
};

export default TestList;
