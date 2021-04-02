const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let totalImagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

const apiKey = "IkYiYKiyhS6vrA_2UqcKyfu4pwOMj4Qv0HZArxMUv8Y";
const count = 6;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&&count=${count}
`;

// get photo from api
async function getPhotos() {
  try {
    const photosArray = await (await fetch(apiUrl)).json();
    displayImage(photosArray);
  } catch (error) {
    // Catch Error Here
  }
}

function displayImage(photosArray) {
  totalImagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((image) => {
    // ancher element for photos
    const anchorElement = document.createElement("a");
    setAttribute(anchorElement, {
      href: image.links.html,
      target: "_blank",
    });
    // create image element
    const imageElement = document.createElement("img");
    setAttribute(imageElement, {
      src: image.urls.regular,
      alt: image.alt_description,
      title: image.alt_description,
    });
    // check if image is loaded
    imageElement.addEventListener("load", isImageLoaded);
    // put image inside anchor tag and anchor tage inside imageContainer
    anchorElement.appendChild(imageElement);
    imageContainer.appendChild(anchorElement);
  });
}

// check to se if scroll near botoms

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// check if image is loaded

function setAttribute(element, attribute) {
  for (const key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}

function isImageLoaded() {
  totalImagesLoaded++;
  if (totalImagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

getPhotos();
