import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  RiDashboardLine, RiUserLine, RiFileTextLine, RiAlertLine, RiGroupLine, 
  RiSettingsLine, RiBarChartLine, RiNotificationLine, RiShieldLine,
  RiSearchLine, RiMoreLine, RiEyeLine, RiEditLine, RiDeleteBinLine,
  RiCheckLine, RiCloseLine, RiArrowUpLine, RiArrowDownLine, RiRefreshLine,
  RiDownloadLine, RiAddLine, RiLockLine, RiStarLine, RiHeartLine,
  RiMessageLine, RiPieChartLine, RiUserAddLine, RiUserSettingsLine,
  RiSendPlaneLine, RiClockwiseLine, RiLogoutBoxLine , RiFilterLine, 
  RiArchiveLine, RiCheckboxCircleLine, RiTimeLine, RiDraftLine,
  RiPushpinFill, RiLoader4Line, RiThumbUpLine, RiChat3Line, RiFlag2Line,
} from '@remixicon/react';
import axiosClient from '../../../api/getUser';
import { useDispatch } from 'react-redux';
import { set_user } from '../Store/actions';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';

import getDashboardStatistics from '../../../api/getDashboardStatistics';
import auth from '../../../secured/auth';
import Loader from '../../New/Loader';

// Add formatDate function
const formatDate = (dateString) => {
  try {
    // Parse the ISO date string
    const postDate = new Date(dateString);
    const currentDate = new Date();
    
    // Calculate the difference in milliseconds
    const diffInMs = currentDate - postDate;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    
    // Less than a minute
    if (diffInSeconds < 60) {
      return 'À l\'instant';
    }
    
    // Less than an hour
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    
    // Less than a day
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    }
    
    // Less than a week
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    }
    
    // Less than a month
    if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `Il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
    }
    
    // Less than a year
    if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `Il y a ${months} mois`;
    }
    
    // More than a year
    const years = Math.floor(diffInSeconds / 31536000);
    return `Il y a ${years} an${years > 1 ? 's' : ''}`;
  } catch (error) {
    console.error('Error formatting date:', error, 'Date string:', dateString);
    return 'Date inconnue';
  }
};

// Add PostViewModal component
const PostViewModal = ({ post, onClose, formatDate }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={post.user?.profile?.avatar_url || '/images/user/01.jpg'}
                alt={post.user?.name}
                className="w-12 h-12 rounded-full border-2 border-gray-200"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{post.user?.name}</h3>
                <p className="text-sm text-gray-500">
                  {post.created_at ? formatDate(post.created_at) : 'Date inconnue'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <RiCloseLine size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <div className="prose max-w-none">
              {post.content}
            </div>
          </div>

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.alt || `Image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Engagement Stats */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <RiThumbUpLine className="mr-1" />
                  <span>{post.likes_count || 0} likes</span>
                </div>
                <div className="flex items-center">
                  <RiChat3Line className="mr-1" />
                  <span>{post.comments_count || 0} comments</span>
                </div>
                <div className="flex items-center">
                  <RiFlag2Line className="mr-1" />
                  <span>{post.reports_count || 0} reports</span>
                </div>
              </div>
              <div className="flex items-center">
                <RiTimeLine className="mr-1" />
                <span>Status: {post.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Complete integrated UserManagement component with all improvements

// First, add these helper components at the top of your file (after imports)

// Enhanced loading spinner component
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
      <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <p className="mt-4 text-sm text-gray-600">Chargement des utilisateurs...</p>
  </div>
);

// Enhanced loading state for the users table
const UserTableSkeleton = () => (
  <>
    {Array.from({ length: 5 }).map((_, index) => (
      <tr key={index} className="animate-pulse">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div className="ml-4">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right">
          <div className="h-4 bg-gray-200 rounded w-16 ml-auto"></div>
        </td>
      </tr>
    ))}
  </>
);

// Improved StatusCell component with better loader and colors
const StatusCell = ({ user, onStatusChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(user.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [reason, setReason] = useState('');
  const [showReasonInput, setShowReasonInput] = useState(false);

  const handleStatusChange = async (newStatus) => {
    // If status is being suspended, show reason input
    if (newStatus === 'suspended') {
      setShowReasonInput(true);
      setStatus(newStatus);
      return;
    }

    try {
      setIsUpdating(true);
      await axiosClient.put(`/api/admin/users/${user.id}/status`, {
        status: newStatus,
        reason: reason
      });
      setStatus(newStatus);
      setIsEditing(false);
      setShowReasonInput(false);
      setReason('');
      onStatusChange(); // Refresh the user list
      toast.success('Statut mis à jour avec succès');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la mise à jour du statut');
      setStatus(user.status); // Reset to original status on error
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReasonSubmit = async () => {
    if (!reason.trim()) {
      toast.error('Veuillez fournir une raison');
      return;
    }

    try {
      setIsUpdating(true);
      await axiosClient.put(`/api/admin/users/${user.id}/status`, {
        status: status,
        reason: reason
      });
      setIsEditing(false);
      setShowReasonInput(false);
      setReason('');
      onStatusChange(); // Refresh the user list
      toast.success('Statut mis à jour avec succès');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la mise à jour du statut');
      setStatus(user.status); // Reset to original status on error
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          hover: 'hover:bg-emerald-100',
          ring: 'ring-emerald-500',
          icon: '✓'
        };
      case 'inactive':
        return {
          bg: 'bg-slate-50',
          text: 'text-slate-700',
          border: 'border-slate-200',
          hover: 'hover:bg-slate-100',
          ring: 'ring-slate-500',
          icon: '◯'
        };
      case 'suspended':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          hover: 'hover:bg-red-100',
          ring: 'ring-red-500',
          icon: '⚠'
        };
      case 'pending_verification':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
          hover: 'hover:bg-amber-100',
          ring: 'ring-amber-500',
          icon: '⏳'
        };
      case 'banned':
        return {
          bg: 'bg-gray-900',
          text: 'text-white',
          border: 'border-gray-700',
          hover: 'hover:bg-gray-800',
          ring: 'ring-gray-600',
          icon: '✕'
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          hover: 'hover:bg-gray-100',
          ring: 'ring-gray-500',
          icon: '?'
        };
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'inactive':
        return 'Inactif';
      case 'suspended':
        return 'Suspendu';
      case 'pending_verification':
        return 'En attente';
      case 'banned':
        return 'Banni';
      default:
        return status;
    }
  };

  const colors = getStatusColor(status);

  if (isEditing) {
    return (
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={isUpdating}
              className={`
                appearance-none px-4 py-2 pr-10 
                text-sm font-medium 
                border-2 rounded-lg 
                cursor-pointer 
                focus:outline-none focus:ring-2 focus:${colors.ring} focus:border-transparent
                transition-all duration-200 
                bg-white hover:bg-gray-50
                ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              style={{ minWidth: '150px' }}
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="suspended">Suspendu</option>
              <option value="pending">En attente</option>
              <option value="banned">Banni</option>
            </select>
            
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {!showReasonInput && !isUpdating && (
            <div className="flex gap-1">
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                title="Annuler"
              >
                <RiCloseLine size={18} />
              </button>
            </div>
          )}
          
          {isUpdating && (
            <div className="flex items-center space-x-2 px-3">
              <div className="relative">
                <div className="w-5 h-5">
                  <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
              <span className="text-sm text-gray-600">Mise à jour...</span>
            </div>
          )}
        </div>
        
        {showReasonInput && (
          <div className="flex flex-col space-y-2 mt-2">
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Raison de la suspension..."
              className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows="2"
              disabled={isUpdating}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowReasonInput(false);
                  setStatus(user.status);
                  setReason('');
                  setIsEditing(false);
                }}
                disabled={isUpdating}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Annuler
              </button>
              <button
                onClick={handleReasonSubmit}
                disabled={isUpdating || !reason.trim()}
                className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
              >
                {isUpdating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Traitement...</span>
                  </>
                ) : (
                  <span>Confirmer</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="inline-block cursor-pointer group"
      onClick={() => setIsEditing(true)}
    >
      <span className={`
        inline-flex items-center px-3 py-1.5 
        text-xs font-semibold rounded-full 
        border transition-all duration-200
        transform hover:scale-105
        ${colors.bg} ${colors.text} ${colors.border} ${colors.hover}
        shadow-sm hover:shadow-md
      `}>
        <span className="mr-1.5 text-sm">{colors.icon}</span>
        {getStatusLabel(status)}
        <svg className="w-3 h-3 ml-1.5 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
  );
};


const CompleteAdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const [tempStatus, setTempStatus] = useState(null);


  // Dashboard data, fetched from API
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalPosts: 0,
    totalReports: 0,
    newUsersToday: 0,
    postsToday: 0,
    userGrowth: 0,
    engagementRate: 0
  });

  // Fetch dashboard statistics on mount
  useEffect(() => {
    getDashboardStatistics()
      .then(data => setDashboardData(data))
      .catch(err => {
        console.error('Failed to fetch dashboard statistics', err);
      });
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const authResult = await auth(dispatch);
      console.log(authResult)
      if (authResult) {
         setIsLoading(false);
      } else {
         navigate('/login');
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Ahmed Bennani', email: 'ahmed@isgi.ma', status: 'active', joinDate: '2024-01-15', posts: 45, lastActive: '2024-06-12' },
    { id: 2, name: 'Fatima Zahra', email: 'fatima@isgi.ma', status: 'suspended', joinDate: '2024-02-10', posts: 23, lastActive: '2024-06-10' },
    { id: 3, name: 'Youssef Alami', email: 'youssef@isgi.ma', status: 'active', joinDate: '2024-03-05', posts: 67, lastActive: '2024-06-12' },
  ]);


  const [reports, setReports] = useState([
    { id: 1, type: 'inappropriate-content', postId: 2, reporterName: 'Omar Idrissi', reason: 'Contenu inapproprié', status: 'pending', date: '2024-06-12' },
    { id: 2, type: 'spam', userId: 5, reporterName: 'Salma Tazi', reason: 'Spam répétitif', status: 'reviewed', date: '2024-06-11' },
    { id: 3, type: 'harassment', userId: 8, reporterName: 'Karim Benali', reason: 'Harcèlement', status: 'resolved', date: '2024-06-10' },
  ]);



  const [notifications, setNotifications] = useState([
    { id: 1, type: 'system', title: 'Maintenance programmée', message: 'Maintenance système prévue dimanche à 2h', recipients: 'all', status: 'scheduled', date: '2024-06-15' },
    { id: 2, type: 'announcement', title: 'Nouvelle fonctionnalité', message: 'Découvrez la nouvelle messagerie instantanée', recipients: 'active_users', status: 'sent', date: '2024-06-12' },
    { id: 3, type: 'warning', title: 'Politique de contenu', message: 'Rappel des règles de la communauté', recipients: 'specific_users', status: 'draft', date: '2024-06-10' },
  ]);

  const [securityLogs, setSecurityLogs] = useState([
    { id: 1, type: 'login_attempt', user: 'ahmed@isgi.ma', ip: '192.168.1.100', status: 'success', date: '2024-06-12 14:30', location: 'Casablanca, MA' },
    { id: 2, type: 'suspicious_activity', user: 'fatima@isgi.ma', ip: '10.0.0.50', status: 'blocked', date: '2024-06-12 13:15', location: 'Rabat, MA' },
    { id: 3, type: 'password_change', user: 'youssef@isgi.ma', ip: '172.16.0.25', status: 'success', date: '2024-06-12 12:00', location: 'Marrakech, MA' },
  ]);



  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: RiDashboardLine },
    { id: 'users', label: 'Gestion Utilisateurs', icon: RiUserLine },
    { id: 'posts', label: 'Gestion Contenu', icon: RiFileTextLine },
  ];

  const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm flex items-center ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
              {changeType === 'positive' ? <RiArrowUpLine size={16} /> : <RiArrowDownLine size={16} />}
              {change}%
            </p>
          )}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          <Icon size={24} color={color} />
        </div>
      </div>
    </div>
  );

  const LogoutSpinner = styled.div`
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid #ffffff;
      border-top-color: transparent;
      animation: spin 1s linear infinite;
      
      @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
      }
  `

  const DashboardOverview = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord ISGI CONNECT</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <RiRefreshLine size={16} />
          Actualiser
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Utilisateurs Total"
          value={dashboardData.totalUsers.toLocaleString()}
          change={dashboardData.userGrowth}
          changeType="positive"
          icon={RiUserLine}
          color="#3B82F6"
        />
        <StatCard
          title="Utilisateurs Actifs"
          value={dashboardData.activeUsers.toLocaleString()}
          change={8.2}
          changeType="positive"
          icon={RiUserLine}
          color="#10B981"
        />
        <StatCard
          title="Posts Publiés"
          value={dashboardData.totalPosts.toLocaleString()}
          change={15.3}
          changeType="positive"
          icon={RiFileTextLine}
          color="#F59E0B"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Activité Récente</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <RiUserLine className="text-green-600" />
              <div>
                <p className="font-medium">Nouvel utilisateur inscrit</p>
                <p className="text-sm text-gray-600">Ahmed Benali - il y a 5 minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <RiFileTextLine className="text-blue-600" />
              <div>
                <p className="font-medium">Nouveau post publié</p>
                <p className="text-sm text-gray-600">Tutoriel React.js - il y a 12 minutes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Statistiques Rapides</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Nouveaux utilisateurs aujourd'hui</span>
              <span className="font-bold text-blue-600">{dashboardData.newUsersToday}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Posts publiés aujourd'hui</span>
              <span className="font-bold text-green-600">{dashboardData.postsToday}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taux d'engagement</span>
              <span className="font-bold text-purple-600">{dashboardData.engagementRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
      search: '',
      status: 'all'
    });
    const [pagination, setPagination] = useState({
      currentPage: 1,
      totalPages: 1,
      totalItems: 0
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const searchTimeoutRef = useRef(null);

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get('/api/admin/users', {
          params: {
            page: pagination.currentPage,
            search: filters.search,
            status: filters.status !== 'all' ? filters.status : undefined
          }
        });
        
        if (response.data && response.data.data) {
          setUsers(response.data.data);
          setPagination(prev => ({
            ...prev,
            totalPages: response.data.meta.last_page,
            totalItems: response.data.meta.total
          }));
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue');
        toast.error(err.response?.data?.message || 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    const handleSearchChange = (e) => {
      const value = e.target.value;
      setFilters(prev => ({ ...prev, search: value }));
      
      // Clear any existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      
      // Set a new timeout
      searchTimeoutRef.current = setTimeout(() => {
        setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
        fetchUsers();
      }, 500); // Wait for 500ms after user stops typing
    };

    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters(prev => ({ ...prev, [name]: value }));
      setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
      fetchUsers();
    };

    const handlePageChange = (newPage) => {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    };

    const handleDeleteClick = (user) => {
      setUserToDelete(user);
      setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
      if (!userToDelete) return;
      
      try {
        setIsDeleting(true);
        await axiosClient.delete(`/api/admin/users/${userToDelete.id}`);
        toast.success('Utilisateur supprimé avec succès');
        setShowDeleteModal(false);
        setUserToDelete(null);
        fetchUsers(); // Refresh the list
      } catch (err) {
        toast.error(err.response?.data?.message || 'Erreur lors de la suppression');
      } finally {
        setIsDeleting(false);
      }
    };

    useEffect(() => {
      fetchUsers();
    }, [pagination.currentPage]);

    // Cleanup timeout on component unmount
    useEffect(() => {
      return () => {
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
      };
    }, []);

    return (
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Gestion des Utilisateurs</h2>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={filters.search}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="w-[200px]">
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="suspended">Suspendu</option>
                <option value="banned">banni</option>
                <option value="pending">En attente</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-4 text-red-500 text-center">
            {error}
          </div>
        )}

        {/* Users Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'inscription</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publications</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                            alt={user.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusCell user={user} onStatusChange={fetchUsers} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.posts_count}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Affichage de {((pagination.currentPage - 1) * 15) + 1} à {Math.min(pagination.currentPage * 15, pagination.totalItems)} sur {pagination.totalItems} utilisateurs
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Précédent
                </button>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmer la suppression</h3>
              <p className="text-gray-500 mb-6">
                Êtes-vous sûr de vouloir supprimer l'utilisateur {userToDelete?.name} ? Cette action est irréversible.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  disabled={isDeleting}
                >
                  Annuler
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Suppression...' : 'Supprimer'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ContentManagement = () => {
    const [stats, setStats] = useState({
      published: 0,
      pending: 0,
      drafts: 0,
      archived: 0,
      deleted: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
      search: '',
      type: 'all',
      status: 'all',
      sort: 'latest'
    });
    const [pagination, setPagination] = useState({
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      total: 0
    });
    const [contentTypes, setContentTypes] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const response = await axiosClient.get('/api/admin/content/statistics');
        setStats(response.data.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        toast.error('Failed to fetch content statistics');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchContentTypes = async () => {
      try {
        const response = await axiosClient.get('/api/admin/content/types');
        setContentTypes(response.data.data);
      } catch (error) {
        console.error('Error fetching content types:', error);
      }
    };

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: pagination.currentPage,
          per_page: pagination.perPage,
          ...filters
        });

        const response = await axiosClient.get(`/api/admin/content?${params}`);
        setPosts(response.data.data.data);
        setPagination({
          currentPage: response.data.data.current_page,
          lastPage: response.data.data.last_page,
          perPage: response.data.data.per_page,
          total: response.data.data.total
        });
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    const handleFilterChange = (key, value) => {
      setFilters(prev => ({ ...prev, [key]: value }));
      setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
    };

    const handlePageChange = (page) => {
      setPagination(prev => ({ ...prev, currentPage: page }));
    };

    const handleTogglePin = async (postId) => {
      try {
        await axiosClient.post(`/api/admin/content/${postId}/pin`);
        fetchPosts(); // Refresh the list
      } catch (error) {
        toast.error('Failed to update pin status');
      }
    };

    const handleStatusChange = async (postId, newStatus) => {
      setUpdatingStatus(postId);
      try {
        const response = await axiosClient.put(`/api/admin/content/${postId}/status`, {
          status: newStatus
        });
        
        // Update only the specific post in the list
        setPosts(prevPosts => prevPosts.map(post => 
          post.id === postId 
            ? { ...post, status: newStatus }
            : post
        ));
        
        setEditingStatus(null);
        setTempStatus(null);
        toast.success('Status updated successfully');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to update status');
      } finally {
        setUpdatingStatus(null);
      }
    };

    const startEditing = (post) => {
      setEditingStatus(post.id);
      setTempStatus(post.status);
    };

    const cancelEditing = () => {
      setEditingStatus(null);
      setTempStatus(null);
    };

    const getStatusStyle = (status) => {
      switch (status) {
        case 'published':
          return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200';
        case 'draft':
          return 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200';
        case 'archived':
          return 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200';
      }
    };
    const getStatusText = (status) => {
      switch (status) {
        case 'published':
          return 'Publié';
        case 'draft':
          return 'Brouillon';
        case 'pending':
          return 'En attente';
        case 'archived':
          return 'Archivé';
        default:
          return status;
      }
    };
    const StatusCell = ({ post }) => {
      const [isEditing, setIsEditing] = useState(false);
      const [tempStatus, setTempStatus] = useState(post.status);
      const [isUpdating, setIsUpdating] = useState(false);
    
      const handleStatusChange = async (newStatus) => {
        setIsUpdating(true);
        try {
          const response = await axiosClient.put(`/api/admin/content/${post.id}/status`, {
            status: newStatus
          });
          
          // Update only the specific post in the list
          setPosts(prevPosts => prevPosts.map(p => 
            p.id === post.id 
              ? { ...p, status: newStatus }
              : p
          ));
          
          // Refresh statistics after successful status update
          await fetchStats();
          
          setIsEditing(false);
          toast.success('Status updated successfully');
        } catch (error) {
          toast.error(error.response?.data?.message || 'Failed to update status');
          // Reset temp status on error
          setTempStatus(post.status);
        } finally {
          setIsUpdating(false);
        }
      };
    
      const handleCancel = () => {
        setTempStatus(post.status);
        setIsEditing(false);
      };
    
      const handleEdit = () => {
        setTempStatus(post.status);
        setIsEditing(true);
      };
    
      if (isEditing) {
        return (
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={tempStatus}
                onChange={(e) => setTempStatus(e.target.value)}
                disabled={isUpdating}
                className={`
                  appearance-none
                  px-3 py-2 pr-8
                  text-sm font-medium
                  border-2 rounded-lg
                  cursor-pointer
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  focus:border-blue-500
                  transition-all duration-200
                  min-w-[120px]
                  ${getStatusStyle(tempStatus)}
                  ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <option value="published">Publié</option>
                <option value="draft">Brouillon</option>
                <option value="pending">En attente</option>
                <option value="archived">Archivé</option>
              </select>
              
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
    
            <div className="flex gap-1">
              <button
                onClick={() => handleStatusChange(tempStatus)}
                disabled={isUpdating || tempStatus === post.status}
                className={`
                  p-2 rounded-lg transition-all duration-200
                  ${tempStatus === post.status 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                  }
                  ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                title="Confirmer"
              >
                {isUpdating ? (
                  <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <RiCheckLine size={16} />
                )}
              </button>
              
              <button
                onClick={handleCancel}
                disabled={isUpdating}
                className={`
                  p-2 rounded-lg transition-all duration-200
                  text-red-600 hover:text-red-800 hover:bg-red-50
                  ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                title="Annuler"
              >
                <RiCloseLine size={16} />
              </button>
            </div>
          </div>
        );
      }
    
      return (
        <div 
          onClick={handleEdit}
          className={`
            inline-flex items-center gap-2
            px-3 py-2 
            text-sm font-medium 
            rounded-lg border-2
            cursor-pointer 
            transition-all duration-200
            transform hover:scale-105
            ${getStatusStyle(post.status)}
            shadow-sm hover:shadow-md
          `}
        >
          <span>{getStatusText(post.status)}</span>
          <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
      );
    };

    const handleDeleteClick = (post) => {
      setPostToDelete(post);
      setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
      if (!postToDelete) return;
      
      setIsDeleting(true);
      try {
        await handleStatusChange(postToDelete.id, 'deleted');
        toast.success('Post supprimé avec succès');
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error(error.response?.data?.message || 'Erreur lors de la suppression du post');
      } finally {
        setIsDeleting(false);
        setShowDeleteModal(false);
        setPostToDelete(null);
      }
    };

    useEffect(() => {
      fetchStats();
      fetchContentTypes();
    }, []);

    useEffect(() => {
      fetchPosts();
    }, [filters, pagination.currentPage]);

    // Sort posts to show pinned ones at the top
    const sortedPosts = useMemo(() => {
      return [...posts].sort((a, b) => {
        // First sort by pinned status
        if (a.is_pinned && !b.is_pinned) return -1;
        if (!a.is_pinned && b.is_pinned) return 1;
        
        // If both are pinned or both are not pinned, sort by date
        return new Date(b.date) - new Date(a.date);
      });
    }, [posts]);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Gestion du Contenu</h1>
        </div>

        <div className="grid grid-cols-6 gap-4">
          {isLoading ? (
            // Loading skeletons
            <>
              <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            </>
          ) : (
            // Actual stat cards
            <>
              <StatCard
                title="Total Posts"
                value={stats.published + stats.pending + stats.drafts + stats.archived + stats.deleted}
                icon={RiFileTextLine}
                color="#3B82F6"
              />
              <StatCard
                title="Publiés"
                value={stats.published.toString()}
                icon={RiCheckboxCircleLine}
                color="#10B981"
              />
              <StatCard
                title="En Attente"
                value={stats.pending.toString()}
                icon={RiTimeLine}
                color="#F59E0B"
              />
              <StatCard
                title="Brouillons"
                value={stats.drafts.toString()}
                icon={RiDraftLine}
                color="#6B7280"
              />
              <StatCard
                title="Archivés"
                value={stats.archived.toString()}
                icon={RiArchiveLine}
                color="#EF4444"
              />
              <StatCard
                title="Supprimés"
                value={stats.deleted.toString()}
                icon={RiDeleteBinLine}
                color="#DC2626"
              />
            </>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Liste des Posts</h2>
              <div className="flex gap-4">
                <div className="relative">
                  <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Rechercher du contenu..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <select 
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                  >
                    <option value="all">Tous les types</option>
                    {contentTypes.map(type => (
                      <option key={type.id} value={type.slug}>{type.name}</option>
                    ))}
                  </select>
                  <select 
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="published">Publié</option>
                    <option value="pending">En attente</option>
                    <option value="draft">Brouillon</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auteur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contenu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  // Loading skeleton rows
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                          <div className="ml-4">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-3 bg-gray-200 rounded w-16 mt-2"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                        <div className="h-3 bg-gray-200 rounded w-32 mt-2"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-4">
                          <div className="h-4 bg-gray-200 rounded w-12"></div>
                          <div className="h-4 bg-gray-200 rounded w-12"></div>
                          <div className="h-4 bg-gray-200 rounded w-12"></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <div className="h-8 w-8 bg-gray-200 rounded"></div>
                          <div className="h-8 w-8 bg-gray-200 rounded"></div>
                          <div className="h-8 w-8 bg-gray-200 rounded"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : sortedPosts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      Aucun post trouvé
                    </td>
                  </tr>
                ) : (
                  sortedPosts.map(post => (
                    <tr key={post.id} className={`hover:bg-gray-50 ${post.is_pinned ? 'bg-yellow-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {post.author.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                              {post.author}
                              {post.is_pinned && (
                                <RiPushpinFill className="text-yellow-500" size={16} title="Post épinglé" />
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                          {post.content}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {post.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusCell post={post} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1" title="Likes">
                            <RiHeartLine size={14} />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1" title="Commentaires">
                            <RiMessageLine size={14} />
                            {post.comments}
                          </span>
                          {post.reports > 0 && (
                            <span className="flex items-center gap-1 text-red-600" title="Signalements">
                              <RiAlertLine size={14} />
                              {post.reports}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button 
                            className="text-blue-600 hover:text-blue-900" 
                            title="Voir"
                            onClick={() => setSelectedPost(post)}
                          >
                            <RiEyeLine size={16} />
                          </button>
                          <button 
                            className={`${post.is_pinned ? 'text-yellow-600' : 'text-purple-600'} hover:text-purple-900`}
                            title={post.is_pinned ? 'Désépingler' : 'Épingler'}
                            onClick={() => handleTogglePin(post.id)}
                          >
                            <RiStarLine size={16} />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900" 
                            title="Supprimer"
                            onClick={() => handleDeleteClick(post)}
                          >
                            <RiDeleteBinLine size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Affichage de {pagination.from} à {pagination.to} sur {pagination.total} résultats
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Précédent
                </button>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.lastPage}
                  className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Confirmer la suppression</h3>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <RiCloseLine size={24} />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600">
                  Êtes-vous sûr de vouloir supprimer ce post ? Cette action est irréversible.
                </p>
                {postToDelete && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900 font-medium">Contenu du post :</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{postToDelete.content}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isDeleting}
                >
                  Annuler
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <div className="flex items-center gap-2">
                      <RiLoader4Line className="animate-spin" size={16} />
                      Suppression...
                    </div>
                  ) : (
                    'Supprimer'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add the PostViewModal */}
        {selectedPost && (
          <PostViewModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            formatDate={formatDate}
          />
        )}
      </div>
    );
  };
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'posts':
        return <ContentManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return isLoading ? (
    <Loader />
 ) : (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IC</span>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="font-bold text-lg text-gray-800">ISGI CONNECT</h1>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeSection === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
              }`}
            >
              <item.icon size={20} />
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          <button
            onClick={async () => {
              setIsLoggingOut(true);
              await axiosClient.get("/sanctum/csrf-cookie");
              
              await axiosClient.post('/api/logout')
                  .then(response => {
                      if (response.status === 200) {
                          localStorage.removeItem('user');
                          localStorage.removeItem('token');
                          dispatch(set_user(null))
                          navigate('/login');
                      }
                  })
                  .catch(error => {
                      console.error('Logout error:', error);
                      setIsLoggingOut(false);
                  });
            }}
            className="w-full flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-semibold"
          >
            {isLoggingOut ? (
              <>
                <LogoutSpinner />
                <span>Logging out...</span>
              </>
            ) : (
              <>
                <RiLogoutBoxLine size={18} />
                {!sidebarCollapsed && <span>Logout</span>}
              </>
            )}
          </button>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RiMoreLine size={16} className={`transform transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CompleteAdminDashboard;