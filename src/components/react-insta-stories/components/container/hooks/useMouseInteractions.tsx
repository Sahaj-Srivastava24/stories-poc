import { useRef } from "react";
import useFactsStore from "@/components/react-insta-stories/store/useFactStore";
import { MOUSE_CALLBACK_TYPE } from "@/components/react-insta-stories/interfaces";

export default function useMouseInteraction(pause: boolean) {
  const mousedownId = useRef<number>();
  const { playStory, pauseStory, nextStory, previousStory } = useFactsStore()

  console.log("pauseStory", pauseStory)
  console.log("playStory", playStory)
  console.log("nextStory", nextStory)
  console.log("previousStory", previousStory)
  
  const debouncePause = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    mousedownId.current = setTimeout(pauseStory, 200);
  };

  const handleMouseUp = (type: MOUSE_CALLBACK_TYPE) => {
    console.log(nextStory, previousStory)
    return (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      mousedownId.current && clearTimeout(mousedownId.current);
      if (pause) {
        playStory();
      } else {
        if (type === MOUSE_CALLBACK_TYPE.NEXT) nextStory()
        else previousStory();
      }
    };
  }

  return { debouncePause, handleMouseUp }
}