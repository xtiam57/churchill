import { Logo, Presenter, Wrapper } from 'components';
import createPersistedState from 'use-persisted-state';
import { BROADCAST } from 'values';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useSettings = createPersistedState(BROADCAST.SETTINGS);
const useAlert = createPersistedState(BROADCAST.ALERT);

export default function CastPage() {
  const [message] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [alert] = useAlert(BROADCAST.INITIAL_ALERT);

  return (
    <>
      {alert ? (
        <div className="cast-marquee">
          <p className="m-0">{alert}</p>
        </div>
      ) : null}

      <Wrapper bare centered {...settings}>
        {message ? (
          <Presenter
            id={message.id}
            text={message.text}
            subtext={message.subtext}
            bg={message?.bg}
            {...settings}
          />
        ) : (
          <Logo width="70%" height="70%" {...settings} />
        )}
      </Wrapper>
    </>
  );
}
