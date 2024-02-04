import { useCallback, useRef } from "react";
import useFactsStore from "@/components/react-insta-stories/store/useFactStore";
import { MOUSE_CALLBACK_TYPE } from "@/components/react-insta-stories/interfaces";

export default function useMouseInteraction(pause: boolean) {
  const mousedownId = useRef<number>();
  const { playStory, pauseStory, nextStory, previousStory } = useFactsStore()

  const debouncePause = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    mousedownId.current = setTimeout(pauseStory, 200);
  };

  const handleMouseUp = useCallback((type: MOUSE_CALLBACK_TYPE) => {
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
  }, [pause, playStory, previousStory, nextStory])

  return { debouncePause, handleMouseUp }
}