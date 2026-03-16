import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrderHistory } from '../redux/actions/orderActions';
import ProtectedRoute from '../components/ProtectedRoute';
import './UserProfile.css';

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.user);
    const { orders, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        if (userInfo) {
            dispatch(getOrderHistory());
        }
    }, [userInfo, dispatch]);

    return (
        <ProtectedRoute>
            <div className="user-profile">
                <div className="profile-container">
                    <div className="profile-section">
                        <h1>User Profile</h1>
                        {userInfo && (
                            <div className="profile-info">
                                <div className="info-item">
                                    <label>Email:</label>
                                    <span>{userInfo.email}</span>
                                </div>
                                <div className="info-item">
                                    <label>Username:</label>
                                    <span>{userInfo.username}</span>
                                </div>
                                <div className="info-item">
                                    <label>Account Type:</label>
                                    <span className="role">{userInfo.role?.toUpperCase()}</span>
                                </div>
                                {userInfo.merchant_id && (
                                    <div className="info-item">
                                        <label>Merchant ID:</label>
                                        <span>{userInfo.merchant_id}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="orders-section">
                        <h2>Order History</h2>
                        {error && <div className="error-message">{error}</div>}
                        {loading ? (
                            <p>Loading orders...</p>
                        ) : orders && orders.length > 0 ? (
                            <table className="orders-table">
                                <thead>
                                    <tr>
                                        <th>Service Name</th>
                                        <th>Price Paid</th>
                                        <th>Transaction ID</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.service_name}</td>
                                            <td>${order.price_paid}</td>
                                            <td className="transaction-id">{order.paypal_transaction_id}</td>
                                            <td>{new Date(order.date_purchased).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="no-orders">No orders yet. <a href="/">Browse services</a></p>
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default UserProfile;
