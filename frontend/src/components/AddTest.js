import React, { useState } from 'react';
import { createTest } from '../services/api';

const AddTest = () => {
    const [testName, setTestName] = useState('');
    const [testDescription, setTestDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const test = { testName, testDescription };
        await createTest(test);
        setTestName('');
        setTestDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Test Name"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={testDescription}
                onChange={(e) => setTestDescription(e.target.value)}
                required
            ></textarea>
            <button type="submit">Add Test</button>
        </form>
    );
};

export default AddTest;
