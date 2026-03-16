import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceDetail } from '../redux/actions/serviceActions';
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
                        <button className="avail-btn">Avail Service (PayPal)</button>
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
