let score = 0;
let i = 0;
let questions = '';

const apiUrl = 'https://opentdb.com/api.php?amount=10&category=25&type=multiple&encode=base64';

function getQuestions() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching questions');
            }
            return response.json();
        })
        .then(data => {
            questions = data.results;
            let blank = {
                category: window.btoa("Question 11: Blank"),
                type: window.btoa(""),
                difficulty: window.btoa("Easy"),
                question: window.btoa(""),
                correct_answer: window.btoa("Correct"),
                incorrect_answers: [
                    window.btoa("Incorrect"),
                    window.btoa("Incorrect"),
                    window.btoa("Incorrect")
                ]
            };
            questions.push(blank);

            $('#progress').addClass('hidden');
            showPage();
            $('#preloader').hide()




            $('#next, #startBtn').click(() => {
                $('.choice-container').removeClass('disable-answers');
                $('#question').text(window.atob(data.results[i].question));

                let array2 = [...data.results[i].incorrect_answers, data.results[i].correct_answer].sort(() => Math.random() - 0.5);
                $('#choice1, #c1, #ac1').text(window.atob(array2[0]));
                $('#choice2, #c2, #ac2').text(window.atob(array2[1]));
                $('#choice3, #c3, #ac3').text(window.atob(array2[2]));
                $('#choice4, #c4, #ac4').text(window.atob(array2[3]));
                i++;
                $('.c-alert').addClass('hidden');
                $('.w-alert').addClass('hidden');
            });


            $('#choice1, #c1, #ac1').click(() => {
                $('#choice2, #c2, #ac2').addClass('not-chosen');
                $('#choice3, #c3, #ac3').addClass('not-chosen');
                $('#choice4, #c4, #ac4').addClass('not-chosen');
            });

            $('#choice2, #c2, #ac2').click(() => {
                $('#choice1, #c1, #ac1').addClass('not-chosen');
                $('#choice3, #c3, #ac3').addClass('not-chosen');
                $('#choice4, #c4, #ac4').addClass('not-chosen');
            });

            $('#choice3, #c3, #ac3').click(() => {
                $('#choice1, #c1, #ac1').addClass('not-chosen');
                $('#choice2, #c2, #ac2').addClass('not-chosen');
                $('#choice4, #c4, #ac4').addClass('not-chosen');
            });

            $('#choice4, #c4, #ac4').click(() => {
                $('#choice1, #c1, #ac1').addClass('not-chosen');
                $('#choice2, #c2, #ac2').addClass('not-chosen');
                $('#choice3, #c3, #ac3').addClass('not-chosen');
            });

            $('#startBtn, #next, #choice1, #choice2, #choice3, #choice4, #c1, #c2, #c3, #c4, #ac1, #ac2, #ac3, #ac4').click((event) => {
                let yourAnswer = event.target.innerHTML;
                $('#next').addClass('disable-answers hidden');

                $('#choice1, #choice2, #choice3, #choice4, #c1, #c2, #c3, #c4, #ac1, #ac2, #ac3, #ac4').click(() => {
                    $('#next').removeClass('disable-answers hidden');
                    $('#question_number').addClass('hidden');
                });

                $('#next').click(() => {
                    $('.choice-container').removeClass('disable-answers');
                    $('.c-alert').addClass('hidden');
                    $('.w-alert').addClass('hidden');
                    $('#question_number').removeClass('hidden');

                    $('#choice1, #c1, #ac1').removeClass('not-chosen');
                    $('#choice2, #c2, #ac2').removeClass('not-chosen');
                    $('#choice3, #c3, #ac3').removeClass('not-chosen');
                    $('#choice4, #c4, #ac4').removeClass('not-chosen');
                });

                $('.c-alert').addClass('hidden');
                $('.w-alert').addClass('hidden');

                $('#quiz-card, #quiz-white').removeClass('hidden');
                $('#startBtn').addClass('hidden');

                $('#question_number').text(`${i}/${data.results.length - 1}`);

                if (i > 0) {
                    if (yourAnswer === window.atob(data.results[i - 1].correct_answer)) {
                        $('.c-alert').removeClass('hidden');
                        $('.choice-container').addClass('disable-answers');
                        score++;
                    } else if (yourAnswer !== window.atob(data.results[i - 1].correct_answer) && yourAnswer !== 'Begin') {
                        $('.w-alert').removeClass('hidden');
                        $('.choice-container').addClass('disable-answers');
                    }
                }

                if (i === 10) {
                    $('#next').text('Submit');
                } else if (i === 11 && score <= 10) {
                    $('#submit').click();
                    $('#question_number').hide();
                    $('.choice-container, #question_number').addClass('hidden');
                    $('#question').text(`Score: ${score}/${data.results.length - 1}`);
                    i++;
                    $('#question').addClass('hidden');
                    $('#progress').removeClass('hidden');
                    let percent = score * 10;
                    $('#your-quiz-score').text(percent)





                    function createProgressBar(value, max, width = 180, className = "") {
                        const SVG_DASHARRAY_MAX = 126;
                        const dashOffset = Math.round((value * SVG_DASHARRAY_MAX) / max);
                        const containerWidth = 60;
                        const maxValueFontSize = 10;

                        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        svg.setAttribute("viewBox", `0 0 120 ${containerWidth}`);
                        svg.setAttribute("width", width.toString());
                        svg.setAttribute("class", className);

                        const style = document.createElement("style");
                        style.textContent = `@keyframes progress {
    from { stroke-dashoffset: ${SVG_DASHARRAY_MAX}; }
    to { stroke-dashoffset: ${SVG_DASHARRAY_MAX - dashOffset}; }
  }`;

                        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        path1.setAttribute("d", "M20,50 A10,10 0 1,1 100,50");
                        path1.setAttribute("fill", "none");
                        path1.setAttribute("stroke-linecap", "round");
                        path1.setAttribute("stroke-width", "6");
                        path1.setAttribute("stroke", "#EFEFEF ");

                        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        path2.setAttribute("d", "M20,50 A10,10 0 1,1 100,50");
                        path2.setAttribute("fill", "none");
                        path2.setAttribute("stroke-linecap", "round");
                        path2.setAttribute("stroke-width", "6");
                        path2.setAttribute("stroke-dasharray", SVG_DASHARRAY_MAX);
                        path2.setAttribute("stroke-dashoffset", SVG_DASHARRAY_MAX);
                        path2.style.animation = "progress 1s ease-out forwards";

                        const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
                        gradient.setAttribute("id", "progressGradient");
                        gradient.setAttribute("x1", "0%");
                        gradient.setAttribute("y1", "0%");
                        gradient.setAttribute("x2", "100%");
                        gradient.setAttribute("y2", "0%");

                        const stopRed = document.createElementNS("http://www.w3.org/2000/svg", "stop");
                        stopRed.setAttribute("offset", "0%");
                        stopRed.setAttribute("stop-color", "#D61F1F");

                        const stopYellow = document.createElementNS("http://www.w3.org/2000/svg", "stop");
                        stopYellow.setAttribute("offset", "80%");
                        stopYellow.setAttribute("stop-color", "#FFD301");

                        const stopGreen = document.createElementNS("http://www.w3.org/2000/svg", "stop");
                        stopGreen.setAttribute("offset", "100%");
                        stopGreen.setAttribute("stop-color", "#7BB662");

                        gradient.appendChild(stopRed);
                        gradient.appendChild(stopYellow);
                        gradient.appendChild(stopGreen);

                        path2.setAttribute("stroke", "url(#progressGradient)");

                        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                        text.setAttribute("x", "107");
                        text.setAttribute("y", "52");
                        text.setAttribute("fill", "#646464 ");
                        text.style.fontSize = `${(maxValueFontSize * containerWidth) / 100}px`;
                        text.style.fontFamily = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
                        text.style.fontWeight = "600";
                        text.style.opacity = "60%";
                        text.style.letterSpacing = "-0.02em";
                        text.textContent = max.toString();

                        svg.appendChild(style);
                        svg.appendChild(path1);
                        svg.appendChild(gradient);
                        svg.appendChild(path2);
                        svg.appendChild(text);

                        return svg;
                    }

                    const root = document.querySelector("#root");
                    const example = createProgressBar(percent, 100, "#000", 400);
                    root.appendChild(example);










                    if (percent >= 90 && percent <= 100) {
                        $('.message').text('Exceptional');
                    } else if (percent >= 80 && percent < 90) {
                        $('.message').text('Very Good');
                    } else if (percent >= 70 && percent < 80) {
                        $('.message').text('Satisfactory');
                    } else if (percent >= 60 && percent < 70) {
                        $('.message').text('Insufficient');
                    } else if (percent <= 50) {
                        $('.message').text('Fail');
                    }

                    $('.result').text(`${percent}%`);
                    let missed = data.results.length - 1 - score;
                    $('.wrong-count').text(missed);
                    $('.correct-count').text(score);

                    let total = data.results.length - 1;
                    $('.total-count').text(total);
                    $('#your-score').text(`Your Score: ${score}/${total}`);

                    
                }
            });
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            container.innerHTML = 'Error fetching questions. Please try again later.';
        });
}

getQuestions();


function confirm() {
    window.location = "index.html";
}

function restart() {
    window.location = window.location;
}

function showPage() {
    $('#everything').removeClass('hidden');
}





$(document).ready(function () {

    const startButton = $("#startBtn");
    const stopButton = $("#submit");
    const timerElement = $("#timer");

    let startTime;
    let timerInterval;

    startButton.click(startTimer);
    stopButton.click(stopTimer);

    function startTimer() {

        startTime = Date.now();


        timerInterval = setInterval(updateTimer, 1000);


        startButton.prop("disabled", true);
    }

    function stopTimer() {

        clearInterval(timerInterval);


        startButton.prop("disabled", false);
    }

    function updateTimer() {

        const elapsedTime = Date.now() - startTime;


        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);


        const formattedTime = `Elapsed Time: ${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;


        timerElement.text(formattedTime);
    }

    function padZero(value) {

        return value < 10 ? `0${value}` : value;
    }
});