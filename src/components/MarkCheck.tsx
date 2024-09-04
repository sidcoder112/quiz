import React from 'react';

interface CheckmarkProps {
  mark: number;
  totalQuestions: number;
}

const Checkmark: React.FC<CheckmarkProps> = ({ mark, totalQuestions }) => {
  const percentage = (mark / totalQuestions) * 100;


  const scoreRanges = [
    { min: 100, message: "Perfect Score! You're an absolute genius!", gifUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdml4c3AzNDRncjBjajZsdjliZng5cWw3bWV2Z2MxajFvdm13Z3VmdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dg/RtFGrL8Fn2xutS0qmN/giphy-downsized-large.gif' },
    { min: 90, message: "Amazing! Almost perfect!", gifUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWF4aDByZWVkMnYzNTUyM2w0ZXRrbTZkOHl3OXkwcm1vNW56MHprdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6gE6VcDIuwebfUje/giphy.gif' },
    { min: 80, message: "Great job! You’re really good!", gifUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGQ0b2RsdXczbHBsZnd3dDhoM2g5Mmdja2Q4NXk4czc0MHYxajFxNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L0JFrYRtbH52eUPkSK/giphy.gif' },
    { min: 70, message: "Good effort! You did well!", gifUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmtiN3RxaDhnYTFzMmI0emY1cGRwZWEwNHhnZmY2MjJsMGp2aWs2NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lgRNj0m1oORfW/giphy.gif' },
    { min: 60, message: "Not bad! You're on the right track!", gifUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2JrN3VxdnBneDZsOWk5NGI0anFxbjd2bWpwd2xjNmxseGtoM2ZqNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1URYTNvDM2LJoMIdxE/giphy.gif' },
    { min: 50, message: "Keep going! You're almost there!", gifUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXN6bjlmNWdqYTdldXkxbmRqMjZ3Y2JkM3NtM3Y4cWNwcGRjdHRudCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XcAa52ejGuNqdb5SFQ/giphy-downsized-large.gif' },
    { min: 40, message: "You can do better! Keep practicing!", gifUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDZvb3lkaWV0bzVncWNsaWZ2cHJnYnVjZ2xsZnNyMjB1aTM4czJyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohjUYUN6b4uybkzpm/giphy.gif' },
    { min: 30, message: "Don't give up! Practice makes perfect!", gifUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3c2eWxocWdnenAweXhsMDBzZHg2M3R3eTZrMWZxM3l6MnM0dmhwYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ICeaRr3cDaF4EeDXj6/giphy.gif' },
    { min: 0, message: "It’s okay! Keep practicing and you’ll get there!", gifUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGt5dGZ6ejltMHc3emU1dTZtY3o5aWNiNnEzZTJ1NDlva2d0MWJsMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3BwSPbqx3QGKEgpp2/giphy.gif' },
  ];

  // find first match > = min
  const { message, gifUrl } = scoreRanges.find(range => percentage >= range.min) || scoreRanges[scoreRanges.length - 1];

  return (
    <div className="text-center mt-6">
      <p className="text-2xl font-semibold">{message}</p>
      <img
        src={gifUrl}
        alt="Result GIF"
        className="mx-auto mt-4 w-64 h-64 object-cover rounded-lg"
      />
    </div>
  );
};

export default Checkmark;
