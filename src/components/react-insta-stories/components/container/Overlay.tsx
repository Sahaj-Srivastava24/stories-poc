import { MOUSE_CALLBACK_TYPE } from "../../interfaces"
import useFactsStore from "../../store/useFactStore"
import useMouseInteraction from "./hooks/useMouseInteractions"


const Overlay = ({ pause }: { pause: boolean }) => {
  const preventDefault = useFactsStore(state => state.preventDefault)
  const { debouncePause, handleMouseUp } = useMouseInteraction(pause)

  if (preventDefault)
    return <></>

  return (
    <div className="overlay">
      <div
        className="overlay__pane"
        onTouchStart={debouncePause}
        onTouchEnd={handleMouseUp(MOUSE_CALLBACK_TYPE.PREVIOUS)}
        onMouseDown={debouncePause}
        onMouseUp={handleMouseUp(MOUSE_CALLBACK_TYPE.PREVIOUS)}
      />
      <div
        className="overlay__pane"
        onTouchStart={debouncePause}
        onTouchEnd={handleMouseUp(MOUSE_CALLBACK_TYPE.NEXT)}
        onMouseDown={debouncePause}
        onMouseUp={handleMouseUp(MOUSE_CALLBACK_TYPE.NEXT)}
      />
    </div>
  )
}

export default Overlay