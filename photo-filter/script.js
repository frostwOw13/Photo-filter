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
const inputsArr = document.querySelectorAll('.filters input');

resetBtn.addEventListener('click', () => {
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

// When pressed Next Picture Button
const nextBtn = document.querySelector('.btn-next');
let imageCount = 1;

function addZero(number) {
  return (number < 10) ? '0' + number : number;
}

function newCircle(number) {
  if (number > 20) imageCount = 1;
}

function createNewImage(src) {
  const img = new Image();
  
  img.crossOrigin = "Anonymous";
  img.src = src;
  img.onload = () => {
    document.querySelectorAll('img').forEach((image) => image.remove());
    imageContainer.append(img);
  };
}

nextBtn.addEventListener('click', () => {
  const time = new Date().getHours();
  
  if (time >= 6 && time < 12) {
    newCircle(imageCount);
    createNewImage(`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/${addZero(imageCount)}.jpg`);
    imageCount++;
  }
  else if (time >= 12 && time < 18) {
    newCircle(imageCount);
    createNewImage(`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/${addZero(imageCount)}.jpg`);
    imageCount++;
  }
  else if (time >= 18 && time < 24) {
    newCircle(imageCount);
    createNewImage(`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/${addZero(imageCount)}.jpg`);
    imageCount++;
  }

  else {
    newCircle(imageCount);
    createNewImage(`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/${addZero(imageCount)}.jpg`);
    imageCount++;
  }
});

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
  if (file) {
    reader.readAsDataURL(file);
    fileInput.value = null;
  }
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