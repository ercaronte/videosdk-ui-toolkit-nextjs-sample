# Zoom Video SDK UI Toolkit NextJS sample

This is a sample app of the Zoom Video SDK UI Toolkit based on NextJS and Tailwind CSS.

It is based on the following sample apps:
- [React sample app](https://github.com/zoom/videosdk-ui-toolkit-react-sample), and
- [NextJS quickstart app](https://github.com/zoom/videosdk-nextjs-quickstart)

This project is mostly to demonstrate a solution that avoids the UI Toolkit CSS to override the main application CSS.


## Getting Started

Install the `package.json` node module and start the app with `npm run dev`.

After launching the app, you can select the technique to load the UI Toolkit CSS stylesheet: dynamic or static. The overriding may happen after the Zoom call. <br/>
When using the dynamic approach, no issue.<br/>
However, when using the default approach taken from the [React sample app](https://github.com/zoom/videosdk-ui-toolkit-react-sample) (static import into the global CSS), you will see most styles overridden by UI Toolkit CSS.

## Notes
The CSS stylesheet in the `public` folder is a copy of the one coming with the UI Toolkit distribution. Created with the following command:

```shell
cp node_modules/@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css public/
```