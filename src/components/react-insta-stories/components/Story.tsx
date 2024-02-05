import { StoryProps } from "./../interfaces";
import useFactsStore from "../store/useFactStore";

const Story = (props: StoryProps) => {

  const {
    width,
    height,
    loader,
    header,
    storyStyles,
    storyInnerContainerStyles = {},
  } = useFactsStore();

  const rendererMessageHandler = (type: string, data: any) => {
    switch (type) {
      case "UPDATE_VIDEO_DURATION":
        props.getVideoDuration(data.duration);
        return { ack: "OK" as const };

      default:
        console.error("renderedMessageHandler in Story threw error")
        return { ack: "ERROR" as const }
    }

  };

  const getStoryContent = () => {
    if (props.story?.content) {
      let InnerContent = props.story.content;
      let config = { width, height, loader, header, storyStyles };
      return (
        <InnerContent
          action={props.action}
          isPaused={props.playState}
          story={props.story}
          config={config}
          messageHandler={rendererMessageHandler}
        />
      );
    }
  };

  return (
    <div
      style={{
        ...styles.story,
        ...storyInnerContainerStyles,
        width: width,
        height: height,
      }}
    >
      {getStoryContent()}
    </div>
  );
};

const styles = {
  story: {
    display: "flex",
    position: "relative" as "relative",
    overflow: "hidden",
    alignItems: "center",
  },
  storyContent: {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  },
};

export default Story;
