'use client'

import React from 'react';
import Lottie from 'lottie-react'
import animationData from '../Spinner/Loader1.json'; // Path to your Lottie JSON file

const Spinner = () => {

    return (
        <div className='w-10 h-10'>
            <Lottie animationData={animationData} height={5} width={5} />
        </div>
    );
};

export default Spinner