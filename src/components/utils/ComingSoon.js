import React from 'react';
import coming from '../assets/images/newFeatures.jpg';

function ComingSoon() {
  return (
    <div
      className="mt-20 flex items-center justify-center bg-cover bg-no-repeat w-full h-1/2"
      style={{ backgroundImage: `url(${coming})` }}
    >
      <div className="rounded-lg bg-black bg-opacity-50 p-8">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">Coming Soon</h1>
        <p className="text-lg md:text-2xl">
          We are working on something amazing. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
}

export default ComingSoon;
