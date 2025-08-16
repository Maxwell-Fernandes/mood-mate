import {
  Typography,
  Paper,
  Avatar,
  Button,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useState, useEffect } from 'react';

// Simple confetti using emojis and random positioning — no external libs for simplicity
function Confetti() {
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    const pieces = Array.from({ length: 30 }).map(() => ({
      id: Math.random(),
      left: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setConfettiPieces(pieces);
  }, []);

  return (
    <div className="confetti-container" aria-hidden="true">
      {confettiPieces.map(({ id, left, delay }) => (
        <div
          key={id}
          className="confetti-piece"
          style={{ left: `${left}%`, animationDelay: `${delay}s` }}
        >
          🎉
        </div>
      ))}
      <style jsx>{`
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          overflow: visible;
          z-index: 9999;
        }
        .confetti-piece {
          position: absolute;
          top: -2rem;
          font-size: 1.5rem;
          animation: confetti-fall 3s linear forwards;
          user-select: none;
        }
        @keyframes confetti-fall {
          to {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

const assessmentQuestions = [
  {
    question: 'Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Over the last 2 weeks, how often have you had little interest or pleasure in doing things?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Over the last 2 weeks, how often have you not been able to stop or control worrying?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
];

export default function Profile() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(assessmentQuestions.length).fill(''));
  const [completed, setCompleted] = useState(false);

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/100?u=johndoe',
  };

  const handleOptionSelect = (option) => {
    const updated = [...answers];
    updated[step] = option;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (step < assessmentQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleRetake = () => {
    setAnswers(Array(assessmentQuestions.length).fill(''));
    setStep(0);
    setCompleted(false);
  };

  return (
    <div className="min-h-screen bg-[#F6F8F9] px-8 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <Typography variant="h4" className="font-bold text-[#22223B] mb-1">
            Hello, {user.name}
          </Typography>
          <Typography variant="body1" className="text-gray-500">
            Here's your personal profile and current check-in.
          </Typography>
        </div>
        <Avatar src={user.avatar} sx={{ width: 72, height: 72 }} />
      </div>

      {/* Mental Health Assessment */}
      <Paper elevation={2} className="p-6 rounded-xl shadow-sm bg-white max-w-3xl mx-auto relative">
        {!completed ? (
          <>
            <Typography variant="h6" className="mb-4 text-[#22223B] font-semibold">
              Quick Mental Health Check-In
            </Typography>

            <Stepper activeStep={step} alternativeLabel className="mb-6">
              {assessmentQuestions.map((_, idx) => (
                <Step key={idx}>
                  <StepLabel />
                </Step>
              ))}
            </Stepper>

            <Typography variant="subtitle1" className="mb-4 text-[#22223B] font-medium">
              {assessmentQuestions[step].question}
            </Typography>

            <div className="flex flex-col gap-3">
              {assessmentQuestions[step].options.map((option) => (
                <Button
                  key={option}
                  variant={answers[step] === option ? 'contained' : 'outlined'}
                  onClick={() => handleOptionSelect(option)}
                  sx={{
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    bgcolor: answers[step] === option ? '#5A9CA4' : undefined,
                    color: answers[step] === option ? 'white' : '#22223B',
                    borderColor: '#D3D3D3',
                    '&:hover': {
                      bgcolor: '#5A9CA4',
                      color: 'white',
                    },
                  }}
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button
                onClick={handleBack}
                disabled={step === 0}
                variant="outlined"
                sx={{ textTransform: 'none' }}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[step]}
                variant="contained"
                sx={{ textTransform: 'none', bgcolor: '#5A9CA4', '&:hover': { bgcolor: '#4A8B94' } }}
              >
                {step === assessmentQuestions.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </>
        ) : (
          <>
            <Confetti />
            <div
              className="text-center p-10 animate-fadeIn"
              style={{ color: '#5A9CA4' }}
            >
              <Typography variant="h4" gutterBottom>
                ✅ Thank you for completing the check-in!
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
                Your responses have been recorded. We recommend checking in regularly to keep track of your mental health.
              </Typography>

              <Typography variant="h6" gutterBottom>
                Your answers summary:
              </Typography>
              <ul style={{ textAlign: 'left', maxWidth: 400, margin: '0 auto', marginBottom: 20 }}>
                {assessmentQuestions.map(({ question }, idx) => (
                  <li key={idx} style={{ marginBottom: 8 }}>
                    <strong>Q{idx + 1}:</strong> {question} <br />
                    <em>Your answer:</em> {answers[idx]}
                  </li>
                ))}
              </ul>

              <Button
                variant="outlined"
                onClick={handleRetake}
                sx={{ textTransform: 'none', borderColor: '#5A9CA4', color: '#5A9CA4', '&:hover': { bgcolor: '#5A9CA4', color: 'white' } }}
              >
                Retake Assessment
              </Button>
            </div>
          </>
        )}
      </Paper>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
