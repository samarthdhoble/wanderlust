function scrollFilters(direction) {
  const container = document.getElementById('filters');
  const scrollAmount = 200;

  if (direction === 'left') {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}