import { Entry } from './Entry';

export function EntryList({ schedules, onDelete, onChangeValue }) {
  return schedules?.map((schedule, index) => (
    <Entry
      key={index}
      index={index}
      onDelete={onDelete}
      onChangeValue={onChangeValue}
      {...schedule}
    />
  ));
}
