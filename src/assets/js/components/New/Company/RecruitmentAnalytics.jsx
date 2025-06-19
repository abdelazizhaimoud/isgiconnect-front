import React, { useEffect, useState } from 'react';
import axios from '../../../api/getUser' // Adjust path if necessary
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const RecruitmentAnalytics = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get('/api/recruitment-analytics', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setAnalyticsData(response.data);
            } catch (err) {
                console.error('Error fetching recruitment analytics:', err);
                setError(err.response?.data?.message || 'Failed to fetch recruitment analytics.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return <p>Loading recruitment analytics...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!analyticsData) {
        return <p>No analytics data available.</p>;
    }

    // Prepare data for Applications by Status Pie Chart
    const applicationsByStatusData = {
        labels: Object.keys(analyticsData.applications_by_status || {}),
        datasets: [
            {
                data: Object.values(analyticsData.applications_by_status || {}),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                ],
            },
        ],
    };

    // Prepare data for Applications per Job Posting Bar Chart
    const applicationsPerJobPostingData = {
        labels: analyticsData.applications_per_job_posting.map(item => item.job_posting.title),
        datasets: [
            {
                label: 'Number of Applications',
                data: analyticsData.applications_per_job_posting.map(item => item.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="recruitment-analytics-container">
            <h2>Recruitment Analytics</h2>
            <div className="analytics-summary">
                <div className="summary-card">
                    <h3>Total Job Postings</h3>
                    <p>{analyticsData.total_job_postings}</p>
                </div>
                <div className="summary-card">
                    <h3>Total Applications</h3>
                    <p>{analyticsData.total_applications}</p>
                </div>
            </div>

            <div className="analytics-charts">
                <div className="chart-card">
                    <h3>Applications by Status</h3>
                    <Pie data={applicationsByStatusData} />
                </div>
                <div className="chart-card">
                    <h3>Applications per Job Posting</h3>
                    <Bar data={applicationsPerJobPostingData} />
                </div>
            </div>
        </div>
    );
};

export default RecruitmentAnalytics; 