const questions = [
  {
    type: "single",
    question: "1. Which language runs in the browser?",
    options: ["Java", "Python", "JavaScript", "C++"],
    answer: "JavaScript"
  },
  {
    type: "multi",
    question: "2. Which of the following are programming languages? (Select multiple)",
    options: ["HTML", "CSS", "Python", "Java"],
    answer: ["Python", "Java"]
  },
  {
    type: "fill",
    question: "3. Fill in the blank: HTML stands for _______.",
    answer: "HyperText Markup Language"
  }
];

let index = 0;
let score = 0;

// Load question into HTML
function loadQuestion() {
  const q = questions[index];
  let html = `<div class='question'>${q.question}</div>`;

  if (q.type === "single") {
    html += '<div class="options">';
    q.options.forEach(opt => {
      html += `<label><input type='radio' name='option' value='${opt}'> ${opt}</label>`;
    });
    html += '</div>';
  }

  if (q.type === "multi") {
    html += '<div class="options">';
    q.options.forEach(opt => {
      html += `<label><input type='checkbox' value='${opt}'> ${opt}</label>`;
    });
    html += '</div>';
  }

  if (q.type === "fill") {
    html += `<input type='text' id='fillInput' placeholder='Type your answer...'>`;
  }

  document.getElementById("quiz").innerHTML = html;
}

// Submit answer
function submitAnswer() {
  const q = questions[index];
  let userAnswer;

  if (q.type === "single") {
    const selected = document.querySelector("input[name='option']:checked");
    if (selected) userAnswer = selected.value;
  }

  if (q.type === "multi") {
    userAnswer = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
                      .map(c => c.value);
  }

  if (q.type === "fill") {
    userAnswer = document.getElementById("fillInput").value.trim();
  }

  if (!userAnswer || userAnswer.length === 0) {
    alert("Please select/enter an answer.");
    return;
  }

  if (q.type === "multi") {
    if (JSON.stringify(userAnswer.sort()) === JSON.stringify(q.answer.sort())) score++;
  } else if (userAnswer.toString().toLowerCase() === q.answer.toString().toLowerCase()) {
    score++;
  }

  index++;

  if (index < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz").innerHTML = "<h2>Quiz Completed!</h2>";
    document.getElementById("score").innerHTML = `Your Score: ${score} / ${questions.length}`;
  }
}

// Initial load
loadQuestion();
