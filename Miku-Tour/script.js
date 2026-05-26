document.addEventListener('DOMContentLoaded', () => {
    const path = document.getElementById('svgPath');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // --- 📐 SVG Line-Drawing Engine ---
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    function animateTimeline() {
        const container = document.querySelector('.timeline-container');
        const markers = document.querySelectorAll('.timeline-marker');
        const lastMarker = markers[markers.length - 1];
        
        if (!lastMarker) return;

        const rect = container.getBoundingClientRect();
        const lastMarkerRect = lastMarker.getBoundingClientRect();
        
        // 🎯 Total distance from top of container to the center of the final dot
        const totalHeight = lastMarkerRect.top - rect.top + (lastMarkerRect.height / 2);
        
        // 🧼 Steady pace scroll tracking (pixel-for-pixel ratio)
        const scrolled = -rect.top / totalHeight;
        const currentProgress = Math.max(0, Math.min(0.95, scrolled));
        
        // Reveal the path line at a steady speed
        path.style.strokeDashoffset = pathLength - (currentProgress * pathLength);

// --- 🕒 Synchronized Card Trigger Engine ---
        timelineItems.forEach((item, index) => {
            const marker = item.querySelector('.timeline-marker');
            if (!marker) return;

            // 🎯 Force the very first card (Snow Miku) to stay visible immediately
            if (index === 0) {
                item.classList.add('visible');
                return;
            }

            const markerRect = marker.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // 📐 TRIGGER POINT: Trigger the card when the dot rises up to 75% from the top of the screen.
            // This ensures the card and image below it are fully in view at the bottom of the screen!
            if (markerRect.top <= viewportHeight * 0.75) {
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
            }
        });
    }

    // --- ⬢ Dynamic Floating Hologram Particles Generator ---
    function createBackgroundFX() {
        const canvas = document.getElementById('space-canvas');
        if (!canvas) return;

        const shapes = ['hexagon', 'cyber-bar', 'digital-dot'];
        const colors = ['turquoise', 'red', 'cyber-black']; 

        for (let i = 0; i < 25; i++) {
            const shape = document.createElement('div');
            const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            shape.classList.add('bg-shape', randomShape, randomColor);
            
            // Randomize spatial layouts and animation timelines
            shape.style.top = `${Math.random() * 100}vh`;
            shape.style.left = `${Math.random() * 100}vw`;
            shape.style.animationDuration = `${18 + Math.random() * 22}s`;
            shape.style.animationDelay = `${Math.random() * -20}s`;
            
            canvas.appendChild(shape);
        }
    }

    // Initialize Event Listeners
    createBackgroundFX();
    window.addEventListener('scroll', animateTimeline);
    animateTimeline(); // Run once on startup to check initial scroll placement
});