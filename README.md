# Zoom Video SDK UI Toolkit NextJS sample

This is a sample app of the Zoom Video SDK UI Toolkit based on NextJS and Tailwind CSS.

It is based on the following sample apps:
- https://github.com/zoom/videosdk-ui-toolkit-react-sample, and
- https://github.com/zoom/videosdk-nextjs-quickstart

This project is mostly to demonstrate a solution that avoids the UI Toolkit CSS to overwrite the project CSS.


## Getting Started

Install the `package.json` node module and start the app with `npm run dev`.

After launching the app, you can select the stylesheet to use with the Zoom UI Toolkit, original or prefixed.


## Notes
The CSS stylesheet in the `public` folder is a copy of the one coming with the UI Toolkit distribution. Created with the following copy command:

```shell
cp node_modules/@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css public/
```