// Personal API Key for OpenWeatherMap API
const apiKey = '<your_api_key>&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Event listener for the generate button
document.getElementById('generate').addEventListener('click', performAction);

// Function to handle button click
const performAction = async () => {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  if (!zip) {
    alert('Please enter a valid ZIP code!');
    return;
  }

  try {
    const weatherData = await getWeather(zip);
    await postData('/addData', {
      temperature: weatherData.main.temp,
      date: new Date().toLocaleDateString(),
      userResponse: feelings,
    });
    updateUI();
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to fetch weather data from OpenWeatherMap API
const getWeather = async (zip) => {
  const response = await fetch(`${baseURL}${zip}&appid=${apiKey}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
};

// Function to send data to the server
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to post data');
  }
  return response.json();
};

// Function to update the UI
const updateUI = async () => {
  const request = await fetch('/getData');
  if (!request.ok) {
    throw new Error('Failed to fetch project data');
  }
  const data = await request.json();

  document.getElementById('temp').innerHTML = `Temperature: ${Math.round(data.temperature)}°F`;
  document.getElementById('date').innerHTML = `Date: ${data.date}`;
  document.getElementById('content').innerHTML = `Feelings: ${data.userResponse}`;
};
