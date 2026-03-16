import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listServices } from '../redux/actions/serviceActions';
import './HomeScreen.css';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { services, loading, error } = useSelector((state) => state.service);

    useEffect(() => {
        dispatch(listServices());
    }, [dispatch]);

    const handleCardClick = (serviceId) => {
        navigate(`/services/${serviceId}`);
    };

    if (loading) {
        return <div className="loading">Loading services...</div>;
    }

    return (
        <div className="home-screen">
            <div className="home-header">
                <h1>Electrical Services Marketplace</h1>
                <p>Find expert fence and deck services near you</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="services-grid">
                {services && services.length > 0 ? (
                    services.map((service) => (
                        <div
                            key={service.id}
                            className="service-card"
                            onClick={() => handleCardClick(service.id)}
                        >
                            {service.sample_image && (
                                <img
                                    src={service.sample_image}
                                    alt={service.service_name}
                                    className="service-image"
                                />
                            )}
                            <div className="service-info">
                                <h3>{service.service_name}</h3>
                                <p className="description">{service.description}</p>
                                <div className="rating-price">
                                    <span className="rating">⭐ {service.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-services">No services available</p>
                )}
            </div>
        </div>
    );
};

export default HomeScreen;
