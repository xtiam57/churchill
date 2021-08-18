const Time = {};

Time.diff = (date1, date2, timestamp = 'days') => {
  const diff = new Date(date2).getTime() - new Date(date1).getTime();

  switch (timestamp) {
    case 'seconds':
      return Math.floor(diff / 1000);
    case 'minutes':
      return Math.floor(diff / (1000 * 60));
    case 'hours':
      return Math.floor(diff / (1000 * 60 * 60));
    case 'days':
      return Math.floor(diff / (1000 * 60 * 60 * 24));
    case 'weeks':
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    case 'months':
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    case 'years':
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    default:
      return diff;
  }
};

Time.formatBirthday = (day, month) => {
  const now = new Date();
  const nowDay = now.getDate();
  const nowMonth = now.getMonth() + 1;
  const d = day.toString().padStart(2, '0');
  const months = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];

  return day === nowDay && month === nowMonth
    ? 'Hoy'
    : `${d}/${months[month - 1]}`;
};

Time.msToTime = (duration) => {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
};

Time.formatTime = (minutes, seconds) => {
  if (seconds > 0) {
    return `${`${minutes}`.padStart(2, '0')}:${`${seconds - 1}`.padStart(
      2,
      '0'
    )}`;
  } else {
    if (minutes === 0) {
      return '00:00';
    } else {
      return `${`${minutes - 1}`.padStart(2, '0')}:59`;
    }
  }
};

export { Time };
