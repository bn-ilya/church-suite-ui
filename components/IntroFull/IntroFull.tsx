import { headerHight } from "@/utils/constants";

export const IntroFull = () => {
  return (
    <div className={`h-[calc(100vh-${headerHight}px)] w-full relative`}>
        <video muted={true} autoPlay={true} loop={true} className="absolute top-0 left-0 min-w-full min-h-full object-cover">
          <source src='/video/intro-video.mp4' type="video/mp4"/>
        </video>
    </div>
  )
};