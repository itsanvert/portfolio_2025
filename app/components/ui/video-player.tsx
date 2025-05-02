"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipForward } from "lucide-react";

interface VideoPlayerProps {
  url: string;
  onComplete?: () => void;
}

export function VideoPlayer({ url, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onComplete?.();
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onComplete]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative group">
      <video
        ref={videoRef}
        src={url}
        className="w-full rounded-lg"
        controls={false}
      />

      {/* Overlay Controls */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div className="h-1 bg-white/20 rounded-full mb-2">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-primary transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <span className="text-white text-sm">
                {formatTime(videoRef.current?.currentTime || 0)} /{" "}
                {formatTime(duration)}
              </span>
            </div>
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = videoRef.current.duration;
                  onComplete?.();
                }
              }}
              className="text-white hover:text-primary transition-colors"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
