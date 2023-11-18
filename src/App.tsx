import { ElementRef, useEffect, useRef, useState } from "react";

import "./App.css";
import { getFormmatedTimestamp } from "./helpers";
import { ProgressBar } from "./components/ProgressBar";

function App() {
  const videoRef = useRef<ElementRef<"video">>();
  const [currentTime, setCurrentTime] = useState<any>(0);

  const onPlay = () => videoRef.current?.play();
  const onPause = () => videoRef.current?.pause();
  const onFullScreen = () => videoRef.current!.requestFullscreen();

  useEffect(() => {
    const timeUpdate = () => {
      setCurrentTime(videoRef.current?.currentTime);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", timeUpdate);
    }

    return () => {
      videoRef.current?.removeEventListener("timeupdate", timeUpdate);
    };
  }, [videoRef.current]);

  const onProgressBarClicked = (percent: number) => {
    videoRef.current!.currentTime = percent * videoRef.current!.duration;
  };

  const progress = videoRef.current
    ? (videoRef.current!.currentTime / videoRef.current!.duration) * 100
    : 0;

  return (
    <div>
      <video ref={videoRef} width="500" height="300">
        <source
          src="https://drive.google.com/uc?export=download&id=1jxxC0AdLhQxihV8vKxR1NMoGMMABSZYX"
          type="video/mp4"
        />
      </video>
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onFullScreen}>Full Screen</button>
      <div className="time-container">
        <span>{getFormmatedTimestamp(currentTime)}</span>/
        <span>{getFormmatedTimestamp(videoRef.current?.duration)}</span>
      </div>
      <ProgressBar percent={progress} onClick={onProgressBarClicked} />
    </div>
  );
}

export default App;
