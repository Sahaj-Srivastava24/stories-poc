import { useState, useEffect, useRef } from "react";
import { timestamp } from "@/components/react-insta-stories/util/time";
import Progress from "@/components/react-insta-stories/components/Progress";
import useFactsStore from "@/components/react-insta-stories/store/useFactStore";
import { useStoriesContext } from "@/components/react-insta-stories/context/Stories";
import { useProgressContext } from "@/components/react-insta-stories/context/Progress";

export default function ProgressArray() {
  const lastTime = useRef<number>();
  const [count, setCount] = useState<number>(0);

  const {
    currentId,
    next,
    videoDuration,
    pause,
    bufferAction
  } = useProgressContext();

  const {
    defaultInterval,
    onStoryEnd,
    onStoryStart,
    progressContainerStyles,
  } = useFactsStore()
  const { stories } = useStoriesContext();


  useEffect(() => {
    setCount(0);
  }, [currentId, stories]);

  useEffect(() => {
    if (!pause) {
      animationFrameId.current = requestAnimationFrame(incrementCount);
      lastTime.current = timestamp();
    }
    return () => {
      !!animationFrameId.current && cancelAnimationFrame(animationFrameId.current);
    };
  }, [currentId, pause]);

  let animationFrameId = useRef<number>();

  let countCopy = count;
  const incrementCount = () => {
    if (countCopy === 0) storyStartCallback();
    if (lastTime.current == undefined) lastTime.current = timestamp();
    const t = timestamp();
    const dt = t - lastTime.current;
    lastTime.current = t;
    setCount((count: number) => {
      const interval = getCurrentInterval();
      // TODO: Look into this logic if we can remove the optional thingy
      countCopy = count + (dt * 100) / interval!;
      return countCopy;
    });
    if (countCopy < 100) {
      animationFrameId.current = requestAnimationFrame(incrementCount);
    } else {
      storyEndCallback();
      !!animationFrameId.current && cancelAnimationFrame(animationFrameId.current);
      next();
    }
  };

  const storyStartCallback = () => {
    onStoryStart && onStoryStart(currentId, stories[currentId]);
  };

  const storyEndCallback = () => {
    onStoryEnd && onStoryEnd(currentId, stories[currentId]);
  };

  const getCurrentInterval = () => {
    if (stories[currentId].type === "video") return videoDuration;
    if (typeof stories[currentId].duration === "number")
      return stories[currentId].duration;
    return defaultInterval;
  };

  const opacityStyles = {
    opacity: pause && !bufferAction ? 0 : 1,
  };

  return (
    <div className="progressbar__wrapper" style={{
      ...progressContainerStyles,
      ...opacityStyles
    }}>
      {stories.map((_, i) => (
        <Progress
          key={i}
          count={count}
          width={1 / stories.length}
          active={i === currentId ? 1 : i < currentId ? 2 : 0}
        />
      ))}
    </div>
  );
};