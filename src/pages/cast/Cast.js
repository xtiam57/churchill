import { Corner, Logo, Presenter, Wrapper } from 'components';
import createPersistedState from 'use-persisted-state';
import { BROADCAST } from 'values';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useSettings = createPersistedState(BROADCAST.SETTINGS);
const useAlert = createPersistedState(BROADCAST.ALERT);
const useBroadcastCountdown = createPersistedState(BROADCAST.COUNTDOWN);

export default function CastPage() {
  const [message] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [alert] = useAlert(BROADCAST.INITIAL_ALERT);
  const [countdown] = useBroadcastCountdown(BROADCAST.INITIAL_COUNTDOWN);

  return (
    <>
      {alert ? (
        <div className="cast-marquee">
          <p className="m-0">{alert}</p>
        </div>
      ) : null}

      <Wrapper style={{ gridArea: 'content' }} bare centered {...settings}>
        {message ? (
          <Presenter
            id={message.id}
            text={message.text}
            subtext={message.subtext}
            book={message.book}
            processedText={message.processedText}
            bg={message.bg}
            castScreen
            {...settings}
          />
        ) : settings?.logo === 'CUSTOM' && settings?.customlogo ? (
          <img
            height={`${settings?.logoheight ?? 60}%`}
            src={settings?.customlogo}
            alt="logo"
          />
        ) : (
          <Logo height={`${settings?.logoheight ?? 60}%`} {...settings} />
        )}

        {countdown && (
          <Corner
            id={countdown.id}
            text={countdown.processedText}
            {...settings}
          />
        )}
      </Wrapper>
    </>
  );
}
