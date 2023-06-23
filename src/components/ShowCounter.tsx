import DateTimeDisplay from './DateTimeDisplay';

type Props = {
  minutes: number;
  seconds: number;
};

export const ShowCounter: React.FC<Props> = ({ minutes, seconds }) => {
  return (
    <div className="counter-section">
      <div className="show-counter text-8xl flex">
        <DateTimeDisplay value={minutes} type={''} isDanger={false} />
        :<DateTimeDisplay value={seconds} type={''} isDanger={false} />
      </div>
    </div>
  );
};
