window.addEventListener('DOMContentLoaded', () => {
  const mapDiv = document.getElementById('map');
  if (!mapDiv) return;

  const location = mapDiv.dataset.location?.trim();
  const country = mapDiv.dataset.country?.trim();

  const fullAddress = `${location}, ${country}`;

  // 👇 Basic input validation
  const isInvalidInput = !location || !country || location.length < 2 || country.length < 2;

  if (isInvalidInput) {
    mapDiv.innerHTML = "❌ Invalid location or country provided.";
    return;
  }

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;

        const map = L.map('map').setView([lat, lon], 13);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap & CartoDB',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(map);

        L.marker([lat, lon]).addTo(map)
          .bindPopup(fullAddress)
          .openPopup();
      } else {
        mapDiv.innerHTML = "📍 Location not found. Please check spelling.";
      }
    })
    .catch(err => {
      console.error("Error loading map:", err);
      mapDiv.innerHTML = "❌ Failed to load map.";
    });
});
