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
    fields: ["name", "adr_address", "reviews", "rating", "user_ratings_total"],
  };
  var service = new google.maps.places.PlacesService(map);

  service.getDetails(request, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < place.reviews.length; i++) {
        createCard(place, i);
      }
      createTitle(place);
      console.log(place);
    } else {
      console.log("PlacesServiceStatusError");
    }
  });
}

function createTitle(place) {
  document.getElementById("rating").innerHTML = place.rating;
  document.getElementById(
    "user-ratings-total"
  ).innerHTML = `of ${place.user_ratings_total} reviews`;
}

function createCard(place, id) {
  const lowestReviewScore = 3;

  if (place.reviews[id].rating >= lowestReviewScore) {
    const card = document.createElement("div");
    card.classList.add("card");
    document.getElementById("masonry__chopper").append(card);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card__body");
    card.append(cardBody);

    const reviewPhoto = document.createElement("img");
    reviewPhoto.classList.add("card__profile-photo");
    reviewPhoto.src = place.reviews[id].profile_photo_url;
    setAttributes(reviewPhoto, {
      alt: "Review Photo",
      style: "width:100%",
    });
    cardBody.append(reviewPhoto);

    const reviewName = document.createElement("div");
    reviewName.classList.add("card__author");
    reviewName.innerHTML = place.reviews[id].author_name;
    cardBody.append(reviewName);

    const starsContainer = document.createElement("div");
    starsContainer.classList.add("card__flex-container");
    cardBody.append(starsContainer);

    for (let i = 0; i < place.reviews[id].rating; i++) {
      const starElement = document.createElement("img");
      starElement.classList.add("card__star");
      setAttributes(starElement, {
        src: "/images/star.jpg",
        alt: "Star",
      });
      starsContainer.append(starElement);
    }

    const reviewText = document.createElement("div");
    reviewText.classList.add("card__review");
    reviewText.innerHTML = place.reviews[id].text;
    cardBody.append(reviewText);

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("card__flex-container");
    cardBody.append(contentContainer);

    const placesLogo = document.createElement("img");
    placesLogo.classList.add("card__logo");
    setAttributes(placesLogo, {
      src: "/images/places-logo.jpg",
      alt: "Review Photo",
    });
    contentContainer.append(placesLogo);

    const reviewTime = document.createElement("div");
    reviewTime.classList.add("card__time");
    reviewTime.innerHTML = place.reviews[id].relative_time_description;
    contentContainer.append(reviewTime);
  }
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
