import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  SkipForward, 
  CheckCircle, 
  Timer,
  Zap,
  Target
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  restTime: number;
}

const workoutPlan: Exercise[] = [
  { name: "BENCH PRESS", sets: 3, reps: "8-10", weight: "60kg", restTime: 90 },
  { name: "INCLINE DUMBBELL PRESS", sets: 3, reps: "10-12", weight: "25kg", restTime: 75 },
  { name: "PUSH-UPS", sets: 3, reps: "12-15", restTime: 60 },
  { name: "DIPS", sets: 3, reps: "8-12", restTime: 75 },
  { name: "TRICEP PUSHDOWNS", sets: 3, reps: "12-15", weight: "30kg", restTime: 60 }
];

const Workout: React.FC = () => {
  const { addXP, updateQuest } = useUser();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [completedSets, setCompletedSets] = useState<number[]>([]);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [repsCompleted, setRepsCompleted] = useState<string>('');

  const exercise = workoutPlan[currentExercise];
  const progress = ((currentExercise * 3 + currentSet - 1) / (workoutPlan.length * 3)) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTime > 0) {
      interval = setInterval(() => {
        setRestTime(time => {
          if (time <= 1) {
            setIsResting(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTime]);

  const startWorkout = () => {
    setWorkoutStarted(true);
    addXP(50); // Starting workout XP
  };

  const completeSet = () => {
    const setId = currentExercise * 3 + currentSet;
    setCompletedSets(prev => [...prev, setId]);
    addXP(25); // XP per set

    // Update quest progress for push-ups
    if (exercise.name === "PUSH-UPS" && repsCompleted) {
      const reps = parseInt(repsCompleted) || 0;
      updateQuest("Push-ups", reps);
    }

    if (currentSet < exercise.sets) {
      setIsResting(true);
      setRestTime(exercise.restTime);
      setCurrentSet(prev => prev + 1);
    } else {
      nextExercise();
    }
    setRepsCompleted('');
  };

  const nextExercise = () => {
    if (currentExercise < workoutPlan.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setCurrentSet(1);
      addXP(75); // Exercise completion XP
    } else {
      setWorkoutComplete(true);
      addXP(200); // Workout completion bonus
    }
  };

  const skipRest = () => {
    setIsResting(false);
    setRestTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (workoutComplete) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="system-window p-8 max-w-md w-full text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              textShadow: [
                "0 0 8px #00A8FF",
                "0 0 20px #00A8FF",
                "0 0 8px #00A8FF"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="glow-blue text-2xl font-bold mb-4"
          >
            [ WORKOUT COMPLETE ]
          </motion.div>
          <div className="space-y-4 mb-6">
            <p className="glow-red">VICTORY ACHIEVED!</p>
            <p className="text-sm">You have proven your dedication to The System.</p>
            <div className="bg-[#0D1117] p-4 border border-[#30363D] rounded">
              <p className="text-xs text-[#8B949E]">XP EARNED: +500</p>
              <p className="text-xs text-[#8B949E]">STRENGTH INCREASED</p>
            </div>
          </div>
          <Link to="/" className="system-button w-full block text-center py-3">
            [ RETURN TO BASE ]
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!workoutStarted) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="system-window p-8 max-w-lg w-full"
        >
          <div className="glow-blue text-xl font-bold mb-6 text-center">
            [ WORKOUT PREPARATION ]
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="glow-red text-lg font-bold">
              [ TODAY'S MISSION: PUSH DAY ]
            </div>
            <div className="bg-[#0D1117] p-4 border border-[#30363D] rounded">
              <p className="text-sm mb-2">Exercises: {workoutPlan.length}</p>
              <p className="text-sm mb-2">Estimated Time: 45-60 minutes</p>
              <p className="text-sm">Difficulty: Intermediate</p>
            </div>
            <div className="text-sm text-[#8B949E] leading-relaxed">
              "Prepare yourself, Warrior. Today we forge your upper body strength. 
              Each rep brings you closer to your true potential."
            </div>
          </div>

          <div className="space-y-4">
            <motion.button
              onClick={startWorkout}
              className="system-button w-full py-4 text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center gap-3">
                <Play className="w-5 h-5" />
                [ INITIATE TRAINING ]
              </div>
            </motion.button>
            
            <Link to="/" className="block text-center text-[#8B949E] hover:text-[#00A8FF] transition-colors">
              [ RETURN TO STATUS ]
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <Link to="/" className="flex items-center gap-2 text-[#8B949E] hover:text-[#00A8FF] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            [ EXIT TRAINING ]
          </Link>
          <div className="glow-blue text-lg font-bold">
            [ DUNGEON HUD ]
          </div>
          <div className="text-sm">
            EXERCISE {currentExercise + 1} / {workoutPlan.length}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-1 bg-gradient-to-r from-[#00A8FF] to-[#0080CC] mb-8 glow-box-blue"
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Exercise Display */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {isResting ? (
                <motion.div
                  key="rest"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="system-window p-8 text-center"
                >
                  <div className="glow-red text-xl font-bold mb-6">
                    [ REST PERIOD ]
                  </div>
                  
                  <div className="relative mb-8">
                    <div className="text-6xl font-mono glow-blue mb-4">
                      {formatTime(restTime)}
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-[#00A8FF] opacity-30"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-[#8B949E]">
                      Next: SET {currentSet} / {exercise.sets}
                    </p>
                    <motion.button
                      onClick={skipRest}
                      className="system-button px-6 py-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center gap-2">
                        <SkipForward className="w-4 h-4" />
                        [ SKIP REST ]
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="exercise"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="system-window p-8"
                >
                  <div className="text-center mb-8">
                    <div className="glow-blue text-3xl font-bold mb-4">
                      {exercise.name}
                    </div>
                    <div className="text-xl mb-2">
                      SET {currentSet} / {exercise.sets}
                    </div>
                    <div className="glow-red text-lg">
                      TARGET: {exercise.reps} REPS
                      {exercise.weight && (
                        <span className="block text-sm mt-1">
                          WEIGHT: {exercise.weight}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm mb-2">Reps Completed:</label>
                      <input
                        type="number"
                        value={repsCompleted}
                        onChange={(e) => setRepsCompleted(e.target.value)}
                        className="w-full bg-[#0D1117] border border-[#30363D] rounded px-4 py-2 text-center text-lg focus:border-[#00A8FF] focus:outline-none"
                        placeholder="Enter reps"
                      />
                    </div>

                    <motion.button
                      onClick={completeSet}
                      className="system-button w-full py-4 text-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!repsCompleted}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="w-5 h-5" />
                        [ COMPLETE SET ]
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Current Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="system-window p-6"
            >
              <div className="glow-blue text-lg font-bold mb-4">
                [ CURRENT STATS ]
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Sets Completed:</span>
                  <span className="glow-blue font-bold">{completedSets.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>XP This Session:</span>
                  <span className="text-[#00CC66] font-bold">{50 + (completedSets.length * 25)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Progress:</span>
                  <span className="glow-red font-bold">{Math.round(progress)}%</span>
                </div>
              </div>
            </motion.div>

            {/* Workout Plan */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="system-window p-6"
            >
              <div className="glow-blue text-lg font-bold mb-4">
                [ WORKOUT PLAN ]
              </div>
              <div className="space-y-2 text-sm">
                {workoutPlan.map((ex, index) => (
                  <div 
                    key={index}
                    className={`p-2 border border-[#30363D] rounded ${
                      index === currentExercise ? 'glow-box-blue' : 
                      index < currentExercise ? 'bg-[#0D1117] opacity-50' : 'bg-[#161B22]'
                    }`}
                  >
                    <div className={`font-bold ${
                      index === currentExercise ? 'glow-blue' : 
                      index < currentExercise ? 'line-through text-[#8B949E]' : ''
                    }`}>
                      {ex.name}
                    </div>
                    <div className="text-xs text-[#8B949E]">
                      {ex.sets} sets × {ex.reps} reps
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Motivation */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="system-window p-6 glow-box-red"
            >
              <div className="glow-red text-sm font-bold mb-2">
                [ SYSTEM MESSAGE ]
              </div>
              <p className="text-xs text-[#8B949E] leading-relaxed">
                "Pain is temporary. Quitting lasts forever. Push through the resistance - 
                it is where your true strength is forged."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workout;