'use client';

import uitoolkit from "@zoom/videosdk-ui-toolkit";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// set your auth endpoint here
const AUTH_ENDPOINT = "http://localhost:4000";

const getConfig = (params, jwt = "") => ({
  videoSDKJWT: jwt,
  sessionName: params.sessionName || "test",
  userName: params.userName || "React",
  sessionPasscode: "123",
  featuresOptions: {
    preview: { enable: false },
    feedback: { enable: false },
    virtualBackground: {
      enable: true,
      virtualBackgrounds: [
        {
          url: "https://images.unsplash.com/photo-1715490187538-30a365fa05bd?q=80&w=1945&auto=format&fit=crop",
        },
      ],
    },
  },
});

const Videochat = ({ params }) => {
  console.log("Videochat loaded, with params:", params);
  const router = useRouter();
  const sessionContainerRef = useRef(null);
  const cssLinkRef = useRef(null);
  const callbackCounter = useRef(0);

  // Load CSS for toolkit
  const loadCSS = () => {
    if (!cssLinkRef.current) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/videosdk-ui-toolkit.css';
      document.head.appendChild(link);
      cssLinkRef.current = link;
    }
  }

  // Unload CSS when session ends
  const unloadCSS = () => {
    if (cssLinkRef.current) {
      document.head.removeChild(cssLinkRef.current);
      cssLinkRef.current = null;
    }
  }

  // Handle session joined
  const handleSessionJoined = () => {
    console.log(`handleSessionJoined, function.id: ${handleSessionClosed.id}`);

    // Unregister all session joined listeners
    uitoolkit.offSessionJoined();
  }
  handleSessionJoined.id = new Date().getTime();

  // Handle session closed
  const handleSessionClosed = () => {
    console.log(`handleSessionClosed, function.id: ${handleSessionClosed.id}`);

    // Unregister all session closed listeners
    uitoolkit.offSessionClosed();
  }
  handleSessionClosed.id = new Date().getTime();

  // Handle session destroyed
  const handleSessionDestroyed = () => {
    callbackCounter.current += 1;

    // Prevent multiple executions since uitoolkit doesn't support removing onSessionDestroyed listeners
    if (callbackCounter.current > 2) {
      console.log(`handleSessionDestroyed. Callback IGNORED! Counter ${callbackCounter.current}, function.id: ${handleSessionDestroyed.id}`)
      return;
    }
    console.log(`handleSessionDestroyed. Counter ${callbackCounter.current}, function.id: ${handleSessionDestroyed.id}`)

    uitoolkit.destroy();
    unloadCSS();
    router.push("/");
  };
  handleSessionDestroyed.id = new Date().getTime();

  // Join session with JWT
  const joinSession = (jwt) => {
    console.log("joinSession, name:", params.sessionName);
    const config = getConfig(params, jwt);
    const container = sessionContainerRef.current;
    if (container) {
      loadCSS();
      uitoolkit.joinSession(container, config);
      uitoolkit.onSessionJoined(handleSessionJoined);
      uitoolkit.onSessionClosed(handleSessionClosed);
      uitoolkit.onSessionDestroyed(handleSessionDestroyed);
    }
  }

  // Fetch JWT and join session
  useEffect(() => {
    console.log("useEffect. Fetching JWT and joining session...");
    const fetchJWTAndJoin = async () => {
      try {
        const res = await fetch(AUTH_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionName: params.sessionName || "test",
            role: parseInt(params.role),
            videoWebRtcMode: 1,
          }),
        });
        const data = await res.json();
        if (data.signature) {
          joinSession(data.signature);
        } else {
          console.warn(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJWTAndJoin();
    return () => {
      unloadCSS();
    };
  }, [params]);

  return (
    <div className="h-full w-full">
      <main className="h-full w-full">
        <div ref={sessionContainerRef} className="h-full w-full"></div>
      </main>
    </div>
  );
};

export default Videochat;