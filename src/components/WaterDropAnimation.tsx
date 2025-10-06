import { useEffect, useState } from "react";

interface WaterDropAnimationProps {
  trigger: number;
}

export const WaterDropAnimation = ({ trigger }: WaterDropAnimationProps) => {
  const [drops, setDrops] = useState<{ id: number; x: number }[]>([]);

  useEffect(() => {
    if (trigger > 0) {
      const newDrop = {
        id: Date.now(),
        x: Math.random() * 100,
      };
      setDrops((prev) => [...prev, newDrop]);

      setTimeout(() => {
        setDrops((prev) => prev.filter((drop) => drop.id !== newDrop.id));
      }, 1000);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute top-0 animate-wave"
          style={{
            left: `${drop.x}%`,
            animation: "wave 1s ease-out forwards",
          }}
        >
          <div className="w-8 h-8 bg-gradient-primary rounded-full opacity-70 animate-ripple" />
        </div>
      ))}
    </div>
  );
};
