import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ElectricalServices.css';

const serviceCategories = [
    {
        title: 'Electrical Installation',
        description:
            'Professional setup for wiring, outlets, switches, lighting systems, panels, and new electrical fixtures.',
        points: ['New wiring & rewiring', 'Lighting and fixtures', 'Panel and breaker upgrades'],
    },
    {
        title: 'Electrical Maintenance',
        description:
            'Preventive checks and scheduled maintenance to keep your systems efficient, safe, and code-compliant.',
        points: ['Routine safety inspection', 'Load and efficiency check', 'Minor adjustments and tune-ups'],
    },
    {
        title: 'Electrical Repair',
        description:
            'Fast troubleshooting and repair for faults, outages, damaged components, and urgent electrical issues.',
        points: ['Short circuit diagnosis', 'Outlet and switch repairs', 'Emergency fault resolution'],
    },
];

const ElectricalServices = () => {
    const navigate = useNavigate();

    return (
        <div className="electrical-page">
            <section className="electrical-hero">
                <h1>Electrical Services</h1>
                <p>
                    Choose the right category and connect with trusted professionals for installation,
                    maintenance, and repair.
                </p>
                <button className="browse-btn" onClick={() => navigate('/')}>
                    Browse Marketplace
                </button>
            </section>

            <section className="category-grid">
                {serviceCategories.map((category) => (
                    <article className="category-card" key={category.title}>
                        <h2>{category.title}</h2>
                        <p>{category.description}</p>
                        <ul>
                            {category.points.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default ElectricalServices;
