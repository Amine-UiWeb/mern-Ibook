import { useRef, useState } from "react";

export const Draggable = ({rootClass = "", children }) => {

  const elemRef = useRef(null);
  const mouseCoords = useRef({ startX: 0, scrollLeft: 0 });
  
  const [isMouseDown, setIsMouseDown] = useState(false);


  const handleDragStart = (e) => {
    if (!elemRef.current) return

    const slider = elemRef.current.children[0];
    const startX = e.pageX - slider.offsetLeft;
    const scrollLeft = slider.scrollLeft;
    mouseCoords.current = { startX, scrollLeft }

    setIsMouseDown(true)
    document.body.style.cursor = "grabbing"
  }

  const handleDragEnd = () => {
    if (!elemRef.current) return

    setIsMouseDown(false)
    document.body.style.cursor = "default"
  }

  const handleDrag = (e) => {
    if (!isMouseDown || ! elemRef.current) return;
    e.preventDefault();

    const slider = elemRef.current.children[0];
    const x = e.pageX - slider.offsetLeft;
    const walkX = (x - mouseCoords.current.startX) * 1.5;
    slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
  }


  return (
    <div
      ref={elemRef}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDrag} 
      className={rootClass + ""}
    >
      {children}
    </div>
  );
};