// Define your questions
const questions = [
    {
        question: "Which CSS selector targets an element with a specific id?",
        options: [
            "#",
            ".",
            "/",
            "*"
        ],
        answer: 0 // Index of the correct answer in the options array (starting from 0)
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: [
            "font-color",
            "text-color",
            "color",
            "font-style"
        ],
        answer: 2 // Index of the correct answer in the options array
    },


    // Add more questions here
    {
        question: "How can you center-align an element horizontally in CSS",
        options: [
            "text-align: center",
            "align: center",
            "margin: auto",
            "horizontal-align: center"
        ],
        answer: 2 // Index of the correct answer in the options array
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheet",
            "Computer Style Sheet",
            "Creative Style Sheet",
            "Colorful Style Sheet"
        ],
        answer: 0 // Index of the correct answer in the options array
    },
    {
        question: "Which property is used to specify the font of text?",
        options: [
            "font-family",
            "text-font",
            "typeface",
            "font-style"
        ],
        answer: 0 // Index of the correct answer in the options array
    },
    {
        question: "What does the CSS property 'float' do?",
        options: [
            "it pushes an element to the left or right, allowing other elements to wrap around it",
            "it animates an element's movement across the page",
            "it changes the opacity of the element",
            "it increases the font size of the element"
        ],
        answer: 0 // Index of the correct answer in the options array
    },
    {
        question: "What is the purpose of the CSS property 'box-sizing'?",
        options: [
            "it adjusts the visibility of the element",
            "it specifies the size of the box model for an element",
            "it changes the shape of the element",
            "it controls the border thickness"
        ],
        answer: 1 // Index of the correct answer in the options array
    },
    {
        question: "How can you select an element with the class name 'example' in CSS",
        options: [
            "#example",
            ".example",
            "element.example",
            "class: example"
        ],
        answer: 1 // Index of the correct answer in the options array
    },
    {
        question: "Which property is used to add rounded corners to an element in CSS?",
        options: [
            "border-style",
            "curve-border",
            "border-radius",
            "corner-round"
        ],
        answer: 2 // Index of the correct answer in the options array
    },
    {
        question: "What dies the CSS property 'position: absolute;' do?",
        options: [
            "Positions an element relative to its parent element",
            "Removes the element from the layout flow",
            "Makes the element transparent",
            "Centers the element horizontally"
        ],
        answer: 1 // Index of the correct answer in the options array
    },



];

// Elements
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const nextButton = document.querySelector('.next');
let currentQuestion = 0;
let score = 0;

// Show current question
function showQuestion() {
    const currentQ = questions[currentQuestion];
    questionElement.textContent = currentQ.question;
    choicesElement.innerHTML = '';

    currentQ.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.classList.add('mt-2', 'element-animation' + (index + 1), 'btn', 'btn-lg', 'btn-block', 'choices');
        label.innerHTML = `<span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span>
                            <input type="radio" name="q_answer" value="${index}"> ${option}`;

        // Add an event listener to each label
        label.addEventListener('click', function () {
            // Remove the background color from all options
            document.querySelectorAll('.choices').forEach((el) => {
                el.style.backgroundColor = '';
                el.style.color = '';
            });

            // Set the background color for the selected option
            label.style.backgroundColor = 'blanchedalmond'; // Change to the desired color
            label.style.color = 'black'; // Change to the desired text color
        });


        choicesElement.appendChild(label);

    });
}


// Function to update the scoreboard image
function updateScoreboard() {
    // Get the scoreboard image element
    const scoreboardImage = document.querySelector('.image-container img');

    // Set the maximum score level (adjust this based on the number of images you have)
    const maxScore = 10;

    // Ensure the score is within the valid range
    const clampedScore = Math.min(Math.max(score, 0), maxScore);

    // Update the scoreboard image source based on the current score
    scoreboardImage.src = `../scorepic/score${clampedScore}.png`;

    // Add a bounce animation class
    scoreboardImage.classList.add('bounce');

    // Remove the bounce class after the animation completes
    setTimeout(() => {
        scoreboardImage.classList.remove('bounce');
    }, 1000); // Adjust the duration of the bounce animation

}



// Function to update the reaction image
function updateReactionImage(isCorrect) {
    // Get the reaction image element
    const reactionImage = document.getElementById('reactionImage');

    // Set the image source based on the correctness of the answer
    if (isCorrect) {
        reactionImage.src = '../IMGS/correct_image.gif';
    } else {
        reactionImage.src = '../IMGS/wrong_image.gif';
    }

    // Show the reaction image
    reactionImage.style.display = 'block';

    // Hide the reaction image after a certain duration (adjust as needed)
    setTimeout(() => {
        reactionImage.style.display = 'none';
    }, 2000); // Adjust the duration (2 seconds in this example)
}


// Event listeners for checking answer and moving to the next question
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="q_answer"]:checked');
    if (selectedOption) {
        const answer = parseInt(selectedOption.value);

        if (answer === questions[currentQuestion].answer) {
            score++;
            updateReactionImage(true); // Show correct reaction image
        } else {
            updateReactionImage(false); // Show wrong reaction image
        }

        // Update the scoreboard
        updateScoreboard();

        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }
}

// Function to show the final score
function showScore() {
    choicesElement.innerHTML = `<h3>Quiz Completed!</h3>
                                <p>You scored ${score} out of ${questions.length} questions.</p>
                                <div id="restart">
                                    <button class="btn btn-primary restart-btn mt-3 mx-5" onclick="restartQuiz()">Restart Quiz</button>
                                </div>`;

    // Display the specific GIF at the end of the quiz
    const reactionImage = document.getElementById('reactionImage');
    reactionImage.src = '../IMGS/scoresummary.gif';
    reactionImage.style.display = 'block';

    nextButton.style.display = 'none';
    document.getElementById('restart').style.display = 'block'; // Show the restart button
    // Update the scoreboard one last time
    updateScoreboard();
}


function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    // Reset the scoreboard image to the initial state
    const scoreboardImage = document.querySelector('.image-container img');
    scoreboardImage.src = '../scorepic/score.png';
    showQuestion();
    nextButton.style.display = 'block';
    document.getElementById('restart').style.display = 'none'; // Hide the restart button
}



nextButton.addEventListener('click', checkAnswer);
showQuestion();





