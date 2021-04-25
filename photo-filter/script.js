// Change filters on image
const inputs = document.querySelector('.filters');

inputs.addEventListener('input', (e) => {
  const filter = e.target;
  const suffix = filter.dataset.sizing;
  filter.nextElementSibling.innerHTML = filter.value; // Set output value
  document.documentElement.style.setProperty(`--${filter.name}`, filter.value + suffix);
})

// When pressed Reset button
const resetBtn = document.querySelector('.btn-reset');
const inputsArr = document.querySelectorAll('.filters input')

resetBtn.addEventListener('click', (e) => {
  inputsArr.forEach((input) => {
    const suffix = input.dataset.sizing;
    if (input.name == 'saturate') {
      input.value = 100;
      input.nextElementSibling.innerHTML = input.value;
      document.documentElement.style.setProperty(`--${input.name}`, input.value + suffix);
    } else {
      input.value = 0;
      input.nextElementSibling.innerHTML = input.value;
      document.documentElement.style.setProperty(`--${input.name}`, input.value + suffix);
    }
  });
})

// TODO: When pressed Next Picture Button

// When pressed Load button
const fileInput = document.querySelector('input[type="file"]');
const imageContainer = document.querySelector('.editor');

fileInput.addEventListener('change', function(e) {
  const file = fileInput.files[0];
  const reader = new FileReader();
  
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    img.onload = () => {
      document.querySelectorAll('img').forEach((image) => image.remove());
      imageContainer.append(img);
    };
  }
  
  reader.readAsDataURL(file);
});