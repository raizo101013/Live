// 1. Get the button and the body
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// 2. Listen for a click
toggleButton.addEventListener('click', function() {
    
    // 3. Toggle the 'light-mode' class on the body
    body.classList.toggle('light-mode');

    // 4. Change the icon (Sun ☀️ <-> Moon 🌙)
    if (body.classList.contains('light-mode')) {
        toggleButton.innerText = "🌙"; // Show Moon if in Light Mode
    } else {
        toggleButton.innerText = "☀️"; // Show Sun if in Dark Mode
    }
});
function toggleVideo() {
    const video = document.getElementById("portfolioVideo");
    const wrapper = document.querySelector(".video-wrapper");

    if (video.paused) {
        video.play();
        wrapper.classList.add("playing");
        video.controls = true; // Show default controls after it starts
    } else {
        video.pause();
        wrapper.classList.remove("playing");
        video.controls = false; // Hide controls when paused
    }
}



// --- WEATHER MODAL LOGIC ---
function openWeather() {
    document.getElementById('weatherModal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Stop background scrolling
    
    // Only fetch weather if we haven't yet (save data)
    if(document.getElementById('w-temp').innerText === "--°") {
        initWeather();
    }
}

function closeWeather() {
    document.getElementById('weatherModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// --- WEATHER API LOGIC ---
async function initWeather() {
    const lat = 25.3860; // Chanchal Lat
    const lon = 87.9944; // Chanchal Lon
    
    document.getElementById('w-city').innerText = "Chanchal, Malda";
    
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&air_quality=us_aqi`;
        const res = await fetch(url);
        const data = await res.json();
        
        updateWeatherUI(data.current);
    } catch (e) {
        document.getElementById('w-desc').innerText = "Connection Error";
    }
}

function updateWeatherUI(current) {
    // 1. Temp & Desc
    document.getElementById('w-temp').innerText = Math.round(current.temperature_2m) + "°";
    document.getElementById('w-desc').innerText = getWeatherText(current.weather_code);
    
    // 2. Icon
    const icon = document.getElementById('w-icon');
    icon.src = getWeatherIcon(current.weather_code);
    icon.style.display = "inline-block";
    
    // 3. Details
    document.getElementById('w-hum').innerText = current.relative_humidity_2m;
    document.getElementById('w-wind').innerText = Math.round(current.wind_speed_10m);
    
    // 4. AQI
    const aqi = current.us_aqi || 30;
    const aqiEl = document.getElementById('w-aqi');
    aqiEl.innerText = aqi;
    
    // Color AQI Card based on safety
    const aqiCard = document.getElementById('w-aqi-card');
    if(aqi > 100) aqiCard.style.background = "rgba(255, 50, 50, 0.2)"; // Red if bad
    else aqiCard.style.background = "rgba(50, 255, 100, 0.1)"; // Green if good

    // 5. Fake UV (API doesn't allow free UV easily)
    document.getElementById('w-uv').innerText = "Low";
}



function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function openModal(productName, price) {
    const modal = document.getElementById('orderModal');
    const modalText = document.getElementById('modalText');
    modalText.innerHTML = `You selected: <strong style="color: #00ffff;">${productName}</strong><br>Price: <strong style="color: #00ff88;">₹${price}</strong>`;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
// 1. Scroll Function
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// 2. Open Modal + TRIGGER PARTY 🎉
function openModal(productName, price) {
    // A. Show the popup
    const modal = document.getElementById('orderModal');
    const modalText = document.getElementById('modalText');
    modalText.innerHTML = `You selected: <strong style="color: #00ffff;">${productName}</strong><br>Price: <strong style="color: #00ff88;">₹${price}</strong>`;
    modal.style.display = 'flex';

    // B. Trigger the Party Effect!
    celebrate();
}

function closeModal() {
    document.getElementById('orderModal



