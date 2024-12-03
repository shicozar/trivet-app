import React, { useState } from 'react';
import axios from 'axios';
import contactImage from '../assets/contact-image.jpg';
import '../styles/Contact.css';
import 'animate.css';

const Contact = () => {
    // State for form data
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    // State for validation errors
    const [errors, setErrors] = useState({});
    // State for customers list
    const [customers, setCustomers] = useState([]);
    // State to track loading and if customers are fetched
    const [isLoading, setIsLoading] = useState(false);
    const [showCustomers, setShowCustomers] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
        }

        // Validate message
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            // Form is valid, submit the data
            console.log('Form Data:', formData);
            // You can add a success message or call an API here
        }
    };

    // Function to fetch all customers
    const fetchCustomers = async () => {
        console.log("Fetch called")
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/customers'); // Make sure this endpoint is correct
            console.log(response.data)
            setCustomers(response.data.customers);
            setShowCustomers(true);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="contact">
            <div className="container text-center">
                <div className="row align-items-center justify-content-between">
                    <div className="col-md-5">
                        <img src={contactImage} alt="Contact Us" className="img-fluid animate__animated animate__fadeInLeft" />
                    </div>
                    <div className="col-md-6 animate__animated animate__fadeInRight">
                        <h2>Contact Us</h2>
                        <form onSubmit={handleSubmit} className="text-start">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Your Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Your Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Your Message</label>
                                <textarea
                                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>

                        {/* Button to fetch and display customers */}
                        <div className="mt-4">
                            <button
                                onClick={fetchCustomers}
                                className="btn btn-success"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'See All Customers'}
                            </button>
                        </div>

                        {/* Display list of customers if fetched */}
                        {showCustomers && (
                            <div className="mt-4">
                                <h4>Joined Customers</h4>
                                <ul className="list-group">
                                    {customers.length > 0 ? (
                                        customers.map((customer, index) => (
                                            <li key={index} className="list-group-item">
                                                {customer.username} - {customer.email}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="list-group-item">No customers found</li>
                                    )}
                                </ul>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
