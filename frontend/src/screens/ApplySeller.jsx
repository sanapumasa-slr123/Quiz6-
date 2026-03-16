import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { submitApplication } from '../redux/actions/serviceActions';
import ProtectedRoute from '../components/ProtectedRoute';
import './ApplySeller.css';

const ApplySeller = () => {
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.user);
    const { loading, error, applicationStatus } = useSelector((state) => state.service);

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin');
        }
    }, [userInfo, navigate]);

    const handleSubmit = () => {
        dispatch(submitApplication());
        setSubmitted(true);
    };

    return (
        <ProtectedRoute>
            <div className="apply-seller">
                <div className="apply-container">
                    <h1>Become a Seller</h1>
                    <p>Apply to become a seller and start offering your services on our platform!</p>

                    {error && <div className="error-message">{error}</div>}

                    {applicationStatus && (
                        <div className="success-message">
                            <h3>Application Submitted!</h3>
                            <p>Your application has been submitted for review. Our admin team will review your application and notify you soon.</p>
                        </div>
                    )}

                    {!applicationStatus && !submitted && (
                        <div className="apply-content">
                            <h3>Requirements</h3>
                            <ul>
                                <li>You must have a valid account</li>
                                <li>Your profile should be complete</li>
                                <li>You agree to our terms and conditions</li>
                                <li>Admin approval required</li>
                            </ul>

                            <button
                                onClick={handleSubmit}
                                disabled={loading || submitted}
                                className="submit-btn"
                            >
                                {loading ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
                    )}

                    {submitted && applicationStatus && (
                        <button
                            onClick={() => navigate('/')}
                            className="back-home-btn"
                        >
                            Back to Home
                        </button>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default ApplySeller;
