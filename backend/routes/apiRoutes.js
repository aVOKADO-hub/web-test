const express = require('express');
const axios = require('axios');
const Log = require('../models/Log');
const router = express.Router();

// ZAP API base URL (adjust if necessary)
const ZAP_API_URL = 'http://localhost:8080';

// SQL Injection Test using ZAP API
router.post("/test/sql", async (req, res) => {
    const { url } = req.body;

    // Validate URL format
    if (!url) {
        return res.status(400).json({ message: "URL is required" });
    }

    try {
        // Start the scan using ZAP API
        const scanResponse = await axios.get(`${ZAP_API_URL}/json/ascan/action/scan`, {
            params: {
                url: url,
                recurse: true,  // Recurse through the site
                inScopeOnly: true, // Test only URLs within the site
                scanContext: '',  // Optional: Define specific context if necessary
            }
        });

        const scanId = scanResponse.data.scan;

        // Check the scan status to see if it's finished
        let scanStatus = '';
        let vulnerabilities = [];
        
        while (true) {
            // Wait and check the scan status
            const statusResponse = await axios.get(`${ZAP_API_URL}/json/ascan/view/status`, {
                params: { scanId }
            });

            scanStatus = statusResponse.data.status;
            if (scanStatus === '100') {  // 100 means scan is complete
                break;
            }

            // Wait for a short period before checking again
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        // Once the scan is complete, fetch the vulnerabilities
        const vulnResponse = await axios.get(`${ZAP_API_URL}/json/alert/view/alerts`, {
            params: { baseurl: url, start: 0, count: 10 }
        });

        vulnerabilities = vulnResponse.data.alerts.map(alert => alert.alert);

        // Log the result
        const log = new Log({
            url,
            vulnerability: vulnerabilities.length > 0 ? vulnerabilities : ["No vulnerabilities found"],
            status: vulnerabilities.length > 0 ? 'success' : 'no vulnerabilities',
            payload: '',  // Optional: You can add the payload if you're testing with specific patterns
        });

        await log.save();

        res.json({
            status: "success",
            vulnerabilities: vulnerabilities.length > 0 ? vulnerabilities : ["No vulnerabilities found"],
        });

    } catch (error) {
        console.error("Error during website testing:", error);
        res.status(500).json({ message: "Error testing website", error: error.message });
    }
});

module.exports = router;
