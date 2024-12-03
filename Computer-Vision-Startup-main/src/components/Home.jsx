import React from 'react';
import '../styles/Home.css';
import homeImage from '../assets/home-image.jpg';
import solutionImage from '../assets/solution-image.jpg';
import serviceImage from '../assets/service-image.jpg';
import serviceImage2 from '../assets/service2.jpg';
import serviceImage3 from '../assets/service3.jpg';
import 'animate.css';

const Home = () => {
    return (
        <section className="home h-screen flex items-center justify-center">
           <div className='text-3xl font-bold text-emerald-500'>
               Travette
           </div>
        </section>
    );
};

export default Home;
