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
  const router = useRouter();
  const sessionContainerRef = useRef(null);
  const cssLinkRef = useRef(null);

  // Load CSS for toolkit
  const loadCSS =() => {
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

  // Handle session closed/destroyed
  const handleSessionClosed =() => {
    console.log("session closed");
  }

  const handleSessionDestroyed = () => {
    console.log("session destroyed");
    uitoolkit.destroy();
    unloadCSS();
    router.push("/");
  }

  // Join session with JWT
  const joinSession = (jwt) => {
    const config = getConfig(params, jwt);
    const container = sessionContainerRef.current;
    if (container) {
      loadCSS();
      uitoolkit.joinSession(container, config);
      uitoolkit.onSessionClosed(handleSessionClosed);
      uitoolkit.onSessionDestroyed(handleSessionDestroyed);
    }
  }

  // Fetch JWT and join session
  useEffect(() => {
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
    return unloadCSS;
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