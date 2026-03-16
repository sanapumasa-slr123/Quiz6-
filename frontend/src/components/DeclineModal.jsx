import React, { useState } from 'react';
import './Modals.css';

const DeclineModal = ({ onConfirm, onCancel }) => {
    const [reason, setReason] = useState('');

    const handleSubmit = () => {
        if (reason.trim()) {
            onConfirm(reason);
        }
    };

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Decline Application</h2>
                <p>Please provide a reason for declining this application:</p>
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter decline reason..."
                    rows={5}
                />
                <div className="modal-buttons">
                    <button className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                    <button
                        className="confirm-btn"
                        onClick={handleSubmit}
                        disabled={!reason.trim()}
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeclineModal;
