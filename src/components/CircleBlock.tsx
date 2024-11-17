import React, { useEffect, useRef, useState } from "react";
import { calculateButtonPositions } from "../utils/calculateButtonPositions";
import { handleMouseEnter, handleMouseLeave, handleClickAnimation } from "../utils/gsapHandlers";

interface EventData {
  date: string;
  text: string;
}

interface Category {
  name: string;
  data: EventData[];
}

interface CircleBlockProps {
  event: Category[];
  setCurrentData: (currentData: number) => void;
  currentData: number;
  curentPeriod: number;
}

const CircleBlock: React.FC<CircleBlockProps> = ({ event, setCurrentData, currentData, curentPeriod }) => {
  const [currentElement, setCurrentElement] = useState<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const radius = 265;
  const buttons = calculateButtonPositions(event.length, radius);

  useEffect(() => {
    const firstButton = document.querySelector(".small-circle-button") as HTMLDivElement | null;
    if (firstButton) {
      handleClick(firstButton, 0);
    }
  }, []);

  useEffect(() => {
    document.querySelectorAll(".small-circle-button").forEach((button, index) => {
      if (index === 0) return;
      const element = button as HTMLDivElement;
      delete element.dataset.initialLeft;
      delete element.dataset.initialTop;
    });
  }, [curentPeriod]);

  const handleClick = (element: HTMLDivElement, index: number) => {
    if (currentElement) {
      handleMouseLeave(currentElement, index, currentData);
    }
    if (containerRef.current) {
      handleClickAnimation(containerRef.current, () => {
        handleMouseEnter(element);
        setCurrentElement(element);
        setCurrentData(index);
      });
    }
  };

  return (
    <div className="circle-buttons" ref={containerRef}>
      {buttons && buttons.map((button:{ x: number, y: number} , index: number) => (
        <div
          key={index}
          onClick={(e) => handleClick(e.currentTarget, index)}
          className="small-circle-button"
          style={{ left: `${button.x}px`, top: `${button.y}px` }}
          onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(e.currentTarget, index, currentData)}
        >
          <span>{index + 1}</span>
          <div className="circle-button-text">
            <span>{event[index].name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CircleBlock;
