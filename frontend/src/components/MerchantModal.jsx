import React from 'react';
import './Modals.css';

const MerchantModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Approve Application</h2>
                <p>Approving this application will:</p>
                <ul>
                    <li>Change user role to "Seller"</li>
                    <li>Generate a unique Merchant ID</li>
                    <li>Enable service posting</li>
                </ul>
                <p>Do you want to proceed?</p>
                <div className="modal-buttons">
                    <button className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="confirm-btn" onClick={onConfirm}>
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MerchantModal;
