// Define your questions
const questions = [
    {
        question: "Who is the Artist of the song?",
        audioSrc: "../Songs/ACDC Back in Black Lyrics.mp3", // Replace with the actual path to your MP3 file
        options: [
            "Guns N' Roses",
            "Black Sabbath",
            "Foo Fighters",
            "AC/DC"
        ],
        answer: 3 // Index of the correct answer in the options array (starting from 0)
    },
    {
        question: "On which album is the song 'Sweet Child o Mine'",
        audioSrc: "../Songs/Guns N Roses Sweet Child O Mine lyrics.mp3", // Replace with the actual path to your MP3 file
        options: [
            "The Spaghetti Incident?",
            "Appetite for Destruction",
            "Use Your Illusion I",
            "Use Your Illusion II"
        ],
        answer: 1 // Index of the correct answer in the options array
    },


    // Add more questions here
    {
        question: "Who is the Lead singer of this song?",
        audioSrc: "../Songs/Queen Another One Bites The Dust.mp3", // Replace with the actual path to your MP3 file
        options: [
            "John Lennon",
            "Brian Johnson",
            "Freddie Mercury",
            "Billie Joe Armstrong"
        ],
        answer: 2 // Index of the correct answer in the options array
    },
    {
        question: "What is the name of the Band who composed this song?",
        audioSrc: "../Songs/Simple Plan Save You.mp3", // Replace with the actual path to your MP3 file
        options: [
            "Simple Plan",
            "Gorillaz",
            "Green Day",
            "My Chemical Romance"
        ],
        answer: 0 // Index of the correct answer in the options array
    },
    {
        question: "From which 'Green Day' album is this song?",
        audioSrc: "../Songs/Green Day Wake Me Up When September Ends.mp3", // Replace with the actual path to your MP3 file
        options: [
            "American Idiot",
            "21st Century Breakdown",
            "Nimrod",
            "!Uno"
        ],
        answer: 0 // Index of the correct answer in the options array
    },
    {
        question: "What is the Title of the My Chemical Romance song?",
        audioSrc: "../Songs/My Chemical Romance I Dont Love You.mp3", // Replace with the actual path to your MP3 file
        options: [
            "Na Na Na Na Na",
            "Welcome to the Black Parade",
            "Teenagers",
            "I Don't Love You"
        ],
        answer: 3 // Index of the correct answer in the options array
    },
    {
        question: "What is the name of the Band who sang this song?",
        audioSrc: "../Songs/Surf Curse Freaks Lyrics.mp3", // Replace with the actual path to your MP3 file
        options: [
            "The Rare Occasions",
            "Artic Monkeys",
            "My Chemical Romance",
            "Surf Curse"
        ],
        answer: 3 // Index of the correct answer in the options array
    },
    {
        question: "What is the Title of the Song?",
        audioSrc: "../Songs/Madeon Pay No Mind ft Passion Pit.mp3", // Replace with the actual path to your MP3 file
        options: [
            "Dream",
            "Pay No Mind",
            "Deadmau5",
            "Shelter"
        ],
        answer: 1 // Index of the correct answer in the options array
    },
    {
        question: "What is the Title of this Song?",
        audioSrc: "../Songs/you cant resist clicking this.mp3", // Replace with the actual path to your MP3 file
        options: [

            "Moonlight",
            "Telepatia",
            "Moon Night",
            "I wish You Roses"
        ],
        answer: 0 // Index of the correct answer in the options array
    },
    {
        question: "Who is the singer of this song?",
        audioSrc: "../Songs/EVADE FROM Flyday Chinatown Official Video.mp3", // Replace with the actual path to your MP3 file
        options: [
            "Yasuha",
            "Mariya Takeuchi",
            "Miki Matsubara",
            "Junko Yagami"
        ],
        answer: 0 // Index of the correct answer in the options array
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
    questionElement.innerHTML = currentQ.question;
    choicesElement.innerHTML = '';

    // Create an audio element
    const audioElement = document.createElement('audio');
    audioElement.src = currentQ.audioSrc;
    audioElement.controls = true;
    choicesElement.appendChild(audioElement);


    // Display answer options
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




