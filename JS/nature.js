let score = 0;
let i = 0;
let questions = '';


const apiUrl = 'https://opentdb.com/api.php?amount=10&category=17&type=multiple&encode=base64';

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
                    $('#question_number').hide();
                    $('.choice-container, #question_number').addClass('hidden');
                    $('#question').text(`Score: ${score}/${data.results.length - 1}`);
                    i++;
                    $('#question').addClass('hidden');
                    $('#progress').removeClass('hidden');
                    let percent = score * 10;

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

                    $(function () {
                        $(".progress").each(function () {
                            var value = $(this).attr('data-value');
                            value = percent;
                            var left = $(this).find('.progress-left .progress-bar');
                            var right = $(this).find('.progress-right .progress-bar');

                            if (value > 0) {
                                if (value <= 50) {
                                    right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)');
                                } else {
                                    right.css('transform', 'rotate(180deg)');
                                    left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)');
                                }
                            }
                        });

                        function percentageToDegrees(percentage) {
                            return (percentage / 100) * 360;
                        }
                    });
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

