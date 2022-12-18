var map;
var service;
var infowindow;

window.addEventListener("resize", resizeFlexbox);
renderMAP();

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
      renderDOM(place);
      // Initial checck on media query
      resizeFlexbox();
    } else {
      console.log("PlacesServiceStatusError");
    }
  });
}

function renderDOM(place) {
  // <div class="title">
  const TITLE = document.createElement("div");
  TITLE.classList.add("title");
  document.getElementById("widget").append(TITLE);

  // <div class="title__copy">
  const TITLE_COPY = document.createElement("div");
  TITLE_COPY.classList.add("title__copy");
  TITLE_COPY.innerHTML = "Be Another Success Story";
  TITLE.append(TITLE_COPY);

  // <div class="title__body">
  const TITLE_BODY = document.createElement("div");
  TITLE_BODY.classList.add("title__body");
  TITLE.append(TITLE_BODY);

  // <div class="title__card">
  const TITLE_CARD = document.createElement("div");
  TITLE_CARD.classList.add("title__card");
  TITLE_CARD.setAttribute("id", "title_card");
  TITLE_BODY.append(TITLE_CARD);

  // <div class="title__rating">
  const TITLE_RATING = document.createElement("div");
  TITLE_RATING.classList.add("title__rating");
  TITLE_RATING.innerHTML = place.rating;
  TITLE_CARD.append(TITLE_RATING);

  const RATING = place.rating;

  switch (true) {
    case RATING >= 4.5:
      renderStars(5);
      break;
    case RATING >= 3.5:
      renderStars(4);
      break;
    case RATING >= 2.5:
      renderStars(3);
      break;
    case RATING >= 1.5:
      renderStars(2);
      break;
    case RATING >= 0.5:
      renderStars(1);
      break;
    default:
  }

  // <div class="title__rating-total">
  const TITLE_RATINGS = document.createElement("div");
  TITLE_RATINGS.classList.add("title__ratings-total");
  TITLE_RATINGS.innerHTML = `of ${place.user_ratings_total} reviews`;
  TITLE_BODY.append(TITLE_RATINGS);

  // <div class="masonry">
  const MASONRY = document.createElement("div");
  MASONRY.classList.add("masonry");
  document.getElementById("widget").append(MASONRY);

  // <div class="masonry__chopper">
  const MASONRY_CHOPPER = document.createElement("div");
  MASONRY_CHOPPER.classList.add("masonry__chopper");
  MASONRY_CHOPPER.setAttribute("id", "masonry__chopper");
  MASONRY.append(MASONRY_CHOPPER);

  // Render cards
  for (let i = 0; i < place.reviews.length; i++) {
    createCard(place, i);
  }
}

function renderStars(count) {
  for (let i = 0; i < count; i++) {
    const STAR_ELEMENT = document.createElement("img");
    STAR_ELEMENT.classList.add("title__stars");
    setAttributes(STAR_ELEMENT, {
      src: "/images/star.jpg",
      alt: "Star",
    });
    document.getElementById("title_card").append(STAR_ELEMENT);
  }
}

function createStars(count) {
  for (let i = 0; i < count; i++) {
    const STAR_ELEMENT = document.createElement("img");
    STAR_ELEMENT.classList.add("title__stars");
    setAttributes(STAR_ELEMENT, {
      src: "/images/star.jpg",
      alt: "Star",
    });
    document.getElementById("title__card").append(STAR_ELEMENT);
  }
}

function createCard(place, id) {
  const LOWEST_REVIEW_SCORE = 3;

  if (place.reviews[id].rating >= LOWEST_REVIEW_SCORE) {
    const CARD = document.createElement("a");
    CARD.classList.add("card");
    CARD.setAttribute("href", place.reviews[id].author_url);
    document.getElementById("masonry__chopper").append(CARD);

    const CARD_BODY = document.createElement("div");
    CARD_BODY.classList.add("card__body");
    CARD.append(CARD_BODY);

    const REVIEW_PHOTO = document.createElement("img");
    REVIEW_PHOTO.classList.add("card__profile-photo");
    REVIEW_PHOTO.src = place.reviews[id].profile_photo_url;
    setAttributes(REVIEW_PHOTO, {
      alt: "Review Photo",
      style: "width:100%",
    });
    CARD_BODY.append(REVIEW_PHOTO);

    const REVIEW_NAME = document.createElement("div");
    REVIEW_NAME.classList.add("card__author");
    REVIEW_NAME.innerHTML = place.reviews[id].author_name;
    CARD_BODY.append(REVIEW_NAME);

    const STARS_CONTAINER = document.createElement("div");
    STARS_CONTAINER.classList.add("card__flex-container");
    CARD_BODY.append(STARS_CONTAINER);

    for (let i = 0; i < place.reviews[id].rating; i++) {
      const STAR_ELEMENT = document.createElement("img");
      STAR_ELEMENT.classList.add("card__star");
      setAttributes(STAR_ELEMENT, {
        src: "/images/star.jpg",
        alt: "Star",
      });
      STARS_CONTAINER.append(STAR_ELEMENT);
    }

    const REVIEW_TEXT = document.createElement("div");
    REVIEW_TEXT.classList.add("card__review");
    REVIEW_TEXT.innerHTML = place.reviews[id].text;
    CARD_BODY.append(REVIEW_TEXT);

    const CONTENT_CONTAINER = document.createElement("div");
    CONTENT_CONTAINER.classList.add("card__flex-container");
    CARD_BODY.append(CONTENT_CONTAINER);

    const placesLogo = document.createElement("img");
    placesLogo.classList.add("card__logo");
    setAttributes(placesLogo, {
      src: "/images/places-logo.jpg",
      alt: "Review Photo",
    });
    CONTENT_CONTAINER.append(placesLogo);

    const REVIEW_TIME = document.createElement("div");
    REVIEW_TIME.classList.add("card__time");
    REVIEW_TIME.innerHTML = place.reviews[id].relative_time_description;
    CONTENT_CONTAINER.append(REVIEW_TIME);
  }
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function resizeFlexbox() {
  const MEDIA_QUERY_SINGLE = 768;
  if (window.innerWidth < MEDIA_QUERY_SINGLE) {
    const CARDS = document.getElementsByClassName("card");
    let maxHeight = 0;
    const OFFSET_HEIGHT = 150;
    for (let i = 0; i < CARDS.length; i++) {
      maxHeight += CARDS[i].clientHeight;
    }
    document.getElementById("masonry__chopper").style.height = `${
      maxHeight + OFFSET_HEIGHT
    }px`;
  } else {
    document.getElementById("masonry__chopper").style.height = null;
  }
}

function renderMAP() {
  const MAP = document.createElement("div");
  MAP.setAttribute("id", "map");
  MAP.style.display = "none";
  document.body.appendChild(MAP);
  // <div id="map" style="display: none"></div>
}
