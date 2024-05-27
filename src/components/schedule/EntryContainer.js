import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export function EntryContainer({ children, onDragEnd }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="schedules-droppable"
        placeholder={<div>placeholder</div>}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={
              snapshot.isDraggingOver
                ? 'schedules-droppable-dragging'
                : 'schedules-droppable-normal'
            }
            {...provided.droppableProps}
          >
            {children}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
