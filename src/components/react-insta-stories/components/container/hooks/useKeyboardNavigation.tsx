import { useCallback, useEffect, useRef } from "react";
import useFactsStore from "@/components/react-insta-stories/store/useFactStore";

export default function useKeyboardNavigation() {
  const { pauseStory, nextStory, previousStory, keyboardNavigation } = useFactsStore((state) => ({
    pauseStory: state.pauseStory,
    nextStory: state.nextStory,
    previousStory: state.previousStory,
    keyboardNavigation: state.keyboardNavigation
  }))

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === "ArrowLeft") previousStory()
    else if (e.code === "ArrowRight") nextStory()
    else if (e.code === "Space") pauseStory()
  }, [nextStory, pauseStory, previousStory])

  useEffect(() => {
    const isClient = typeof window !== "undefined" && window.document;
    if (
      isClient &&
      typeof keyboardNavigation === "boolean" &&
      keyboardNavigation
    ) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [keyboardNavigation, handleKeyDown]);
}