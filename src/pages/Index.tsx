import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlantAvatar } from "@/components/PlantAvatar";
import { WaterIntakeButtons } from "@/components/WaterIntakeButtons";
import { ProgressBar } from "@/components/ProgressBar";
import { XPBar } from "@/components/XPBar";
import { StatsCard } from "@/components/StatsCard";
import { AchievementBadge } from "@/components/AchievementBadge";
import { WaterDropAnimation } from "@/components/WaterDropAnimation";
import { Settings, Award, TrendingUp, Calendar, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [dailyGoal, setDailyGoal] = useState(2000); // ml
  const [currentIntake, setCurrentIntake] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [dropTrigger, setDropTrigger] = useState(0);
  const [achievements, setAchievements] = useState({
    firstDrop: false,
    perfectDay: false,
    weekStreak: false,
    level10: false,
  });

  const xpForNextLevel = level * 100;

  const handleAddWater = (amount: number) => {
    const newIntake = Math.min(currentIntake + amount, dailyGoal * 1.5);
    setCurrentIntake(newIntake);
    setDropTrigger((prev) => prev + 1);

    // Add XP (10 XP per 100ml)
    const xpGained = Math.floor(amount / 100) * 10;
    const newXP = xp + xpGained;

    if (newXP >= xpForNextLevel) {
      const remainingXP = newXP - xpForNextLevel;
      setLevel((prev) => prev + 1);
      setXP(remainingXP);
      toast({
        title: "🎉 Subiu de nível!",
        description: `Você alcançou o nível ${level + 1}!`,
      });
    } else {
      setXP(newXP);
    }

    // Check achievements
    if (!achievements.firstDrop && newIntake > 0) {
      setAchievements((prev) => ({ ...prev, firstDrop: true }));
      toast({
        title: "🏆 Conquista Desbloqueada!",
        description: "Primeiro Gole - Você registrou seu primeiro copo de água!",
      });
    }

    if (!achievements.perfectDay && newIntake >= dailyGoal) {
      setAchievements((prev) => ({ ...prev, perfectDay: true }));
      toast({
        title: "🏆 Conquista Desbloqueada!",
        description: "Hidratação Perfeita - Você atingiu sua meta diária!",
      });
    }

    toast({
      title: "Água registrada! 💧",
      description: `+${amount}ml adicionados. +${xpGained} XP ganhos!`,
    });
  };

  const hydrationPercentage = (currentIntake / dailyGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-water pb-20">
      <WaterDropAnimation trigger={dropTrigger} />

      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b border-border shadow-card">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AquaHero
            </h1>
            <p className="text-sm text-muted-foreground">
              Mantenha-se hidratado!
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="relative">
              <Award className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* XP Bar */}
        <XPBar currentXP={xp} xpForNextLevel={xpForNextLevel} level={level} />

        {/* Plant Avatar */}
        <Card className="p-6 bg-gradient-water border-primary/20 shadow-water">
          <PlantAvatar
            hydrationLevel={hydrationPercentage}
            level={level}
          />
        </Card>

        {/* Progress Bar */}
        <Card className="p-6 shadow-card border-border">
          <ProgressBar
            current={currentIntake}
            target={dailyGoal}
            label="Meta Diária"
          />
        </Card>

        {/* Water Intake Buttons */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-foreground">
            Adicionar Água
          </h2>
          <WaterIntakeButtons onAddWater={handleAddWater} />
        </div>

        {/* Stats */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-foreground">
            Estatísticas
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <StatsCard
              title="Sequência"
              value={`${streak} dias`}
              icon={<Calendar className="w-6 h-6" />}
              subtitle="Continue assim!"
            />
            <StatsCard
              title="Total de Dias"
              value={totalDays}
              icon={<TrendingUp className="w-6 h-6" />}
              subtitle="De hidratação"
            />
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-foreground">
            Conquistas
          </h2>
          <div className="space-y-3">
            <AchievementBadge
              title="Primeiro Gole"
              description="Registre seu primeiro copo de água"
              unlocked={achievements.firstDrop}
              icon="💧"
            />
            <AchievementBadge
              title="Hidratação Perfeita"
              description="Atinja sua meta diária"
              unlocked={achievements.perfectDay}
              icon="✨"
            />
            <AchievementBadge
              title="Maratonista da Água"
              description="Atinja a meta por 7 dias consecutivos"
              unlocked={achievements.weekStreak}
              icon="🏃"
            />
            <AchievementBadge
              title="Mestre da Hidratação"
              description="Alcance o nível 10"
              unlocked={achievements.level10}
              icon="👑"
            />
          </div>
        </div>

        {/* Premium CTA */}
        <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-water">
          <div className="flex items-start gap-4">
            <Crown className="w-8 h-8 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">
                Desbloqueie o Premium
              </h3>
              <p className="text-sm text-primary-foreground/90 mb-4">
                Acesse relatórios avançados, sons exclusivos, personalização premium e muito mais!
              </p>
              <Button
                variant="secondary"
                className="w-full bg-white text-primary hover:bg-white/90"
              >
                Experimente 7 dias grátis
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
