// Define Variables

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//const cant be redefined

let img = new Image();
let fileName = '';

const downloadBtn = document.getElementById('download-btn');
const uploadFile = document.getElementById('upload-file');
const revertBtn = document.getElementById('revert-btn');

//Filters & Effects. Using event delegation instead of event listener on each Element
document.addEventListener('click', e => {
  if (e.target.classList.contains('filter-btn')) {
    if(e.target.classList.contains('brightness-add')) {
      //found in camanjs documentation
      Caman('#canvas', img, function() {
        this.brightness(10).render();
      });
    } else if(e.target.classList.contains
    ('brightness-remove')) {
      Caman('#canvas', img, function() {
        this.brightness(-10).render();
        });
//Contrast
  } else if(e.target.classList.contains
  ('contrast-add')) {
    Caman('#canvas', img, function() {
      this.contrast(10).render();
      });
    } else if(e.target.classList.contains
    ('contrast-remove')) {
      Caman('#canvas', img, function() {
        this.contrast(-10).render();
      });
    } else if(e.target.classList.contains
    ('saturation-add')) {
      Caman('#canvas', img, function() {
        this.saturation(10).render();
      });
    } else if(e.target.classList.contains
    ('saturation-remove')) {
      Caman('#canvas', img, function() {
        this.saturation(-10).render();
      });
    } else if(e.target.classList.contains
    ('vibrance-add')) {
      Caman('#canvas', img, function() {
        this.vibrance(10).render();
      });
    } else if(e.target.classList.contains
    ('vibrance-remove')) {
      Caman('#canvas', img, function() {
        this.vibrance(-10).render();
      });
      //Effects (don't take a number value!)
    } else if(e.target.classList.contains
    ('vintage-add')) {
      Caman('#canvas', img, function() {
        this.vintage().render();
      });
    } else if(e.target.classList.contains
    ('lomo-add')) {
      Caman('#canvas', img, function() {
        this.lomo().render();
      });
    } else if(e.target.classList.contains
    ('clarity-add')) {
      Caman('#canvas', img, function() {
        this.clarity().render();
      });
    } else if(e.target.classList.contains
    ('sincity-add')) {
      Caman('#canvas', img, function() {
        this.sinCity().render();
      });
    } else if(e.target.classList.contains
    ('crossprocess-add')) {
      Caman('#canvas', img, function() {
        this.crossProcess().render();
      });
    } else if(e.target.classList.contains
    ('pinhole-add')) {
      Caman('#canvas', img, function() {
        this.pinhole().render();
      });
    } else if(e.target.classList.contains
    ('nostalgia-add')) {
      Caman('#canvas', img, function() {
        this.nostalgia().render();
      });
    } else if(e.target.classList.contains
    ('hermajesty-add')) {
      Caman('#canvas', img, function() {
        this.herMajesty().render();
      });
    }
  }
});

//Remove Filters
revertBtn.addEventListener('click', e => {
  Caman('#canvas', img, function() {
    this.revert();
  });
});

//upload image Files
uploadFile.addEventListener('change', (e) => {
  //Get file
  const file = document.getElementById('upload-file')
  .files[0];

// Initalize fileReader api
const reader = new FileReader();

if(file) {
  //file name
  fileName = file.name;
  //reaf file as a URL
  reader.readAsDataURL(file);
}

// Add image to the canvas
reader.addEventListener('load', () => {
// Create image
img = new Image();
// Set src/source
img.src = reader.result;
// once image is loaded, add to the canvas
img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;
  //Draw image on canvas
  ctx.drawImage(img, 0, 0, img.width, img.height);
  canvas.removeAttribute('data-caman-id');
    }
  }, false);
});


// Download

//Download Event
//.slice takes of extension for example.. gets rid of .jpg so the file can be replaced with the edited/new file name.

downloadBtn.addEventListener('click', (e) => {
  //get file extension
  const fileExtension = fileName.slice(-4);

  // Initalize new file name.
  let newFileName;

  //check image type

  if(fileExtension === '.jpg' || fileExtension === '.png') {
    newFileName = fileName.substring(0, fileName.length - 4) + '-edited.jpg';
  }

  //Separate function for download

  // calling download
  download(canvas, newFileName);
});

// Call Download
function download(canvas, filename) {
  // Initalize Event
  let e;

  //Create link
  const link = document.createElement('a');

  //Set props
  link.download = filename;
  link.href = canvas.toDataURL('image/jpeg', 0.8);

  //New Mouse event
  e = new MouseEvent('click');

  //dispatch the event
  link.dispatchEvent(e);
}
