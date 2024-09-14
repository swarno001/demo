document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '4b86f36c12c037182969c120629f52cb';
    const latitude = 22.828524065345434;
    const longitude = 89.52990499999999;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    const tempElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const loader = document.getElementById('loader');
    
    // Define the image arrays
    const marchToJune = ["aush.png", "calkumra.png", "jhinga.png"];
    const julyToSeptember = ["amon.png", "begun.png", "sim.png"];
    const octoberToFebruary = ["boro.png", "gom.png", "alu.png"];
    
    let images = [];
    let currentIndex = 0;
    
    async function fetchWeather() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data); // Check the structure of the data in the console

            if (data.main) {
                const temperature = data.main.temp;
                const humidity = data.main.humidity;

                tempElement.textContent = `Temperature: ${temperature}°C`;
                humidityElement.textContent = `Humidity: ${humidity}%`;

                loader.style.display = 'none'; // Hide the loader when data is fetched

                // Call updateImages with appropriate temperature and humidity categories
                const tempCategory = temperature > 25 ? 'high' : 'low'; // Example threshold
                const humCategory = humidity > 70 ? 'high' : 'low'; // Example threshold

                updateImages(tempCategory, humCategory);
            } else {
                throw new Error('API response does not contain the expected data');
            }
        } catch (error) {
            tempElement.textContent = 'Failed to load data';
            humidityElement.textContent = '';
            console.error('Error fetching weather data:', error);
        }
    }

    function updateImages(temp, hum) {
        const images = document.querySelectorAll('.images1, .images2, .images3');
        images.forEach(img => img.style.display = 'none'); 

        if (temp === 'high' && hum === 'high') {
            document.getElementById('q').style.display = 'block';
            document.getElementById('r').style.display = 'block';
        } else if (temp === 'low' && hum === 'high') {
            document.getElementById('q').style.display = 'block';
            document.getElementById('r').style.display = 'block';
        } else if (temp === 'high' && hum === 'low') {
            document.getElementById('p').style.display = 'block';
        } else if (temp === 'low' && hum === 'low') {
            document.getElementById('q').style.display = 'block';
        }
    }

    function formatGregorianDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function calculateBengaliDate(date) {
        const baishakhStart = new Date(date.getFullYear(), 3, 14); 
        let daysDiff = Math.floor((date - baishakhStart) / (1000 * 60 * 60 * 24)) + 1;

        const bengaliMonths = ['বৈশাখ', 'জৈষ্ঠ্য', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বয়ন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'];
        const daysInBengaliMonth = [31, 31, 30, 31, 30, 30, 30, 30, 30, 30, 30, 30];

        let monthIndex = 0;
        while (daysDiff > daysInBengaliMonth[monthIndex]) {
            daysDiff -= daysInBengaliMonth[monthIndex];
            monthIndex++;
        }

        return `${bengaliMonths[monthIndex]} ${daysDiff}`;
    }

    function updateDate() {
        const date = new Date();
        const gregorianDate = formatGregorianDate(date);
        const bengaliDate = calculateBengaliDate(date);

        const currentMonth = date.getMonth();
        let suffix;
        if (currentMonth >= 2 && currentMonth <= 5) { 
            suffix = ', খরিপ-১';
            images = marchToJune;
        } else if (currentMonth >= 6 && currentMonth <= 8) { 
            suffix = ', খরিপ-২';
            images = julyToSeptember;
        } else { 
            suffix = ', রবি';
            images = octoberToFebruary;
        }

        document.getElementById('date').textContent = `${gregorianDate}${suffix}`;
        document.getElementById('bengali-date').textContent = bengaliDate;
        
        currentIndex = 0; // Reset the current index
        updateImage(); // Initialize the image display based on the current month
    }

    function updateImage() {
        const imageElement = document.getElementById("image");
        if (images.length === 0) {
            console.error("No images to display.");
            return;
        }
        imageElement.src = images[currentIndex];
        
        imageElement.removeEventListener('click', handleImageClick);
        imageElement.addEventListener('click', handleImageClick);
        
        document.getElementById("prevBtn").disabled = currentIndex === 0;
        document.getElementById("nextBtn").disabled = currentIndex === images.length - 1;
    }

    function nextImage() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateImage();
        }
    }

    function prevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateImage();
        }
    }

    function handleImageClick() {
        const image = images[currentIndex];
        switch (image) {
            case 'amon.png':
                window.location.href = 'h1.html';
                break;
            case 'begun.png':
                window.location.href = 'h2.html';
                break;
            case 'sim.png':
                window.location.href = 'h3.html';
                break;
            case 'boro.png':
                window.location.href = 'h4.html';
                break;
            case 'gom.png':
                window.location.href = 'h5.html';
                break;
            case 'alu.png':
                window.location.href = 'h6.html';
                break;
            case 'aush.png':
                window.location.href = 'h7.html';
                break;
            case 'calkumra.png':
                window.location.href = 'h8.html';
                break;
            case 'jhinga.png':
                window.location.href = 'h9.html';
                break;
            default:
                break;
        }
    }

    document.getElementById("nextBtn").addEventListener("click", nextImage);
    document.getElementById("prevBtn").addEventListener("click", prevImage);

    fetchWeather();
    updateDate();
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        console.log('Hamburger clicked');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        console.log('Hamburger class:', hamburger.className);
        console.log('Nav Menu class:', navMenu.className);
    });
});
