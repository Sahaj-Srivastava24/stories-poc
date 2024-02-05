import { useState } from "react";
import Spinner from "../components/Spinner";
import { RendererProps, TesterProps } from "./../interfaces";
import WithHeader from "./wrappers/withHeader";
import WithSeeMore from "./wrappers/withSeeMore";
import Image from "next/image";

export const Renderer: RendererProps = ({ story, action, isPaused, config }) => {
  const [loaded, setLoaded] = useState(false);
  const { width, height, loader, storyStyles } = config;
  let computedStyles = {
    ...styles.storyContent,
    ...(storyStyles || {}),
  };

  console.log("Inside Image Rendereres, isPaused", isPaused)

  const imageLoaded = () => {
    setLoaded(true);
    !isPaused && action("play");
  };

  return (
    <WithHeader {...{ story, globalHeader: config.header! }}>
      <WithSeeMore {...{ story, action }}>
        <div>
          {story.url && (
            <Image
              alt=""
              style={computedStyles}
              src={story.url}
              onLoad={imageLoaded}
            />
          )}
          {!loaded && (
            <div
              style={{
                width: width,
                height: height,
                position: "absolute",
                left: 0,
                top: 0,
                background: "rgba(0, 0, 0, 0.9)",
                zIndex: 9,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#ccc",
              }}
            >
              {loader || <Spinner />}
            </div>
          )}
        </div>
      </WithSeeMore>
    </WithHeader>
  );
};

const styles = {
  story: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
  },
  storyContent: {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  },
};

export const tester: TesterProps = (story) => {
  return {
    condition: !story.content && (!story.type || story.type === "image"),
    priority: 2,
  };
};

const ImageRenderer = { Renderer, tester }
export default ImageRenderer