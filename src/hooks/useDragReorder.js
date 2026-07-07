import { useState } from 'react';

// Reemplazo nativo (HTML5 drag & drop) del comportamiento de reordenamiento
// que antes ofrecía react-beautiful-dnd: mueve el item en vivo mientras se
// arrastra sobre otros, y confirma el orden final en onDrop.
export function useDragReorder({ items, onChange, onDrop }) {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragStart = (index) => (e) => {
    setDraggingIndex(index);
    setIsDraggingOver(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', '');
  };

  const handleDragEnter = (index) => (e) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === index) {
      return;
    }

    const updated = [...items];
    const [moved] = updated.splice(draggingIndex, 1);
    updated.splice(index, 0, moved);
    onChange(updated);
    setDraggingIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
    setIsDraggingOver(false);
    onDrop?.(items);
  };

  const getItemProps = (index) => ({
    draggable: true,
    onDragStart: handleDragStart(index),
    onDragEnter: handleDragEnter(index),
    onDragOver: handleDragOver,
    onDrop: handleDragOver,
    onDragEnd: handleDragEnd,
    style: {
      opacity: draggingIndex === index ? 0.4 : 1,
      cursor: 'grab',
    },
  });

  return { isDraggingOver, getItemProps };
}
