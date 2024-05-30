import { Entry } from './Entry';

export function EntryList({
  schedules,
  onDelete,
  onChangeValue,
  onMoveUp,
  onMoveDown,
}) {
  return schedules?.map((schedule, index) => (
    <Entry
      key={index}
      index={index}
      lastIndex={schedules.length - 1}
      onDelete={onDelete}
      onChangeValue={onChangeValue}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      {...schedule}
    />
  ));
}
