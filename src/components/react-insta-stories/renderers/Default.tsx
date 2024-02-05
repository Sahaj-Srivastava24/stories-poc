import { useEffect } from "react";
import { RendererProps, TesterProps } from "./../interfaces";

export const Renderer: RendererProps = ({ story, action, isPaused }) => {
  useEffect(() => {
    !isPaused && action("play");
  }, [action, story, isPaused]);

  return (
    <div style={styles.storyContent}>
      <p style={styles.text}>This story could not be loaded.</p>
    </div>
  );
};

const styles = {
  storyContent: {
    width: "100%",
    maxHeight: "100%",
    margin: "auto",
  },
  text: {
    textAlign: "center" as "center",
    color: "white",
    width: "90%",
    margin: "auto",
  },
};

export const tester: TesterProps = () => {
  return {
    condition: true,
    priority: 1,
  };
};

const DefaultRenderer = { Renderer, tester }
export default DefaultRenderer