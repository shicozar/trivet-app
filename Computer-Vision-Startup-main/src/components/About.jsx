import React from 'react';
import aboutImage from '../assets/about-image.jpg';
import serviceImage from '../assets/service-image.jpg';
import '../styles/About.css';
import 'animate.css';

const About = () => {
    return (
        <section className="about">
            {/* Hero Section */}
            <div className="about-hero text-center">
                <h1 className="display-4 animate__animated animate__fadeInDown">Empowering Businesses with AI</h1>
                <p className="lead mt-3 animate__animated animate__fadeInUp">Innovative solutions with AI and machine learning to help businesses thrive.</p>
                <a href="/contact" className="btn btn-primary btn-lg mt-4 animate__animated animate__fadeInUp">Contact Us</a>
            </div>

            {/* Our Mission Section */}
            <div className="section light-bg">
                <div className="container text-center">
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <h3>Our Mission</h3>
                            <p>
                                We aim to revolutionize industries with AI-driven solutions, empowering businesses with tools to improve efficiency and unlock new revenue streams.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Expertise Section */}
            <div className="section white-bg">
                <div className="container">
                    <div className="row align-items-center justify-content-between mt-5">
                        <div className="col-md-6 animate__animated animate__fadeInLeft text-center">
                            <img src={serviceImage} alt="Our Expertise" className="img-fluid rounded shadow" />
                        </div>
                        <div className="col-md-5 animate__animated animate__fadeInRight">
                            <h3>Our Expertise</h3>
                            <p>
                                Our team is experienced in AI, machine learning, and computer vision, serving industries like healthcare, automotive, and finance. We deliver custom AI solutions for your unique needs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values Section */}
            <div className="section light-bg">
                <div className="container text-center">
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <h3>Our Core Values</h3>
                            <ul className="list-unstyled">
                                <li><strong>Innovation:</strong> Finding cutting-edge solutions to real-world problems.</li>
                                <li><strong>Integrity:</strong> We operate with transparency and honesty in every project.</li>
                                <li><strong>Collaboration:</strong> Working closely with clients to create tailored solutions.</li>
                                <li><strong>Excellence:</strong> Committed to delivering high-quality products and services.</li>
                                <li><strong>Sustainability:</strong> Developing solutions that are efficient and environmentally conscious.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="section white-bg">
                <div className="container text-center">
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <h4>Ready to Transform Your Business?</h4>
                            <p>Contact us today to see how VisionML can help you leverage AI and ML for your business success.</p>
                            <a href="/contact" className="btn btn-primary btn-lg">Get In Touch</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
