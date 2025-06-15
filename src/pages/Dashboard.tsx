import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Zap, Target, MessageSquare, TrendingUp, Play } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Dashboard: React.FC = () => {
  const { user, dailyQuest, messages } = useUser();
  const unreadMessages = messages.filter(msg => !msg.read).length;

  const xpPercentage = (user.xp / user.maxXp) * 100;

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="glow-blue text-2xl font-bold terminal-text">
            [ AURAFIT SYSTEM ]
          </div>
          <div className="flex gap-4">
            <Link to="/messages" className="relative">
              <MessageSquare className="w-6 h-6 text-[#8B949E] hover:text-[#00A8FF] transition-colors" />
              {unreadMessages > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D70040] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center glow-red">
                  {unreadMessages}
                </span>
              )}
            </Link>
            <Link to="/progress">
              <TrendingUp className="w-6 h-6 text-[#8B949E] hover:text-[#00A8FF] transition-colors" />
            </Link>
          </div>
        </motion.nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Status Window */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="system-window p-8 relative">
              <div className="glow-blue text-xl font-bold mb-6 terminal-text uppercase tracking-wider">
                [ STATUS ]
              </div>

              {/* User Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 glow-blue" />
                    <span className="text-white text-lg">{user.name}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Level: LV. {user.level}</span>
                      <span>{user.xp} / {user.maxXp} XP</span>
                    </div>
                    <div className="w-full bg-[#30363D] rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#00A8FF] to-[#0080CC] glow-box-blue"
                        initial={{ width: 0 }}
                        animate={{ width: `${xpPercentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>Class: [ {user.class} ]</p>
                    <p>Title: [ {user.title} ]</p>
                  </div>
                </div>

                {/* Attributes */}
                <div className="space-y-3">
                  <h3 className="glow-blue terminal-text">[ ATTRIBUTES ]</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'STR', value: user.strength, color: '#D70040' },
                      { name: 'END', value: user.endurance, color: '#00A8FF' },
                      { name: 'CON', value: user.constitution, color: '#00CC66' }
                    ].map((attr) => (
                      <div key={attr.name} className="flex items-center justify-between">
                        <span className="w-8">{attr.name}:</span>
                        <div className="flex-1 mx-3 bg-[#30363D] rounded-full h-2">
                          <motion.div 
                            className="h-full rounded-full"
                            style={{ backgroundColor: attr.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${attr.value}%` }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          />
                        </div>
                        <span className="w-8 text-right font-bold" style={{ color: attr.color }}>
                          {attr.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Daily Quest */}
              <div className="border-t border-[#30363D] pt-6">
                <div className="glow-red text-lg font-bold mb-4 terminal-text uppercase tracking-wider">
                  [ DAILY QUEST: {dailyQuest.name} ]
                </div>
                <div className="space-y-3 mb-6">
                  {dailyQuest.exercises.map((exercise, index) => (
                    <motion.div 
                      key={exercise.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-[#0D1117] border border-[#30363D] rounded"
                    >
                      <span className={exercise.completed ? 'line-through glow-blue' : ''}>
                        {exercise.name}
                      </span>
                      <span className={`font-mono ${exercise.completed ? 'glow-blue' : 'glow-red'}`}>
                        [ {exercise.current} / {exercise.target} ]
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to="/workout" 
                    className="system-button w-full block text-center py-4 text-lg relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Play className="w-5 h-5" />
                      [ BEGIN WORKOUT ]
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-[#00A8FF] opacity-0 group-hover:opacity-10"
                      initial={false}
                      whileHover={{ opacity: 0.1 }}
                    />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Side Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Stats */}
            <div className="system-window p-6">
              <div className="glow-blue text-lg font-bold mb-4 terminal-text">
                [ QUICK STATS ]
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Workouts This Week:</span>
                  <span className="glow-blue font-bold">4</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Streak:</span>
                  <span className="glow-red font-bold">12 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Total XP Earned:</span>
                  <span className="text-[#00CC66] font-bold">15,240</span>
                </div>
              </div>
            </div>

            {/* Recent Achievement */}
            <motion.div 
              className="system-window p-6 glow-box-blue"
              animate={{ 
                boxShadow: [
                  "0 0 12px #00A8FF40",
                  "0 0 20px #00A8FF60", 
                  "0 0 12px #00A8FF40"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 glow-blue" />
                <span className="glow-blue font-bold">ACHIEVEMENT UNLOCKED</span>
              </div>
              <p className="text-sm">
                <span className="glow-red font-bold">"Consistency Master"</span>
                <br />
                Complete workouts for 10 consecutive days
              </p>
            </motion.div>

            {/* System Message */}
            <div className="system-window p-6">
              <div className="glow-red text-sm font-bold mb-2">
                [ SYSTEM ALERT ]
              </div>
              <p className="text-xs text-[#8B949E] leading-relaxed">
                "The path to strength is not measured in days or weeks, but in the consistency of your resolve. 
                Each rep, each set, each drop of sweat brings you closer to your true potential."
              </p>
              <div className="text-right mt-3 text-xs glow-blue">
                - The System
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;