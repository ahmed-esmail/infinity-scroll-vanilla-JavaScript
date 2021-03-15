const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

const apiKey = "IkYiYKiyhS6vrA_2UqcKyfu4pwOMj4Qv0HZArxMUv8Y";
const count = 10;
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
  photosArray.forEach((image) => {
    // ancher element for photos
    console.log(image);
    const anchor = document.createElement("a");
    anchor.setAttribute("href", image.links.html);
    anchor.setAttribute("target", "_blank");
    // create image element
    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", image.urls.regular);
    imageElement.setAttribute("alt", image.alt_description);
    imageElement.setAttribute("title", image.alt_description);
    // put image inside anchor tag and anchor tage inside imageContainer

    anchor.appendChild(imageElement);
    imageContainer.appendChild(anchor);
  });
}

getPhotos();
