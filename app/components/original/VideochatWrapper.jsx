'use client';

import dynamic from "next/dynamic";
import Script from "next/script";

// The Videocall component is imported dynamically as it uses the Zoom Video SDK that needs access to the browser environment
const Videochat = dynamic(
  () => import("./Videochat"),
  { ssr: false },
);

export default function VideochatWrapper({ params }) {
  // console.log('VideochatWrapper', params)
  return <>
    <Videochat params={params}/>
    <Script src="/coi-serviceworker.js" strategy="beforeInteractive"/>
  </>
}