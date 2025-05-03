"use client";

import { useEffect, useRef, useState } from "react";
import { Video } from "@/app/types/course";

interface VideoPlayerProps {
  video: Video;
  userId: string;
  courseId: string;
  onProgressUpdate?: (progress: number) => void;
}

export default function VideoPlayer({
  video,
  userId,
  courseId,
  onProgressUpdate,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "video-ended") {
        setProgress(1);
        if (onProgressUpdate) {
          onProgressUpdate(1);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onProgressUpdate]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.contentWindow?.postMessage(
        "getCurrentTime",
        "*"
      );
      if (currentTime) {
        // Convert duration string (e.g., "45:00") to seconds
        const [minutes, seconds] = video.duration.split(":").map(Number);
        const totalDuration = minutes * 60 + seconds;
        const newProgress = currentTime / totalDuration;
        setProgress(newProgress);
        if (onProgressUpdate) {
          onProgressUpdate(newProgress);
        }
      }
    }
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        ref={videoRef}
        src={video.url}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-600 h-1.5 rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
