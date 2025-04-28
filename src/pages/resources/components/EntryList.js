import { Entry } from './Entry';

export function EntryList({ resources, onDelete, onChangeValue }) {
  return resources?.map((resource, index) => (
    <Entry
      key={index}
      index={index}
      lastIndex={resources.length - 1}
      onDelete={onDelete}
      onChangeValue={onChangeValue}
      {...resource}
    />
  ));
}
