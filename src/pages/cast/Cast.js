import { Corner, Logo, Presenter, Wrapper } from 'components';
import { useCallback } from 'react';
import createPersistedState from 'use-persisted-state';
import { BROADCAST } from 'values';

const useBroadcast = createPersistedState(BROADCAST.CHANNEL);
const useSettings = createPersistedState(BROADCAST.SETTINGS);
const useAlert = createPersistedState(BROADCAST.ALERT);
const useBroadcastCountdown = createPersistedState(BROADCAST.COUNTDOWN);
const useBroadcastIsFullCountdown = createPersistedState(
  BROADCAST.FULL_COUNTDOWN
);

export default function CastPage() {
  const [message] = useBroadcast(BROADCAST.INITIAL_CHANNEL);
  const [settings] = useSettings(BROADCAST.INITIAL_SETTINGS);
  const [alert] = useAlert(BROADCAST.INITIAL_ALERT);
  const [countdown] = useBroadcastCountdown(BROADCAST.INITIAL_COUNTDOWN);
  const [isFullCountdown] = useBroadcastIsFullCountdown(false);

  const renderLogo = useCallback(() => {
    if (countdown && isFullCountdown) {
      return (
        <Presenter
          id={countdown.id}
          processedText={countdown.processedText}
          castScreen
          {...settings}
        />
      );
    }

    return settings?.logo === 'CUSTOM' && settings?.customlogo ? (
      <img
        height={`${settings?.logoheight ?? 60}%`}
        src={settings?.customlogo}
        alt="logo"
      />
    ) : (
      <Logo height={`${settings?.logoheight ?? 60}%`} {...settings} />
    );
  }, [countdown, isFullCountdown, settings]);

  const renderCountdown = useCallback(() => {
    if (countdown && (!isFullCountdown || message)) {
      return (
        <Corner
          id={countdown.id}
          text={countdown.processedText}
          {...settings}
        />
      );
    }

    return null;
  }, [countdown, isFullCountdown, message, settings]);

  return (
    <>
      {alert && (
        <div className="cast-marquee">
          <p className="m-0">{alert}</p>
        </div>
      )}

      <Wrapper style={{ gridArea: 'content' }} bare centered {...settings}>
        {message ? (
          <Presenter
            id={message.id}
            subtext={message.subtext}
            book={message.book}
            processedText={message.processedText}
            bg={message.bg}
            castScreen
            {...settings}
          />
        ) : (
          renderLogo()
        )}

        {renderCountdown()}
      </Wrapper>
    </>
  );
}
