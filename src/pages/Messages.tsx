import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Messages: React.FC = () => {
  const { messages, markMessageRead } = useUser();

  const handleMessageClick = (id: string) => {
    markMessageRead(id);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
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
            [ SYSTEM MESSAGES ]
          </div>
          <div className="text-sm">
            {messages.filter(msg => !msg.read).length} UNREAD
          </div>
        </motion.div>

        {/* Messages List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="system-window p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-5 h-5 glow-blue" />
            <div className="glow-blue text-lg font-bold">
              [ INBOX ]
            </div>
          </div>

          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleMessageClick(message.id)}
                className={`p-4 border rounded cursor-pointer transition-all duration-300 ${
                  !message.read 
                    ? 'border-[#00A8FF] bg-[#00A8FF05] glow-box-blue' 
                    : 'border-[#30363D] bg-[#0D1117] hover:border-[#00A8FF40]'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      !message.read ? 'bg-[#00A8FF] glow-blue' : 'bg-[#30363D]'
                    }`} />
                    <div>
                      <div className={`font-bold ${!message.read ? 'glow-blue' : 'text-white'}`}>
                        {message.from}
                      </div>
                      <div className="text-xs text-[#8B949E]">
                        {formatDate(message.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {message.read ? (
                      <CheckCircle className="w-4 h-4 text-[#00CC66]" />
                    ) : (
                      <Clock className="w-4 h-4 text-[#00A8FF]" />
                    )}
                  </div>
                </div>

                <div className={`mb-2 font-bold terminal-text ${
                  !message.read ? 'glow-red' : 'text-[#D70040]'
                }`}>
                  {message.subject}
                </div>

                <div className="text-sm text-[#8B949E] leading-relaxed">
                  {message.content}
                </div>

                {/* Message Type Styling */}
                {message.subject.includes('LEVEL UP') && (
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        "0 0 0px #00A8FF",
                        "0 0 20px #00A8FF40",
                        "0 0 0px #00A8FF"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-3 p-2 bg-[#00A8FF10] border border-[#00A8FF40] rounded text-center"
                  >
                    <div className="glow-blue text-xs font-bold">
                      + LEVEL UP BONUS +
                    </div>
                  </motion.div>
                )}

                {message.subject.includes('QUEST COMPLETED') && (
                  <div className="mt-3 p-2 bg-[#00CC6610] border border-[#00CC6640] rounded text-center">
                    <div className="text-[#00CC66] text-xs font-bold">
                      + XP BONUS EARNED +
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <MessageSquare className="w-12 h-12 text-[#30363D] mx-auto mb-4" />
                <div className="text-[#8B949E]">
                  No messages from The System yet.
                </div>
                <div className="text-sm text-[#8B949E] mt-2">
                  Complete workouts and achieve milestones to receive updates.
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Message Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <div className="system-window p-6 text-center">
            <div className="glow-blue text-2xl font-bold mb-2">
              {messages.length}
            </div>
            <div className="text-sm text-[#8B949E]">
              Total Messages
            </div>
          </div>

          <div className="system-window p-6 text-center">
            <div className="glow-red text-2xl font-bold mb-2">
              {messages.filter(msg => msg.subject.includes('LEVEL UP')).length}
            </div>
            <div className="text-sm text-[#8B949E]">
              Level Up Notifications
            </div>
          </div>

          <div className="system-window p-6 text-center">
            <div className="text-[#00CC66] text-2xl font-bold mb-2">
              {messages.filter(msg => msg.subject.includes('QUEST')).length}
            </div>
            <div className="text-sm text-[#8B949E]">
              Quest Completions
            </div>
          </div>
        </motion.div>

        {/* System Alert */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 system-window p-6 glow-box-red"
        >
          <div className="glow-red text-sm font-bold mb-2">
            [ SYSTEM ALERT ]
          </div>
          <p className="text-xs text-[#8B949E] leading-relaxed">
            "The System observes all. Every rep, every set, every moment of determination 
            is recorded and rewarded. Stay consistent, and greater power awaits."
          </p>
          <div className="text-right mt-3 text-xs glow-blue">
            - The System
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Messages;