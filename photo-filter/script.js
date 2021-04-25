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

// When pressed Save button
const saveBtn = document.querySelector('.btn-save');

saveBtn.addEventListener('click', () => {
  const blur = document.querySelector('input[name=blur'),
        invert = document.querySelector('input[name=invert'),
        sepia = document.querySelector('input[name=sepia'),
        saturate = document.querySelector('input[name=saturate'),
        hueRotate = document.querySelector('input[name=hue');

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const image = document.querySelector('img');

  canvas.width = 1600;
  canvas.height = 900;

  ctx.filter = `blur(${blur.value}px) invert(${invert.value}%) sepia(${sepia.value}%) saturate(${saturate.value}%) hue-rotate(${hueRotate.value}deg)`;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const a = document.createElement('a');
  const dataURL = canvas.toDataURL("image/jpeg");
  
  a.href = dataURL;
  a.download = 'download.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
})

// Fullscreen API
const btnFullscreen = document.querySelector('.fullscreen');

const getFullscreenElement = function () {
  return document.fullscreenElement  // for Chrome
      || document.webkitFullscreenElement // for Opera
      || document.mozFullscreenElement // for Mozilla
      || document.msFullscreenElement   // for IE or Edge
}

const toggleFullscreen = function () {
  if (getFullscreenElement()) {
      document.exitFullscreen();
  } else {
      document.documentElement.requestFullscreen().catch(console.log)
  }
}

btnFullscreen.addEventListener('click', e => {
  toggleFullscreen();
});