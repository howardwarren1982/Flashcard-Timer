import { useCountdown } from '../hooks/useCountdown';
import { ShowCounter } from './ShowCounter';
import Sound from './Sound';

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
    </div>
  );
};

type Props = {
  targetDate: Number;
};

const CountdownTimer: React.FC<Props> = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return <ShowCounter minutes={minutes} seconds={seconds} />;
  }
};

export default CountdownTimer;
