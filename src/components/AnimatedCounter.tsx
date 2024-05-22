"use client";
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full">
      <CountUp
        end={amount}
        decimal="."
        prefix="Rs."
        duration={3.0}
        decimals={2}
      />
    </div>
  );
};

export default AnimatedCounter;
