import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserStats {
  level: number;
  xp: number;
  maxXp: number;
  strength: number;
  endurance: number;
  constitution: number;
  name: string;
  title: string;
  class: string;
}

interface DailyQuest {
  name: string;
  exercises: Array<{
    name: string;
    current: number;
    target: number;
    completed: boolean;
  }>;
  completed: boolean;
}

interface UserContextType {
  user: UserStats;
  dailyQuest: DailyQuest;
  updateUser: (updates: Partial<UserStats>) => void;
  updateQuest: (exerciseName: string, progress: number) => void;
  addXP: (amount: number) => void;
  messages: Array<{
    id: string;
    from: string;
    subject: string;
    content: string;
    read: boolean;
    timestamp: Date;
  }>;
  markMessageRead: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserStats>({
    level: 12,
    xp: 750,
    maxXp: 1000,
    strength: 45,
    endurance: 38,
    constitution: 55,
    name: "WARRIOR",
    title: "Beginner's Strength",
    class: "Unspecialized"
  });

  const [dailyQuest, setDailyQuest] = useState<DailyQuest>({
    name: "PATH TO POWER",
    exercises: [
      { name: "Push-ups", current: 0, target: 100, completed: false },
      { name: "Squats", current: 0, target: 100, completed: false },
      { name: "Burpees", current: 0, target: 50, completed: false }
    ],
    completed: false
  });

  const [messages, setMessages] = useState([
    {
      id: "1",
      from: "The System",
      subject: "WELCOME TO THE SYSTEM",
      content: "You have been selected to participate in the ultimate fitness journey. Your transformation begins now.",
      read: false,
      timestamp: new Date()
    },
    {
      id: "2",
      from: "The System",
      subject: "LEVEL UP ACHIEVED",
      content: "Congratulations! You have reached Level 12. Your dedication has been noted. Continue your ascension.",
      read: false,
      timestamp: new Date(Date.now() - 86400000)
    }
  ]);

  const updateUser = (updates: Partial<UserStats>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const updateQuest = (exerciseName: string, progress: number) => {
    setDailyQuest(prev => {
      const newExercises = prev.exercises.map(exercise => {
        if (exercise.name === exerciseName) {
          const current = Math.min(exercise.target, progress);
          return {
            ...exercise,
            current,
            completed: current >= exercise.target
          };
        }
        return exercise;
      });

      const allCompleted = newExercises.every(ex => ex.completed);
      
      if (allCompleted && !prev.completed) {
        // Quest completed - add XP bonus
        addXP(200);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          from: "The System",
          subject: "DAILY QUEST COMPLETED",
          content: "Excellent work! You have completed today's quest and earned 200 XP bonus. Your power grows.",
          read: false,
          timestamp: new Date()
        }]);
      }

      return {
        ...prev,
        exercises: newExercises,
        completed: allCompleted
      };
    });
  };

  const addXP = (amount: number) => {
    setUser(prev => {
      const newXp = prev.xp + amount;
      const newLevel = prev.level + Math.floor(newXp / prev.maxXp);
      const remainingXp = newXp % prev.maxXp;
      
      if (newLevel > prev.level) {
        // Level up!
        setMessages(prevMessages => [...prevMessages, {
          id: Date.now().toString(),
          from: "The System",
          subject: "LEVEL UP!",
          content: `You have defeated your past self and grown stronger. You have reached LV. ${newLevel}.`,
          read: false,
          timestamp: new Date()
        }]);
      }
      
      return {
        ...prev,
        level: newLevel,
        xp: remainingXp,
        maxXp: 1000 + (newLevel * 100) // Increase XP requirement each level
      };
    });
  };

  const markMessageRead = (id: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  return (
    <UserContext.Provider value={{
      user,
      dailyQuest,
      updateUser,
      updateQuest,
      addXP,
      messages,
      markMessageRead
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};