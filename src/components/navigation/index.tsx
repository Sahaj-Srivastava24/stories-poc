import NavigationButton from "./NavigationButton"

type NavigationProps = {
  show: boolean
  currentStory: number
  children: React.ReactNode
  nextCallback: (currentStoryIndex: number) => void
  previousCallback: (currentStoryIndex: number) => void
}

const NavigationWrapper: React.FC<NavigationProps> = (props) => {
  if (!props.show) {
    return (
      <div className="flex items-center gap-10">
        {props.children}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-10">
      <NavigationButton
        text={"Prev"}
        cb={() => {
          console.log("prev clicked")
          props.previousCallback(props.currentStory)
        }}
      />
      {props.children}
      <NavigationButton
        text={"Next"}
        cb={() => {
          console.log("prev clicked")
          props.nextCallback(props.currentStory)
        }}
      />
    </div>
  )
}

export default NavigationWrapper