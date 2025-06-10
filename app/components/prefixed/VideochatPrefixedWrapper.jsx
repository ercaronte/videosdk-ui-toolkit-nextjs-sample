'use client';

import dynamic from "next/dynamic";
import Script from "next/script";

// The Videocall component is imported dynamically as it uses the Zoom Video SDK that needs access to the browser environment
const VideochatPrefixed = dynamic(
  () => import("./VideochatPrefixed"),
  { ssr: false },
);

export default function VideochatPrefixedWrapper({ params }) {
  // console.log('VideochatPrefixedWrapper', params)
  return <>
    <VideochatPrefixed params={params}/>
    <Script src="/coi-serviceworker.js" strategy="beforeInteractive"/>
  </>
}