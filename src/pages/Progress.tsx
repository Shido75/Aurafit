import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Award, Target, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useUser } from '../contexts/UserContext';

const strengthData = [
  { week: 'W1', bench: 50, squat: 60, deadlift: 80 },
  { week: 'W2', bench: 52, squat: 62, deadlift: 85 },
  { week: 'W3', bench: 55, squat: 65, deadlift: 87 },
  { week: 'W4', bench: 57, squat: 67, deadlift: 90 },
  { week: 'W5', bench: 60, squat: 70, deadlift: 95 },
  { week: 'W6', bench: 62, squat: 72, deadlift: 97 },
];

const weeklyVolume = [
  { week: 'W1', volume: 2500 },
  { week: 'W2', volume: 2800 },
  { week: 'W3', volume: 3200 },
  { week: 'W4', volume: 3100 },
  { week: 'W5', volume: 3600 },
  { week: 'W6', volume: 3800 },
];

const skills = [
  { name: "Bench Press", rank: "E", level: 15, maxLevel: 20, xp: 750, maxXp: 1000 },
  { name: "Squat", rank: "F", level: 12, maxLevel: 20, xp: 480, maxXp: 800 },
  { name: "Deadlift", rank: "D", level: 18, maxLevel: 20, xp: 900, maxXp: 1000 },
  { name: "Pull-ups", rank: "F", level: 8, maxLevel: 20, xp: 320, maxXp: 600 },
  { name: "Push-ups", rank: "C", level: 25, maxLevel: 30, xp: 1250, maxXp: 1500 },
];

const achievements = [
  { name: "First Steps", description: "Complete your first workout", unlocked: true, date: "2024-01-15" },
  { name: "Consistency Master", description: "Workout for 10 consecutive days", unlocked: true, date: "2024-01-25" },
  { name: "Strength Seeker", description: "Increase bench press by 10kg", unlocked: true, date: "2024-02-01" },
  { name: "Iron Will", description: "Complete 50 workouts", unlocked: false, progress: 32 },
  { name: "Beast Mode", description: "Reach Level 20", unlocked: false, progress: 12 },
  { name: "Perfect Form", description: "Complete 100 exercises with perfect form", unlocked: false, progress: 67 },
];

const Progress: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link to="/" className="flex items-center gap-2 text-[#8B949E] hover:text-[#00A8FF] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            [ RETURN TO STATUS ]
          </Link>
          <div className="glow-blue text-2xl font-bold terminal-text">
            [ SKILLS & ATTRIBUTES ]
          </div>
          <div className="text-sm">
            LV. {user.level} {user.name}
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mb-8"
        >
          {['Attributes', 'Skills', 'Achievements', 'Analytics'].map((tab, index) => (
            <button
              key={tab}
              className={`system-button px-6 py-2 ${index === 1 ? 'glow-box-blue' : ''}`}
            >
              [ {tab.toUpperCase()} ]
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Strength Progression Chart */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="system-window p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 glow-blue" />
                <div className="glow-blue text-lg font-bold">
                  [ STRENGTH PROGRESSION ]
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={strengthData}>
                    <XAxis 
                      dataKey="week" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#8B949E', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#8B949E', fontSize: 12 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="bench" 
                      stroke="#00A8FF" 
                      strokeWidth={2}
                      dot={{ fill: '#00A8FF', strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="squat" 
                      stroke="#D70040" 
                      strokeWidth={2}
                      dot={{ fill: '#D70040', strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="deadlift" 
                      stroke="#00CC66" 
                      strokeWidth={2}
                      dot={{ fill: '#00CC66', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#00A8FF] rounded-full"></div>
                  <span>Bench Press</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#D70040] rounded-full"></div>
                  <span>Squat</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#00CC66] rounded-full"></div>
                  <span>Deadlift</span>
                </div>
              </div>
            </motion.div>

            {/* Weekly Volume */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="system-window p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 glow-red" />
                <div className="glow-red text-lg font-bold">
                  [ WEEKLY TRAINING VOLUME ]
                </div>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyVolume}>
                    <XAxis 
                      dataKey="week" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#8B949E', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#8B949E', fontSize: 12 }}
                    />
                    <Bar 
                      dataKey="volume" 
                      fill="#00A8FF"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Skills List */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="system-window p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-5 h-5 glow-blue" />
                <div className="glow-blue text-lg font-bold">
                  [ SKILL MASTERY ]
                </div>
              </div>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-[#0D1117] p-4 border border-[#30363D] rounded"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-white">{skill.name}</div>
                        <div className="text-sm text-[#8B949E]">
                          Rank {skill.rank} | Level {skill.level}/{skill.maxLevel}
                        </div>
                      </div>
                      <div className={`px-2 py-1 text-xs font-bold rounded ${
                        skill.rank === 'C' ? 'bg-[#00CC66] text-black' :
                        skill.rank === 'D' ? 'bg-[#FFB000] text-black' :
                        skill.rank === 'E' ? 'bg-[#00A8FF] text-black' :
                        'bg-[#D70040] text-white'
                      }`}>
                        RANK {skill.rank}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>XP: {skill.xp} / {skill.maxXp}</span>
                        <span>{Math.round((skill.xp / skill.maxXp) * 100)}%</span>
                      </div>
                      <div className="w-full bg-[#30363D] rounded-full h-2">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-[#00A8FF] to-[#0080CC] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(skill.xp / skill.maxXp) * 100}%` }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Current Attributes */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="system-window p-6"
            >
              <div className="glow-blue text-lg font-bold mb-4">
                [ CURRENT ATTRIBUTES ]
              </div>
              <div className="space-y-4">
                {[
                  { name: 'STR', value: user.strength, max: 100, color: '#D70040' },
                  { name: 'END', value: user.endurance, max: 100, color: '#00A8FF' },
                  { name: 'CON', value: user.constitution, max: 100, color: '#00CC66' }
                ].map((attr) => (
                  <div key={attr.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-bold">{attr.name}</span>
                      <span style={{ color: attr.color }}>{attr.value}</span>
                    </div>
                    <div className="w-full bg-[#30363D] rounded-full h-2">
                      <motion.div 
                        className="h-full rounded-full"
                        style={{ backgroundColor: attr.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(attr.value / attr.max) * 100}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="system-window p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-5 h-5 glow-red" />
                <div className="glow-red text-lg font-bold">
                  [ ACHIEVEMENTS ]
                </div>
              </div>
              <div className="space-y-3">
                {achievements.slice(0, 4).map((achievement, index) => (
                  <motion.div 
                    key={achievement.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`p-3 rounded border ${
                      achievement.unlocked 
                        ? 'border-[#00CC66] bg-[#00CC6610]' 
                        : 'border-[#30363D] bg-[#0D1117]'
                    }`}
                  >
                    <div className={`font-bold text-sm ${
                      achievement.unlocked ? 'text-[#00CC66]' : 'text-[#8B949E]'
                    }`}>
                      {achievement.name}
                    </div>
                    <div className="text-xs text-[#8B949E] mb-2">
                      {achievement.description}
                    </div>
                    {achievement.unlocked ? (
                      <div className="text-xs text-[#00CC66]">
                        Unlocked: {achievement.date}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="text-xs text-[#8B949E]">
                          Progress: {achievement.progress}/100
                        </div>
                        <div className="w-full bg-[#30363D] rounded-full h-1">
                          <div 
                            className="h-full bg-[#00A8FF] rounded-full"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Personal Records */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="system-window p-6 glow-box-red"
            >
              <div className="glow-red text-lg font-bold mb-4">
                [ PERSONAL RECORDS ]
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Bench Press:</span>
                  <span className="glow-red font-bold">62.5kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Squat:</span>
                  <span className="glow-red font-bold">72.5kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Deadlift:</span>
                  <span className="glow-red font-bold">97.5kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Pull-ups:</span>
                  <span className="glow-red font-bold">12 reps</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;