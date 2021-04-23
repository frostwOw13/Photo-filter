// Change filters on image
const inputs = document.querySelector('.filters');

inputs.addEventListener('input', (e) => {
  const filter = e.target;
  const suffix = filter.dataset.sizing;
  filter.nextElementSibling.innerHTML = filter.value; // Set output value
  document.documentElement.style.setProperty(`--${filter.name}`, filter.value + suffix);
})