![GRWidgetExample](https://user-images.githubusercontent.com/29796332/209887436-6e52f3a6-fc01-4536-a0c9-1d5062429f73.png)

# GRWidget

GRWidget is an always up-to-date Google review widget for your website using [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript) and [Places API](https://developers.google.com/maps/documentation/javascript/places). This widget displays up to five Google Reviews from your non-search area Google Business location.

## Why GRWidget?

- **Lightweight** - One JS file and two CSS themes all under 15KB
- **Responsive** - Shows three different columns layouts at different breakpoints
- **Themes** - Choose from a light or dark theme
- **Zero Dependencies** - Only CSS and JS
- **Customization** - Control which reviews show

[See a demo](https://gr-widget.vercel.app/)

## Setup Instructions

Follow these steps to get your own widget running on your site:

1. **Configure** your [Google Cloud project](https://developers.google.com/maps/documentation/places/web-service/cloud-setup).
2. **Create** your [API key](https://developers.google.com/maps/documentation/places/web-service/get-api-key)
3. **Add** a website restriction to your API key. Click your API key in Google Cloud developer console and select `HTTP referrers (web sites)` under application restrictions. Add your site's URL to the web restriction section
4. **Add** two API restrictions to your API key. Click your API key in the Google Cloud developer console and select `restrict key` under API restrictions. Then add the following API's from the drop-down:

```
Maps JavaScript API
Places API
```

5. **Install** GRWidget:

```
npm install GRWidget
```

6. **Insert** the code below into your project's `<body>`:

```
<script src="src/index.js"></script>
<script async src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=places&v=weekly"></script>
<div id="widget"></div>
```

7. **Replace** `YOUR_API_KEY` with your [API key](https://developers.google.com/maps/documentation/places/web-service/get-api-key) from the script you added above:

```
<script async src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=places&v=weekly"></script>
```

8. **Copy** GRWidget's `src/` and `images/` directory into your project
9. **Choose** either the `light.css` or `dark.css` theme and link it inside the `<head>` tag:

```
<link rel="stylesheet" type="text/css" href="src/themes/light/light.css" />

<link rel="stylesheet" type="text/css" href="src/themes/dark/dark.css" />
```

10. **Find** your [Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) and save it to your clipboard
11. **Replace** the demo [Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) in the `index.js` file that you placed in your `src/` directory:

```
var request = {
  placeId: "ChIJldeDxyahVogRGKNE9zcaFt0",
  fields: ["name", "adr_address", "reviews", "rating", "user_ratings_total"],
  };
```

## Customization Option

**Edit** this constant in `index.js` to show reviews only over that score:

```
const LOWEST_REVIEW_SCORE = 3;
```
