// import React, { useEffect, useState, useRef } from 'react';

// interface TimerProps {
//   duration: number;
//   onTimeUp: () => void;
// }

// const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
//   const [time, setTime] = useState<number>(0);
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   useEffect(() => {
//     if (duration <= 0) return; // Handle non-positive duration gracefully

//     setTime(0); // Reset timer when duration changes

//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//     }

//     timerRef.current = setInterval(() => {
//       setTime(prevTime => {
//         if (prevTime >= duration) {
//           clearInterval(timerRef.current as ReturnType<typeof setInterval>);
//           onTimeUp();
//           return prevTime;
//         }
//         return prevTime + 1;
//       });
//     }, 1000);

//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, [duration, onTimeUp]);

//   return (
//     <div className="text-center mb-4">
//       <p>Time: {Math.max(0, duration - time)}s</p>
//     </div>
//   );
// };

// export default Timer;


import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  keyProp: string; // Add a key prop to force re-rendering
}


const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, keyProp }) => {
  return (
    <div className="text-center mb-4">
      <CountdownCircleTimer
        key={keyProp} // Ensure the timer resets when the key changes
        isPlaying
        duration={duration}
        colors={['#37ab05', '#f7e201', '#c20202', '#000000']}
        colorsTime={[duration, duration * 0.66, duration * 0.33, 0]}
        size={120}
        strokeWidth={8}
        onComplete={() => {
          onTimeUp();
          return { shouldRepeat: false }; // Stops the timer after completion
        }}
      >
        {({ remainingTime }) => <p className="text-3xl">{remainingTime}</p>}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;


