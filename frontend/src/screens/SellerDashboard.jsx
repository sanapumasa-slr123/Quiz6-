import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listServices, createService } from '../redux/actions/serviceActions';
import ProtectedRoute from '../components/ProtectedRoute';
import './SellerDashboard.css';

const SellerDashboard = () => {
    const [formData, setFormData] = useState({
        service_name: '',
        description: '',
        price: '',
        duration_of_service: '',
        sample_image: null,
    });
    const [errors, setErrors] = useState({});
    const [showForm, setShowForm] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.user);
    const { services, loading } = useSelector((state) => state.service);

    useEffect(() => {
        if (userInfo && userInfo.role !== 'seller') {
            navigate('/');
        } else {
            dispatch(listServices());
        }
    }, [userInfo, navigate, dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            sample_image: e.target.files[0],
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.service_name) newErrors.service_name = 'Service name is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.price) newErrors.price = 'Price is required';
        else if (parseFloat(formData.price) <= 0) newErrors.price = 'Price must be positive';
        if (!formData.duration_of_service) newErrors.duration_of_service = 'Duration is required';
        if (!formData.sample_image) newErrors.sample_image = 'Image is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const data = new FormData();
            data.append('service_name', formData.service_name);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('duration_of_service', formData.duration_of_service);
            data.append('sample_image', formData.sample_image);

            dispatch(createService(data));
            setFormData({
                service_name: '',
                description: '',
                price: '',
                duration_of_service: '',
                sample_image: null,
            });
            setShowForm(false);
        }
    };

    const handleDelete = (serviceId) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            // Implement delete service action
        }
    };

    const userServices = services.filter((s) => s.seller === userInfo?.id);

    return (
        <ProtectedRoute requiredRole="seller">
            <div className="seller-dashboard">
                <div className="dashboard-container">
                    <div className="dashboard-header">
                        <h1>Seller Dashboard</h1>
                        <p>Welcome! Manage your services here.</p>
                    </div>

                    <button
                        className="add-service-btn"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Cancel' : '+ Add New Service'}
                    </button>

                    {showForm && (
                        <div className="service-form-container">
                            <h2>Add New Service</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Service Name</label>
                                    <input
                                        type="text"
                                        name="service_name"
                                        value={formData.service_name}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Fence Installation"
                                    />
                                    {errors.service_name && <span className="error">{errors.service_name}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe your service..."
                                        rows="4"
                                    />
                                    {errors.description && <span className="error">{errors.description}</span>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Price ($)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            placeholder="0.00"
                                            step="0.01"
                                        />
                                        {errors.price && <span className="error">{errors.price}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Duration</label>
                                        <input
                                            type="text"
                                            name="duration_of_service"
                                            value={formData.duration_of_service}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 2-3 hours"
                                        />
                                        {errors.duration_of_service && (
                                            <span className="error">{errors.duration_of_service}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Service Image</label>
                                    <input
                                        type="file"
                                        name="sample_image"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                    {errors.sample_image && <span className="error">{errors.sample_image}</span>}
                                </div>

                                <button type="submit" className="submit-btn">
                                    Add Service
                                </button>
                            </form>
                        </div>
                    )}

                    <div className="services-section">
                        <h2>Your Services</h2>
                        {loading ? (
                            <p>Loading your services...</p>
                        ) : userServices && userServices.length > 0 ? (
                            <table className="services-table">
                                <thead>
                                    <tr>
                                        <th>Service Name</th>
                                        <th>Price</th>
                                        <th>Duration</th>
                                        <th>Rating</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userServices.map((service) => (
                                        <tr key={service.id}>
                                            <td>{service.service_name}</td>
                                            <td>${service.price}</td>
                                            <td>{service.duration_of_service}</td>
                                            <td>⭐ {service.rating}</td>
                                            <td>
                                                <button className="edit-btn">Edit</button>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(service.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="no-services">You haven't added any services yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default SellerDashboard;
