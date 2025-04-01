import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const gifts = [
    { id: 1, image: 'https://picsum.photos/200/300?random=1', text: 'Gift 1: A beautiful surprise!' },
    { id: 2, image: 'https://picsum.photos/200/300?random=2', text: 'Gift 2: Something special for you!' },
    { id: 3, image: 'https://picsum.photos/200/300?random=3', text: 'Gift 3: A delightful treat!' },
];

function GiftSelectionPage() {
    const [selectedGift, setSelectedGift] = useState(null);
    const containerRef = useRef();
    const giftRefs = useRef([]);

    useEffect(() => {
        // Animate the page fade-in
        gsap.from(containerRef.current, { opacity: 0, duration: 1 });

        // Animate the gift boxes appearing
        gsap.from(giftRefs.current, { opacity: 0, y: 50, stagger: 0.2, duration: 1 });
    }, []);

    const handleGiftClick = (gift) => {
        setSelectedGift(gift);
        gsap.to(giftRefs.current, { opacity: 0, duration: 0.5 }); // Hide other gifts
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-800 to-pink-900 flex flex-col items-center justify-center p-6">
            {!selectedGift && <h1 className="text-white text-3xl font-bold mb-6 drop-shadow-lg">Select Your Gift</h1>}

            {!selectedGift && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {gifts.map((gift, index) => (
                        <div
                            key={gift.id}
                            ref={(el) => (giftRefs.current[index] = el)}
                            className="relative cursor-pointer w-40 h-40 bg-white rounded-lg shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
                            onClick={() => handleGiftClick(gift)}
                        >
                            <span className="text-lg font-semibold">Gift {gift.id}</span>
                        </div>
                    ))}
                </div>
            )}

            {selectedGift && (
                <div className="mt-6 text-center bg-white p-4 rounded-lg shadow-xl max-w-sm">
                    <img src={selectedGift.image} alt={`Gift ${selectedGift.id}`} className="w-full h-48 object-cover rounded-lg" />
                    <p className="text-purple-900 text-lg mt-2 font-semibold">{selectedGift.text}</p>
                </div>
            )}
        </div>
    );
}

export default GiftSelectionPage;
