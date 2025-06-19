import React, { useState, useEffect } from 'react';
import axiosClient from '../../../api/getUser';
import { toast } from 'react-toastify';
import { FaSearch, FaUserPlus, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';
import eventBus from '../../../../../utils/eventBus';

const UserCard = ({ user, onAction }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <img className="h-12 w-12 rounded-full object-cover" src={user.avatar_url || '/images/user/default.jpg'} alt={`${user.name}'s avatar`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-lg font-bold text-gray-900 truncate">{user.name}</p>
        <p className="text-sm text-gray-500 truncate">{user.email}</p>
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <FaMapMarkerAlt className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
          <span className="truncate">{user.location || 'Not specified'}</span>
        </div>
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <FaClock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
          <span className="truncate">Joined {user.created_at}</span>
        </div>
      </div>
      <div className="flex-shrink-0">
        {user.friendship_status === 'friends' ? (
          <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100">Friend</span>
        ) : user.friendship_status === 'request_sent' ? (
          <button onClick={() => onAction('cancel', user.id)} className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Request Sent</button>
        ) : user.friendship_status === 'request_received' ? (
          <button onClick={() => onAction('accept', user.friend_request_id, user.id)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">Accept Request</button>
        ) : (
          <button onClick={() => onAction('add', user.id)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <FaUserPlus className="-ml-1 mr-2 h-5 w-5" /> Add Friend
          </button>
        )}
      </div>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const EmptyState = ({ title, description, icon: Icon }) => (
  <div className="text-center py-12 px-6 bg-gray-50 rounded-lg">
    <Icon className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
    <p className="mt-1 text-sm text-gray-500">{description}</p>
  </div>
);

function Requests() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);

  const fetchFriends = async () => {
    try {
      setLoadingFriends(true);
      const res = await axiosClient.get('/api/user/friends');
      if (res.data.status === 'success') {
        setFriends(res.data.data);
      }
    } catch (error) {
      toast.error('Could not load your friends list.');
    } finally {
      setLoadingFriends(false);
    }
  };

    useEffect(() => {
    fetchFriends();

    const handleFriendsUpdate = () => fetchFriends();
    eventBus.on('friends:updated', handleFriendsUpdate);

    return () => {
      eventBus.remove('friends:updated', handleFriendsUpdate);
    };
  }, []);

  useEffect(() => {
    if (search.trim().length === 0) {
      setUsers([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      setLoading(true);
      axiosClient.get(`/api/users/search?search=${encodeURIComponent(search)}`)
        .then(res => {
          if (res.data.status === 'success') {
            setUsers(res.data.data || []);
          } else {
            toast.error('Error searching users.');
          }
        })
        .catch(() => toast.error('Error searching users.'))
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const updateUserState = (userId, newStatus) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, friendship_status: newStatus } : u));
  };

  const handleSendInvite = async (userId) => {
    try {
      const res = await axiosClient.post('/api/friend-requests', { receiver_id: userId });
      if (res.data.status === 'success') {
        toast.success('Friend request sent!');
        updateUserState(userId, 'request_sent');
      } else {
        toast.error(res.data.message || 'Failed to send request.');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'An error occurred.';
      if (msg === 'A friend request is already pending.') {
        toast.info(msg);
        updateUserState(userId, 'request_sent');
      } else {
        toast.error(msg);
      }
    }
  };

  const handleCancelRequest = async (userId) => {
    try {
      const res = await axiosClient.post('/api/friend-requests/cancel', { receiver_id: userId });
      if (res.data.status === 'success') {
        toast.success('Friend request cancelled.');
        updateUserState(userId, 'none');
      } else {
        toast.error(res.data.message || 'Failed to cancel request.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.');
    }
  };

  const handleAcceptRequest = async (requestId, senderId) => {
    try {
      const res = await axiosClient.post('/api/friend-requests/accept', { request_id: requestId });
      if (res.data.status === 'success') {
        toast.success('Friend request accepted!');
        updateUserState(senderId, 'friends');
        fetchFriends(); // Refresh friends list
      } else {
        toast.error(res.data.message || 'Failed to accept request.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.');
    }
  };

  const handleAction = (action, id, senderId) => {
    if (action === 'add') handleSendInvite(id);
    if (action === 'cancel') handleCancelRequest(id);
    if (action === 'accept') handleAcceptRequest(id, senderId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Find Friends Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <FaSearch className="w-5 h-5 mr-3 text-blue-600" />
              Find Friends
            </h2>
          </div>
          <div className="p-6">
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="Search by name, email, username..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {loading && <LoadingSpinner />}
            <div className="space-y-4">
              {users.map(user => (
                <UserCard key={user.id} user={user} onAction={handleAction} />
              ))}
              {!loading && users.length === 0 && search.length > 0 && (
                <EmptyState
                  icon={FaSearch}
                  title={`No users found matching "${search}"`}
                  description="Try searching with a different name or email"
                />
              )}
            </div>
          </div>
        </div>

        {/* Friends List Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <FaUsers className="w-5 h-5 mr-3 text-green-600" />
              Your Friends
              {friends.length > 0 && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {friends.length}
                </span>
              )}
            </h2>
          </div>
          <div className="p-6">
            {loadingFriends ? (
              <LoadingSpinner />
            ) : friends.length > 0 ? (
              <div className="space-y-4">
                {friends.map(friend => {
                  const friendWithStatus = { ...friend, friendship_status: 'friends' };
                  return <UserCard key={friend.id} user={friendWithStatus} onAction={handleAction} />;
                })}
              </div>
            ) : (
              <EmptyState
                icon={FaUsers}
                title="No friends yet"
                description="Send some friend requests to start connecting with people!"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requests;