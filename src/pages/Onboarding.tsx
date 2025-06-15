import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Mic } from 'lucide-react';

interface OnboardingData {
  name: string;
  goals: string[];
  experience: string;
  workoutDays: number;
  equipment: string[];
  age: string;
  gender: string;
  height: string;
  weight: string;
}

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    goals: [],
    experience: '',
    workoutDays: 3,
    equipment: [],
    age: '',
    gender: '',
    height: '',
    weight: ''
  });

  const steps = [
    {
      title: "SYSTEM INITIALIZATION",
      subtitle: "Welcome to The System",
      question: "What shall The System call you, Warrior?",
      type: "text",
      field: "name",
      placeholder: "Enter your name"
    },
    {
      title: "MISSION PARAMETERS",
      subtitle: "Define Your Path",
      question: "What is your primary objective?",
      type: "multiselect",
      field: "goals",
      options: [
        { value: "muscle", label: "Build Muscle Mass" },
        { value: "strength", label: "Increase Strength" },
        { value: "endurance", label: "Improve Endurance" },
        { value: "weight_loss", label: "Lose Weight" },
        { value: "general", label: "General Fitness" }
      ]
    },
    {
      title: "POWER ASSESSMENT",
      subtitle: "Current Capabilities",
      question: "How would you rate your current power level?",
      type: "select",
      field: "experience",
      options: [
        { value: "beginner", label: "Novice - New to training" },
        { value: "intermediate", label: "Warrior - Some experience" },
        { value: "advanced", label: "Elite - Seasoned veteran" }
      ]
    },
    {
      title: "TRAINING FREQUENCY",
      subtitle: "Commitment Level",
      question: "How many days per week can you dedicate to training?",
      type: "number",
      field: "workoutDays",
      min: 1,
      max: 7
    },
    {
      title: "EQUIPMENT ACCESS",
      subtitle: "Available Arsenal",
      question: "What equipment do you have access to?",
      type: "multiselect",
      field: "equipment",
      options: [
        { value: "gym", label: "Full Gym Access" },
        { value: "dumbbells", label: "Dumbbells" },
        { value: "barbell", label: "Barbell & Plates" },
        { value: "bodyweight", label: "Bodyweight Only" },
        { value: "resistance_bands", label: "Resistance Bands" },
        { value: "home_gym", label: "Home Gym Setup" }
      ]
    },
    {
      title: "BIOMETRIC DATA",
      subtitle: "Physical Parameters",
      question: "The System requires your physical data for optimal planning.",
      type: "form",
      fields: [
        { name: "age", label: "Age", type: "number", placeholder: "25" },
        { name: "gender", label: "Gender", type: "select", options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" }
        ]},
        { name: "height", label: "Height (cm)", type: "number", placeholder: "175" },
        { name: "weight", label: "Weight (kg)", type: "number", placeholder: "70" }
      ]
    }
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      navigate('/');
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [field]: prev[field as keyof OnboardingData].includes(value)
        ? (prev[field as keyof OnboardingData] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof OnboardingData] as string[]), value]
    }));
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here you would integrate with Web Speech API or voice recognition
  };

  const canProceed = () => {
    switch (currentStep.type) {
      case 'text':
        return data[currentStep.field as keyof OnboardingData] !== '';
      case 'select':
        return data[currentStep.field as keyof OnboardingData] !== '';
      case 'multiselect':
        return (data[currentStep.field as keyof OnboardingData] as string[]).length > 0;
      case 'number':
        return data[currentStep.field as keyof OnboardingData] > 0;
      case 'form':
        return data.age !== '' && data.gender !== '' && data.height !== '' && data.weight !== '';
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          className="h-1 bg-gradient-to-r from-[#00A8FF] to-[#0080CC] mb-8 glow-box-blue"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="system-window p-8"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="glow-blue text-xl font-bold mb-2 terminal-text">
                [ {currentStep.title} ]
              </div>
              <div className="text-[#8B949E] text-sm">
                {currentStep.subtitle}
              </div>
            </div>

            {/* Question */}
            <div className="glow-red text-lg font-bold mb-6 text-center">
              {currentStep.question}
            </div>

            {/* Input Fields */}
            <div className="space-y-6 mb-8">
              {currentStep.type === 'text' && (
                <div className="relative">
                  <input
                    type="text"
                    value={data[currentStep.field as keyof OnboardingData] as string}
                    onChange={(e) => handleInputChange(currentStep.field, e.target.value)}
                    placeholder={currentStep.placeholder}
                    className="w-full bg-[#0D1117] border border-[#30363D] rounded px-4 py-3 text-center text-lg focus:border-[#00A8FF] focus:outline-none glow-box-blue"
                  />
                  <button
                    onClick={toggleListening}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded ${
                      isListening ? 'text-[#D70040] glow-red' : 'text-[#8B949E] hover:text-[#00A8FF]'
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
              )}

              {currentStep.type === 'select' && (
                <div className="space-y-3">
                  {currentStep.options?.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleInputChange(currentStep.field, option.value)}
                      className={`w-full p-4 border rounded text-left transition-all ${
                        data[currentStep.field as keyof OnboardingData] === option.value
                          ? 'border-[#00A8FF] bg-[#00A8FF10] glow-box-blue'
                          : 'border-[#30363D] bg-[#161B22] hover:border-[#00A8FF40]'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-bold">{option.label.split(' - ')[0]}</div>
                      {option.label.includes(' - ') && (
                        <div className="text-sm text-[#8B949E] mt-1">
                          {option.label.split(' - ')[1]}
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {currentStep.type === 'multiselect' && (
                <div className="grid md:grid-cols-2 gap-3">
                  {currentStep.options?.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleMultiSelect(currentStep.field, option.value)}
                      className={`p-4 border rounded text-left transition-all ${
                        (data[currentStep.field as keyof OnboardingData] as string[]).includes(option.value)
                          ? 'border-[#00A8FF] bg-[#00A8FF10] glow-box-blue'
                          : 'border-[#30363D] bg-[#161B22] hover:border-[#00A8FF40]'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              )}

              {currentStep.type === 'number' && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleInputChange(currentStep.field, Math.max(1, data[currentStep.field as keyof OnboardingData] as number - 1))}
                    className="system-button px-4 py-2"
                  >
                    -
                  </button>
                  <div className="glow-blue text-4xl font-bold w-16 text-center">
                    {data[currentStep.field as keyof OnboardingData]}
                  </div>
                  <button
                    onClick={() => handleInputChange(currentStep.field, Math.min(7, data[currentStep.field as keyof OnboardingData] as number + 1))}
                    className="system-button px-4 py-2"
                  >
                    +
                  </button>
                </div>
              )}

              {currentStep.type === 'form' && (
                <div className="grid md:grid-cols-2 gap-4">
                  {currentStep.fields?.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm mb-2">{field.label}:</label>
                      {field.type === 'select' ? (
                        <select
                          value={data[field.name as keyof OnboardingData] as string}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="w-full bg-[#0D1117] border border-[#30363D] rounded px-3 py-2 focus:border-[#00A8FF] focus:outline-none"
                        >
                          <option value="">Select...</option>
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={data[field.name as keyof OnboardingData] as string}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full bg-[#0D1117] border border-[#30363D] rounded px-3 py-2 focus:border-[#00A8FF] focus:outline-none"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={step === 0}
                className={`flex items-center gap-2 px-6 py-3 ${
                  step === 0 
                    ? 'text-[#30363D] cursor-not-allowed' 
                    : 'text-[#8B949E] hover:text-[#00A8FF]'
                } transition-colors`}
              >
                <ChevronLeft className="w-5 h-5" />
                [ PREVIOUS ]
              </button>

              <div className="text-sm text-[#8B949E]">
                {step + 1} / {steps.length}
              </div>

              <motion.button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-3 ${
                  canProceed() 
                    ? 'system-button' 
                    : 'text-[#30363D] border border-[#30363D] cursor-not-allowed'
                }`}
                whileHover={canProceed() ? { scale: 1.05 } : {}}
                whileTap={canProceed() ? { scale: 0.95 } : {}}
              >
                [ {step === steps.length - 1 ? 'COMPLETE' : 'NEXT'} ]
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Voice Indicator */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 system-window p-4 glow-box-red"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-3 h-3 bg-[#D70040] rounded-full glow-red"
                />
                <span className="text-sm">The System is listening...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;