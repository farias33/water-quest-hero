import { useEffect, useState } from "react";

interface PlantAvatarProps {
  hydrationLevel: number; // 0-100
  level: number;
}

export const PlantAvatar = ({ hydrationLevel, level }: PlantAvatarProps) => {
  const [plantStage, setPlantStage] = useState(1);

  useEffect(() => {
    if (level >= 20) setPlantStage(5);
    else if (level >= 15) setPlantStage(4);
    else if (level >= 10) setPlantStage(3);
    else if (level >= 5) setPlantStage(2);
    else setPlantStage(1);
  }, [level]);

  const getPlantEmoji = () => {
    if (hydrationLevel < 30) return "🌱"; // Seedling (sad)
    if (plantStage === 1) return "🌿"; // Small plant
    if (plantStage === 2) return "🪴"; // Potted plant
    if (plantStage === 3) return "🌳"; // Tree
    if (plantStage === 4) return "🌲"; // Evergreen
    return "🌴"; // Palm tree (max level)
  };

  const getPlantMood = () => {
    if (hydrationLevel < 30) return "Sedenta!";
    if (hydrationLevel < 60) return "Crescendo...";
    if (hydrationLevel < 90) return "Feliz!";
    return "Radiante!";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`text-8xl transition-all duration-500 ${
          hydrationLevel < 30 ? "opacity-50 grayscale" : "animate-float"
        }`}
      >
        {getPlantEmoji()}
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-foreground">{getPlantMood()}</p>
        <p className="text-sm text-muted-foreground">Nível {level}</p>
      </div>
    </div>
  );
};
