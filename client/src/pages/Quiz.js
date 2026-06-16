import { useState, useEffect, useContext, use } from "react";
import { questions } from "../data/questions";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

function Quiz() {
  const { user, setUser } = useContext(UserContext);
  const { category } = useParams();

  console.log("Category", category);

  const [stage, setStage] = useState("rules");
  const [countdown, setCountdown] = useState(3);

  const [result, setResult] = useState(null);
  const [rewardMsg, setRewardMsg] = useState("");

  const [difficulty, setDifficulty] = useState("easy");
  const [round, setRound] = useState(1);

  const [questionSet, setQuestionSet] = useState([]);
  const [current, setCurrent] = useState(0);

  const [score, setScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  const [time, setTime] = useState(10);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const q = questionSet[current];

  // 🔥 LOAD QUESTIONS (FIXED RESET)
  const loadQuestions = () => {
    if (!category || !questions[category]) {
      console.error("Invalid category:", category);
      setQuestionSet([]);
      return;
    }

    const pool = questions[category][difficulty] || [];

    if (!pool || pool.length === 0) {
      console.error("❌ No questions for:", category, difficulty);
      setQuestionSet([]);
      return;
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random());

    setQuestionSet(shuffled.slice(0, 5));
    setCurrent(0);
    setScore(0);
    setCpuScore(0);
    setTime(10);
    setSelected(null);
    setShowAnswer(false);
  };

  const addCredits = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/add-credits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id, // ✅ IMPORTANT FIX
          credits: 5,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser({
          ...user,
          credits: data.credits,
        });
      }
    } catch (err) {
      console.error("Credit error:", err);
    }
  };

  useEffect(() => {
    if (stage === "quiz") {
      loadQuestions();
    }
  }, [stage, difficulty, round]);

  // ⏳ COUNTDOWN
  useEffect(() => {
    if (stage !== "countdown") return;

    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c === 1) {
          setStage("quiz");
          return 3;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [stage]);

  // ⏱️ TIMER (FIXED)
  useEffect(() => {
    if (stage !== "quiz" || showAnswer || !q) return;

    const timer = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          handleAnswer(null);
          return 10;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [stage, current, showAnswer, q]);

  // 🎯 ANSWER HANDLER (FIXED)
  const handleAnswer = async (option) => {
    if (showAnswer) return;

    setSelected(option);
    setShowAnswer(true);

    let newScore = score;
    let newCpuScore = cpuScore;

    if (option === q.answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    const cpuChance =
      difficulty === "easy" ? 0.2 : difficulty === "medium" ? 0.5 : 0.8;

    if (Math.random() < cpuChance) {
      newCpuScore = cpuScore + 1;
      setCpuScore(newCpuScore);
    }

    setTimeout(async () => {
      if (current + 1 < questionSet.length) {
        setCurrent((prev) => prev + 1);
        setTime(10);
        setSelected(null);
        setShowAnswer(false);
      } else {
        // 👉 FINAL RESULT
        if (newScore > newCpuScore) {
          setResult("win");

          // 🔥 ADD CREDITS
          try {
            const res = await fetch("http://localhost:5000/api/add-credits", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user.id,
                credits: 5,
              }),
            });

            const data = await res.json();

            if (res.ok) {
              setUser({
                ...user,
                credits: data.credits,
              });

              setRewardMsg("🎉 You won! +5 credits added");
            }
          } catch (err) {
            console.error(err);
          }
        } else {
          setResult("lose");
          setRewardMsg("😢 You lost this round");
        }

        setStage("result");
      }
    }, 1000);
  };
  // ================= RULES =================
  if (stage === "rules") {
    return (
      <div style={pageBg}>
        <div style={container}>
          <div style={centerBox}>
            <h2>📜 Quiz Rules</h2>

            <ul style={rulesList}>
              <li>⏱️ 10 sec per question</li>
              <li>🎯 Correct = 1 point</li>
              <li>🤖 CPU competes with you</li>
              <li>💰 Win = credits</li>
            </ul>

            <button style={primaryBtn} onClick={() => setStage("ready")}>
              Continue →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= READY =================
  if (stage === "ready") {
    return (
      <div style={pageBg}>
        <div style={container}>
          <div style={centerBox}>
            <h2>🚀 Ready to start?</h2>
            <button style={primaryBtn} onClick={() => setStage("countdown")}>
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= COUNTDOWN =================
  if (stage === "countdown") {
    return (
      <div style={pageBg}>
        <div style={container}>
          <div style={centerBox}>
            <h1 style={countdownStyle}>{countdown}</h1>
          </div>
        </div>
      </div>
    );
  }

  // ================= RESULT =================
  if (stage === "result") {
    return (
      <div style={pageBg}>
        <div style={container}>
          <div style={centerBox}>
            <h2>🏁 Round {round} Finished</h2>

            <div style={resultScore}>
              <span>🧑 {score}</span>
              <span>🤖 {cpuScore}</span>
            </div>

            <h3>{result === "win" ? "🏆 You Win!" : "🤖 CPU Wins"}</h3>

            <p style={{ marginTop: "10px", color: "#facc15" }}>{rewardMsg}</p>

            <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
              <button
                style={primaryBtn}
                onClick={() => {
                  setRound((r) => r + 1);
                  setStage("countdown");
                }}
              >
                Continue →
              </button>

              <button style={secondaryBtn} onClick={() => setStage("rules")}>
                Quit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= QUIZ =================
  return (
    <div style={pageBg}>
      <div style={container}>
        <button style={stopBtn} onClick={() => setStage("result")}>
          ⛔ Stop
        </button>

        <div style={quizWrapper}>
          <div style={header}>
            <h3>⚔️ Round {round}</h3>

            <div>
              <span>🧑 {score}</span>
              <span>🤖 {cpuScore}</span>
            </div>
          </div>

          <div style={timerWrapper}>
            <div style={timerBar}>
              <div style={{ ...timerFill, width: `${time * 10}%` }} />
            </div>
            <p>⏱️ {time}s</p>
          </div>

          <h2 style={{ textAlign: "center" }}>{q?.question}</h2>

          <div style={optionsGrid}>
            {q?.options.map((opt) => {
              const isCorrect = opt === q.answer;
              const isSelected = opt === selected;

              let bg = "#fef3c7";

              if (showAnswer) {
                if (isCorrect) bg = "#22c55e";
                else if (isSelected) bg = "#ef4444";
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={showAnswer}
                  style={{ ...optionBtn, background: bg }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;

// 🎨 STYLES (UPDATED)

const pageBg = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #fff7ed, #ffedd5, #fde68a)", // 🍑 peach
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const container = {
  width: "650px",
  height: "560px",
  padding: "20px",
  background: "rgba(255,255,255,0.6)", // softer glass
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  color: "#1f2937", // dark text for light bg
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const centerBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "25px",
};

const rulesList = {
  listStyle: "none",
  padding: 0,
  textAlign: "center",
  fontSize: "18px", // 🔥 bigger
  lineHeight: "28px",
};

const resultScore = {
  display: "flex",
  gap: "40px",
  fontSize: "22px", // 🔥 bigger
  fontWeight: "bold",
};

const quizWrapper = {
  display: "flex",
  flexDirection: "column",
  gap: "25px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "18px",
  fontWeight: "600",
};

const timerWrapper = {
  textAlign: "center",
  fontSize: "16px",
};

const timerBar = {
  height: "10px",
  background: "#e5e7eb",
  borderRadius: "10px",
};

const timerFill = {
  height: "100%",
  background: "linear-gradient(90deg, #fb923c, #facc15)",
};

const optionsGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
};

const optionBtn = {
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#f3f4f6", // light default
  color: "#111",
  cursor: "pointer",
  fontSize: "16px", // 🔥 bigger
  fontWeight: "500",
};

const rightHeader = {}
const primaryBtn = {
  padding: "12px 25px",
  background: "#f97316",
  border: "none",
  borderRadius: "10px",
  color: "#fff",
  cursor: "pointer",
  fontSize: "16px", // 🔥 bigger
  fontWeight: "600",
};

const secondaryBtn = {
  padding: "12px 25px",
  background: "#e5e7eb",
  border: "none",
  borderRadius: "10px",
  color: "#111",
  cursor: "pointer",
  fontSize: "16px",
};

const stopBtn = {
  position: "absolute",
  top: "15px",
  right: "15px",
  background: "#ef4444",
  border: "none",
  color: "#fff",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
};

const countdownStyle = {
  fontSize: "120px", // 🔥 bigger
  fontWeight: "bold",
  textAlign: "center",
};