import React from 'react';

import { List } from 'components/list';
import { useBirthday } from 'hooks';
import { Time } from 'utils';

export function RecentBirthdays({ onClick = () => {}, ...rest }) {
  const { recent, bDaySong } = useBirthday();

  return (
    <>
      {recent.length ? (
        <List {...rest}>
          <List.Item>
            <List.Title
              className="text-warning"
              title={recent.reduce(
                (res, { name, day, month }) =>
                  `${res}${name} (${Time.formatBirthday(day, month)})\n`,
                ''
              )}
            >
              Cumpleaños detectados ({recent.length})
            </List.Title>
          </List.Item>

          <List.Item>
            <List.Action
              onClick={() => onClick([bDaySong])}
              title={bDaySong?.text.replaceAll('/n', '\n')}
            >
              {bDaySong.title}
            </List.Action>
          </List.Item>
        </List>
      ) : null}
    </>
  );
}
