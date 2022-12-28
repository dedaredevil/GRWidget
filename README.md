# GRWidget

GRWidget is an always up-to-date Google review widget for your website using [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript) and [Places API](https://developers.google.com/maps/documentation/javascript/places). This widget displays up to five Google Reviews from your non-search area Google Business location.

## Why GRWidget?

* **Lightweight** - Only one JS file under 9KB
* **Responsive** - Shows three different columns layouts at different breakpoints
* **Themes** - Choose from a light or dark theme
* **Zero Dependencies** - Only CSS and JS
* **Customization** - Control which reviews show

[See a demo](https://www.google.com/)

## Setup Instructions

Follow these steps to get your own widget running on your site:

1. **Configure** your [Google Cloud project](https://developers.google.com/maps/documentation/places/web-service/cloud-setup).
2. **Create** your [API key](https://developers.google.com/maps/documentation/places/web-service/get-api-key)
3. **Restrict** your key to:

```
Maps JavaScript API
Places API
```
4. **Install** GRWidget:

```
npm install GRWidget
```
5. **Insert** in your project's <body>:

```
<script src="src/index.js"></script>
<script async src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=places&v=weekly"></script>
<div id="widget"></div>
```
6. **Replace** `YOUR_API_KEY` with your [API key](https://developers.google.com/maps/documentation/places/web-service/get-api-key) from the script above:

```
<script async src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=places&v=weekly"></script>
```
7. **Move** everything from the GRWidget's `src/` directory into your own project's `src/` directory:

```
src 
├── index.js
└── themes
    ├── dark
    │   ├── dark.css
    └── light
        └── light.css
```
8. **Choose** either the `light.css` or `dark.css` by adding the appropriate themed stylesheet to the `<head>` tag:

```
<link rel="stylesheet" type="text/css" href="src/themes/light/light.css" />
```
9. **Find** your [Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) and save it to your clipboard
10. **Replace** the demo [Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) in the `index.js` file that you placed in your `src/` directory:

```
var request = {
  placeId: "ChIJldeDxyahVogRGKNE9zcaFt0",
  fields: ["name", "adr_address", "reviews", "rating", "user_ratings_total"],
  };
```

## Customization Option
**Replace** the number in `index.js` to show reviews only over that amount:
```
const LOWEST_REVIEW_SCORE = 3;
```
