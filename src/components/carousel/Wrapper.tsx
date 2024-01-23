import { FC, MutableRefObject } from "react";

type WrapperProps = {
  cellSize: number
  carouselRef: MutableRefObject<HTMLDivElement | null>
  children: React.ReactNode
}

const CarouselWrapper: FC<WrapperProps> = ({ cellSize, carouselRef, children }) => {
  return (
    <div
      id="container"
      style={{
        width: cellSize,
        height: "75vh",
        backgroundColor: "black",
        cursor: "pointer",
        overflow: "hidden",
      }}
      className="relative bg-transparent"
    >
      <div
        id="scene"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          perspective: 1000,
          width: "100%",
          height: "100%",
        }}
      >
        <div
          id="carousel"
          ref={carouselRef}
          className="w-full h-full absolute preserve-3d"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default CarouselWrapper