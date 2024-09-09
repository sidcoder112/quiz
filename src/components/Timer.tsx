
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  keyProp: string; 
}


const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, keyProp }) => {
  return (
    <div className="text-center mt-6 mb-4">
      <CountdownCircleTimer
        key={keyProp} //timer res key change
        isPlaying
        duration={duration}
        colors={['#37ab05', '#f7e201', '#c20202', '#000000']}
        colorsTime={[duration, duration * 0.66, duration * 0.33, 0]}
        size={120}
        strokeWidth={8}
        onComplete={() => {
          onTimeUp();
          return { shouldRepeat: false }; // timer stop when over
        }}
      >
        {({ remainingTime }) => <p className="text-3xl">{remainingTime}</p>}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;


