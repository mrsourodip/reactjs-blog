import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import landingPageImage from '../Assets/landingPage.jpg';

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [introText, setIntroText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating data fetch delay for demonstration
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIntroText(
          'Welcome to Batman Blog. Explore the city, the principles and the legacy of Batman'
        );
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className='bg-gray-100 p-8 text-center'>
      {loading ? (
        <div className='flex flex-col items-center justify-center h-screen space-y-4'>
          <Skeleton height={200} width={600} />
          <Skeleton width={400} height={40} />
          <Skeleton width={500} height={20} count={3} />
        </div>
      ) : (
        <>
          <img
            src={landingPageImage}
            alt='Landing'
            className='mx-auto mb-4 w-full h-auto max-w-2xl rounded-lg shadow-lg'
          />
          <h2 className='text-3xl mb-4'>{introText}</h2>
          <p className='text-lg leading-relaxed'>
            One of the most iconic characters in popular culture, Batman has
            been listed among the greatest comic book superheroes and fictional
            characters ever created. He is one of the most commercially
            successful superheroes, and his likeness has been licensed and
            featured in various media and merchandise sold around the world;
            this includes toy lines such as Lego Batman and video games like the
            Batman: Arkham series.
          </p>
        </>
      )}
    </section>
  );
};

export default Hero;
