import { TStorySet } from "@/helpers/story-data";
import { useEffect, useRef, useState } from "react";

export const useCarousel = (data: TStorySet[]) => {
  const [imagePosition, setImagePosition] = useState(
    new Map(data.map((i) => [i.id, 0]))
  );
  const [cellSize, setCellSize] = useState(400);

  // For this logic, this has to be 0-indexed
  const [currentStory, setCurrentStory] = useState(data[0].id - 1);
  const hold = useRef(0);
  const radiusRef = useRef(240 / Math.tan(Math.PI / 4));

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const currentStoryRef = useRef(data[0].id - 1);
  const [radius, setRadius] = useState(240 / Math.tan(Math.PI / 4));

  let isDown = false;
  let current = 0;
  let rotateYref = 0;

  console.log("Current Story", currentStory)
  console.log("Image Position", imagePosition)
  console.log("currentStoryRef", currentStoryRef.current)

  const nextImage = () => {
    console.log("nextImage called")
    const currentStoryIndex = getCurrentIndex(data, currentStoryRef);
    const currentPosition = imagePosition.get(currentStoryRef.current) || 0;
    const storyLength =
      data.find((_data) => _data.id === currentStoryRef.current)?.stories
        .length || 0;

    if (
      isLast(currentStoryIndex, data.length) &&
      isLast(currentPosition, storyLength)
    ) {
      return;
    }

    if (!isLast(currentPosition, storyLength)) {
      setImagePosition(
        new Map(imagePosition.set(currentStoryRef.current, currentPosition + 1))
      );
    } else {
      nextStory(currentStoryIndex);
    }
  };

  const prevImage = () => {
    console.log("prevImage called")
    const currentPosition = imagePosition.get(currentStoryRef.current) || 0;
    const currentStoryIndex = getCurrentIndex(data, currentStoryRef);

    if (isFirst(currentStoryIndex) && isFirst(currentPosition)) {
      return;
    }
    if (!isFirst(currentPosition)) {
      setImagePosition(
        new Map(imagePosition.set(currentStoryRef.current, currentPosition - 1))
      );
    } else {
      prevStory(currentStoryIndex);
    }
  };

  const prevStory = (currentStoryIndex: number) => {
    console.log("prevStory called")
    if (currentStoryIndex <= 0) return

    setCurrentStory(data[currentStoryIndex - 1].id - 1);
    rotateYref = hold.current + 90;
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateZ(-${radiusRef.current
        }px) rotateY(${hold.current + 90}deg)`;
    }

    hold.current = hold.current + 90;
  };

  const nextStory = (currentStoryIndex: number) => {
    console.log("nestStry called")

    if (currentStoryIndex >= data.length) return
    setCurrentStory(data[currentStoryIndex + 1].id - 1);
    rotateYref = hold.current - 90;
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateZ(-${radiusRef.current
        }px) rotateY(${hold.current - 90}deg)`;
    }
    hold.current = hold.current - 90;
  };

  const end = () => {
    console.log("end called")
    isDown = false;
    if (carouselRef.current) {
      carouselRef.current.style.transition = "transform 0.25s";
    }

    const currentStoryIndex = getCurrentIndex(data, currentStoryRef);
    if (rotateYref > hold.current && !isFirst(currentStoryIndex)) {
      prevStory(currentStoryIndex);
      return;
    }
    if (rotateYref < hold.current && !isLast(currentStoryIndex, data.length)) {
      nextStory(currentStoryIndex);
      return;
    }
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateZ(-${radiusRef.current}px) rotateY(${hold.current}deg)`;
    }
  };

  useEffect(() => {
    currentStoryRef.current = currentStory;
  }, [currentStory]);

  const start = (e: MouseEvent | TouchEvent) => {
    isDown = true;
    current = "pageX" in e ? e.pageX : e.touches[0].pageX;
  };

  const move = (e: MouseEvent | TouchEvent) => {
    if (!isDown || !carouselRef.current) return;
    e.preventDefault();
    carouselRef.current.style.transition = "none";
    const dist = "pageX" in e ? e.pageX : e.touches[0].pageX;
    const threshHold = Math.abs(dist - current);
    const wrap = 3.6666666;
    if (dist >= current) {
      rotateYref = hold.current + threshHold / wrap;
      carouselRef.current.style.transform = `translateZ(-${radiusRef.current
        }px) rotateY(${hold.current + threshHold / wrap}deg)`;
    } else {
      rotateYref = hold.current - threshHold / wrap;

      carouselRef.current.style.transform = `translateZ(-${radiusRef.current
        }px) rotateY(${hold.current - threshHold / wrap}deg)`;
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateZ(-${radius}px) rotateY(${hold.current}deg)`;
    }
    radiusRef.current = radius;
  }, [radius]);

  useEffect(() => {
    const carousel = document.getElementById("carousel") || ({} as Element);

    if (window.screen.width < 640) {
      setCellSize(window.screen.width);
      setRadius(window.screen.width / 2 / Math.tan(Math.PI / 4));
    }

    if (carousel) {
      carousel.addEventListener("mousedown", start as (e: Event) => void);
      carousel.addEventListener("touchstart", start as (e: Event) => void);

      carousel.addEventListener("mousemove", move as (e: Event) => void);
      carousel.addEventListener("touchmove", move as (e: Event) => void);

      carousel.addEventListener("mouseleave", end);
      carousel.addEventListener("mouseup", end);
      carousel.addEventListener("touchend", end);
    }
  }, []);

  console.log("------------------------------")
  return {
    nextImage,
    nextStory,
    prevImage,
    prevStory,
    imagePosition,
    currentStory,
    carouselRef,
    cellSize,
    radius,
  };
};

function getCurrentIndex(data: TStorySet[], currentStory: React.MutableRefObject<number>) {
  return data.findIndex((_data) => (_data.id - 1) === currentStory.current);
}

export const isLast = (index: number, length: number) => {
  return index === length - 1;
};

export const isFirst = (index: number) => {
  return index === 0;
};
