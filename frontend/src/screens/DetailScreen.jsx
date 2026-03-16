import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { getServiceDetail } from '../redux/actions/serviceActions';
import { createOrder } from '../redux/actions/orderActions';
import './DetailScreen.css';

const DetailScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { service, loading, error } = useSelector((state) => state.service);
    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getServiceDetail(id));
    }, [id, dispatch]);

    const handleBack = () => {
        navigate('/');
    };

    const handlePayPalSuccess = (orderID) => {
        if (service) {
            dispatch(
                createOrder({
                    service: service.id,
                    paypal_transaction_id: orderID,
                    price_paid: service.price,
                })
            );
            setTimeout(() => {
                navigate('/profile');
            }, 1000);
        }
    };

    if (loading) {
        return <div className="loading">Loading service details...</div>;
    }

    if (error) {
        return (
            <div className="detail-screen">
                <button onClick={handleBack} className="back-btn">← Back</button>
                <div className="error-message">{error}</div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="detail-screen">
                <button onClick={handleBack} className="back-btn">← Back</button>
                <p>Service not found</p>
            </div>
        );
    }

    return (
        <div className="detail-screen">
            <button onClick={handleBack} className="back-btn">← Back</button>
            
            <div className="detail-container">
                <div className="detail-image">
                    {service.sample_image && (
                        <img src={service.sample_image} alt={service.service_name} />
                    )}
                </div>

                <div className="detail-info">
                    <h1>{service.service_name}</h1>
                    <div className="seller-rating">
                        <span className="seller">Expert: {service.seller_name}</span>
                        <span className="rating">⭐ Rating: {service.rating}</span>
                    </div>

                    <div className="description-section">
                        <h3>Description</h3>
                        <p>{service.description}</p>
                    </div>

                    <div className="service-details">
                        <div className="detail-item">
                            <span className="label">Price:</span>
                            <span className="value">${service.price}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Duration:</span>
                            <span className="value">{service.duration_of_service}</span>
                        </div>
                    </div>

                    {userInfo ? (
                        <PayPalScriptProvider
                            options={{
                                clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
                                currency: 'USD',
                            }}
                        >
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: service.price.toString(),
                                                },
                                                description: service.service_name,
                                                payee: {
                                                    merchant_id: service.seller_merchant_id,
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then(() => {
                                        handlePayPalSuccess(data.orderID);
                                    });
                                }}
                                onError={(err) => {
                                    console.error('PayPal error:', err);
                                }}
                            />
                        </PayPalScriptProvider>
                    ) : (
                        <button className="avail-btn" onClick={() => navigate('/signin')}>
                            Sign In to Avail
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailScreen;
