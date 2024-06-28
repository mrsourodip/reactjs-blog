import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => (
  <section id='contact-section' className='p-8 bg-gray-100'>
    <h2 className='text-3xl font-bold mb-4'>Contact Us</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <div className='space-y-4'>
        <div className='flex items-center space-x-2'>
          <FaMapMarkerAlt className='text-gray-600' />
          <p>Address: All of Gotham City</p>
        </div>
        <div className='flex items-center space-x-2'>
          <FaPhone className='text-gray-600' />
          <p>Phone: (100) Call-me-Batman</p>
        </div>
        <div className='flex items-center space-x-2'>
          <FaEnvelope className='text-gray-600' />
          <p>Email: batman@batman.com</p>
        </div>
      </div>
      <div className='aspect-w-16 aspect-h-9'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201710.3697166181!2d-122.69412316876384!3d37.819920936472265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808586deffffffc3%3A0xcded139783705509!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1719617333401!5m2!1sen!2sus'
          width='600'
          height='450'
          style={{ border: 0 }}
          allowfullscreen=''
          loading='lazy'
          referrerpolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>
    </div>
  </section>
);

export default ContactUs;
