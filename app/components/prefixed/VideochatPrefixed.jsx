'use client';

import uitoolkit from "@zoom/videosdk-ui-toolkit";
import "./videosdk-ui-toolkit.prefixed.css"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CSS_PREFIX = "zoom-sdk-scope"

const VideochatPrefixed = ({ params }) => {

  // console.log('VideochatPrefixed', params)

  const router = useRouter()
  let sessionContainer = null;

  // set your auth endpoint here
  // a sample is available here: https://github.com/zoom/videosdk-auth-endpoint-sample
  const authEndpoint = "http://localhost:4000";

  const config = {
    videoSDKJWT: "",
    sessionName: params.sessionName || "test",
    userName: params.userName || "React",
    sessionPasscode: "123",
    featuresOptions: {
      preview: {
        enable: false,
      },
      feedback: {
        enable: false,
      },
      virtualBackground: {
        enable: true,
        virtualBackgrounds: [
          {
            url: "https://images.unsplash.com/photo-1715490187538-30a365fa05bd?q=80&w=1945&auto=format&fit=crop",
          },
        ],
      },
    },
  };

  const role = parseInt(params.role);

  const addPrefix = () => {
    const body = document.getElementsByTagName("body")[0]
    if (!body.classList.contains(CSS_PREFIX)) body.classList.add(CSS_PREFIX)
  }

  const removePrefix = () => {
    const body = document.getElementsByTagName("body")[0]
    if (body.classList.contains(CSS_PREFIX)) body.classList.remove(CSS_PREFIX)
  }

  useEffect(() => {

    const getVideoSDKJWT = () => {
      sessionContainer = document.getElementById("sessionContainer")

      fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionName: config.sessionName,
          role: role,
          videoWebRtcMode: 1,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.signature) {
            // console.log(data.signature);
            config.videoSDKJWT = data.signature;
            joinSession();
          } else {
            console.warn(data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getVideoSDKJWT();
  })

  function joinSession() {
    console.log(config);
    addPrefix()
    if (sessionContainer) {
      uitoolkit.joinSession(sessionContainer, config);
      uitoolkit.onSessionClosed(sessionClosed);
      uitoolkit.onSessionDestroyed(sessionDestroyed);
    }
  }

  const sessionClosed = () => {
    console.log("session closed");
  };

  const sessionDestroyed = () => {
    console.log("session destroyed");
    uitoolkit.destroy();
    removePrefix()
    router.push("/")
  };

  return (
    <div className="h-full w-full">
      <main className="h-full w-full">
        <div id="sessionContainer" className="h-full w-full"></div>
      </main>
    </div>
  );

}

export default VideochatPrefixed;