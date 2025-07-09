# Zoom Video SDK UI Toolkit NextJS sample

This is a sample app of the Zoom Video SDK UI Toolkit based on NextJS and Tailwind CSS.

It is based on the following sample apps:
- https://github.com/zoom/videosdk-ui-toolkit-react-sample, and
- https://github.com/zoom/videosdk-nextjs-quickstart

This project is mostly to demonstrate the CSS overwriting issues that the UI Toolkit default stylesheet 
may have with the styles of apps created using Tailwind CSS.

## Prefixing the UI Toolkit 

Since the stylesheet of the UI Toolkit can overwrite the app stylesheet, 
a suggested approach is to prefix the CSS styles, see comments in 
https://github.com/zoom/videosdk-ui-toolkit-web/issues/53

The script `script/prefix-zoom-css.js` creates a copy of the original `videosdk-ui-toolkit.css` 
with a custom prefix.
The created stylesheet is used by the `VideochatPrefixed.jsx` component. 

With Zoom Video SDK UI toolkit version v2.1.10-2, the prefixed approach works only if the custom prefix is added to the `body`element. 
This is done dynamically in the `joinSession` function, and it is dynamically removed in the `destroySession` function.

## Getting Started

Install the `package.json` node module and start the app with `npm run dev`.

After launching the app, you can select the stylesheet to use with the Zoom UI Toolkit, original or prefixed.

