import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const gifts = [
 
  { id: 1, image: "/images/8.jpeg", text: "Gift 1: A beautiful surprise!" },
  { id: 2, image: "/images/9.jpeg", text: "Gift 2: Something special for you!" },
  { id: 3, image: "/images/10.jpeg", text: "Gift 3: A delightful treat!" },
  { id: 4, image: "/images/11.jpeg", text: "Gift 3: A delightful treat!" },
 
];

function GiftSelectionPage() {
  const [selectedGift, setSelectedGift] = useState(null);
  const giftRefs = useRef([]);

  useEffect(() => {
    gsap.from(giftRefs.current, {
      opacity: 1,
      y: 50,
      stagger: 0.2,
      duration: 0,
    });
  }, []);

  const handleGiftClick = (gift) => {
    setSelectedGift(gift);
    gsap.to(giftRefs.current, { opacity: 0, duration: 0.0 });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-12"
    >
      {!selectedGift && (
        <>
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center ">
            Select Your Gift
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-2 md:grid-cols-3 gap-2 w-full max-w-4xl">
            {gifts.map((gift, index) => (
              <div
                key={gift.id}
                ref={(el) => (giftRefs.current[index] = el)}
                className="cursor-pointer w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-white rounded-lg shadow-lg flex items-center justify-center hover:scale-105 transition-transform duration-300"
                onClick={() => handleGiftClick(gift)}
              >
               <img
                src={'/images/1.jpg'}
                
                className="w-full h-full object-cover rounded-max"
              />
               
              </div>
            ))}
          </div>
        </>
      )}

      {selectedGift && (
        <div className="mt-8 text-center bg-white p-5 rounded-lg shadow-xl max-w-sm w-full">
          <img
            src={selectedGift.image}
            alt={`Gift ${selectedGift.id}`}
            className="w-full h-48 sm:h-56 object-cover rounded-lg"
          />
          <p className="text-purple-900 text-base sm:text-lg mt-3 font-semibold">
            {selectedGift.text}
          </p>
        </div>
      )}
    </div>
  );
}

export default GiftSelectionPage;
