import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listAllUsers, deleteUser, listApplications, approveApplication, declineApplication } from '../redux/actions/adminActions';
import ProtectedRoute from '../components/ProtectedRoute';
import DeclineModal from '../components/DeclineModal';
import MerchantModal from '../components/MerchantModal';
import './UserScreen.css';

const UserScreen = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [applications, setApplications] = useState([]);
    const [showDeclineModal, setShowDeclineModal] = useState(false);
    const [showMerchantModal, setShowMerchantModal] = useState(false);
    const [selectedAppId, setSelectedAppId] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.user);
    const { users, loading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        if (userInfo && userInfo.role !== 'admin') {
            navigate('/');
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        dispatch(listAllUsers());
        loadApplications();
    }, [dispatch]);

    const loadApplications = async () => {
        const apps = await listApplications();
        setApplications(Array.isArray(apps) ? apps : []);
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(userId));
        }
    };

    const handleApproveApp = (appId) => {
        setSelectedAppId(appId);
        setShowMerchantModal(true);
    };

    const handleDeclineApp = (appId) => {
        setSelectedAppId(appId);
        setShowDeclineModal(true);
    };

    const handleConfirmDecline = (reason) => {
        if (selectedAppId) {
            dispatch(declineApplication(selectedAppId, reason));
            setShowDeclineModal(false);
            setSelectedAppId(null);
            setTimeout(() => loadApplications(), 500);
        }
    };

    const handleConfirmApprove = () => {
        if (selectedAppId) {
            dispatch(approveApplication(selectedAppId));
            setShowMerchantModal(false);
            setSelectedAppId(null);
            setTimeout(() => loadApplications(), 500);
        }
    };

    return (
        <ProtectedRoute requiredRole="admin">
            <div className="user-screen">
                <div className="admin-container">
                    <h1>Admin Panel</h1>

                    <div className="tabs">
                        <button
                            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                            onClick={() => setActiveTab('users')}
                        >
                            Users
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('applications')}
                        >
                            Seller Applications
                        </button>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    {activeTab === 'users' && (
                        <div className="tab-content">
                            <h2>All Users</h2>
                            {loading ? (
                                <p>Loading users...</p>
                            ) : users && users.length > 0 ? (
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <button className="edit-btn">Edit</button>
                                                    <button
                                                        className="delete-btn"
                                                        onClick={() => handleDeleteUser(user.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No users found</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'applications' && (
                        <div className="tab-content">
                            <h2>Seller Applications</h2>
                            {applications && applications.length > 0 ? (
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Applied</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.map((app) => (
                                            <tr key={app.id}>
                                                <td>{app.user_email}</td>
                                                <td className={`status ${app.status}`}>{app.status}</td>
                                                <td>{new Date(app.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    {app.status === 'pending' && (
                                                        <>
                                                            <button
                                                                className="approve-btn"
                                                                onClick={() => handleApproveApp(app.id)}
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                className="decline-btn"
                                                                onClick={() => handleDeclineApp(app.id)}
                                                            >
                                                                Decline
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No pending applications</p>
                            )}
                        </div>
                    )}
                </div>

                {showDeclineModal && (
                    <DeclineModal
                        onConfirm={handleConfirmDecline}
                        onCancel={() => setShowDeclineModal(false)}
                    />
                )}

                {showMerchantModal && (
                    <MerchantModal
                        onConfirm={handleConfirmApprove}
                        onCancel={() => setShowMerchantModal(false)}
                    />
                )}
            </div>
        </ProtectedRoute>
    );
};

export default UserScreen;
