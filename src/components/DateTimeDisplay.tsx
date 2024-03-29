type Props = {
  value: number;
  type: string;
  isDanger: boolean;
};

const DateTimeDisplay: React.FC<Props> = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p className="time-value">{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
