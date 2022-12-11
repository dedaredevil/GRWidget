var map;
var service;
var infowindow;

function initMap() {
  var sydney = new google.maps.LatLng(35.23028688153356, -80.83964581780258);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map"), {
    center: sydney,
    zoom: 15,
  });

  var request = {
    // Enter unique place id here
    placeId: "ChIJldeDxyahVogRGKNE9zcaFt0",
    fields: ["name", "reviews"],
  };
  var service = new google.maps.places.PlacesService(map);

  service.getDetails(request, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      createCard(place, 1);
    } else {
      console.log("PlacesServiceStatusError");
    }
  });
}

function createCard(place, id) {
  const card = document.createElement("div");
  card.classList.add("card");
  document.getElementById("section").append(card);

  const mediaContent = document.createElement("div");
  mediaContent.classList.add("media-content");
  card.append(mediaContent);

  const reviewPhoto = document.createElement("img");
  reviewPhoto.classList.add("review-photo");
  reviewPhoto.src = place.reviews[id].profile_photo_url;
  setAttributes(reviewPhoto, {
    alt: "Review Photo",
    style: "width:100%",
  });
  mediaContent.append(reviewPhoto);

  const reviewName = document.createElement("div");
  reviewName.classList.add("title", "is-4");
  reviewName.innerHTML = place.reviews[id].author_name;
  mediaContent.append(reviewName);

  const starsContainer = document.createElement("div");
  starsContainer.classList.add("content-container");
  mediaContent.append(starsContainer);

  for (let i = 0; i < place.reviews[id].rating; i++) {
    const starElement = document.createElement("img");
    setAttributes(starElement, {
      src: "/images/star.jpg",
      alt: "Star",
      height: "15",
      width: "16",
    });
    starsContainer.append(starElement);
  }

  const reviewText = document.createElement("div");
  reviewText.classList.add("review-text");
  reviewText.innerHTML = place.reviews[id].text;
  mediaContent.append(reviewText);

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");
  mediaContent.append(contentContainer);

  const placesLogo = document.createElement("img");
  placesLogo.classList.add("places-logo");
  setAttributes(placesLogo, {
    src: "/images/places-logo.jpg",
    alt: "Review Photo",
  });
  contentContainer.append(placesLogo);

  const reviewTime = document.createElement("div");
  reviewTime.classList.add("is-grey", "is-6");
  reviewTime.innerHTML = place.reviews[id].relative_time_description;
  contentContainer.append(reviewTime);
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
