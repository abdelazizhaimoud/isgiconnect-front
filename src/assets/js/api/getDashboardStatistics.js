import axiosClient from './getUser';

/**
 * Fetch dashboard statistics from the backend API.
 * @returns {Promise<Object>} Dashboard statistics
 */
export default async function getDashboardStatistics() {
  const response = await axiosClient.get('/api/admin/dashboard/statistics');
  return response.data;
}
