Watson Loader Animation
---

## What's here:

- SVG Animation
- Gif Animation
- Modernizr (SMIL & SVG)
- SCSS for Fallback class usage


## How to Implement

### 1. Copy Resources
Copy the two images `WatsonAvatar.svg` & `WatsonAvatar.gif` within your image folder. Also copy over the `modernizr.svg-smil.js` and `main.scss`

### 2. Inlcude Base HTML
This HTML has the SVG Animation within an `<object>` tag, as well as the Gif fallback as a `<img>` within a `<div>`. Make sure the images are linked correctly based off your file structure.

```html
<div class="loader">
  <object type="image/svg+xml" data="img/WatsonAvatar.svg" class="loader--svg"></object>  
  <div class="loader--fallback"><img src="img/WatsonAvatar.gif" width="100%" alt=""></div>
</div> 
```
### 3. Modernizr

Import Modernizr to your base html.

```html
<script src="js/modernizr.svg-smil.js" type="text/javascript"></script> 
```

Import Sass to your Stylesheets

The Sass file has the main `.loader` class for placement and scaling. It also includes fallbacks classes that modernizr uses. 

```scss
.loader {
	width: 100px;
}

.smil {
	& .loader--fallback {
	display: none; 
	}
}

.no-smil {
	& .loader--fallback {
		display: block;
	}
	& .loader--svg {
		display: none;
	}
}

.no-svg {
	& .loader--fallback {
		display: block;
	}
	& .loader--svg {
		display: none;
	}
}
```

### SVG Animations
- SVG and Gif fallback animations are housed in the `img` folder

- All of the Animation is housed within the SVG file. There are 2 types of animation in the SVG file:
	- `SMIL`- Animates the smaller elements like strokes and dots animating 
	- `CSS` - Animate the larger elements like scaling of the entire SVG
