// HANDTRACKJS MDOEL PARAMS
const modelParams = {
    flipHorizontal: true,   // flip e.g for video
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 4,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.82,    // confidence threshold for predictions.
}

// LOAD THE MODEL
handTrack.load(modelParams).then(lmodel => {
    model = lmodel
});

// GET THE WEBCAM
navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
    navigator.msGetUserMedia

// GET EVERYTHING FROM HTML
const video = document.getElementById('video')
const audio = document.getElementById('audio')
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const muteBtn = document.getElementById('muteBtn')
let model

// INITALIZE VIDEO AND HANDTRACK.JS
handTrack.startVideo(video).then(status => {
    if (status) {
        navigator.getUserMedia({ video: {} }, stream => {
            video.srcObject = stream

            // RUN DETECTION
            setInterval(runDetection, 100)
        },
            err => console.log(err)
        )
    }
})

// CONFIG SOUND ACTIONS
let sound = false
muteBtn.addEventListener("click", () => {
    console.log("Button pressed", sound)
    if (muteBtn.value === "Play") {
        muteBtn.value = "Mute"
        muteBtn.innerHTML = "Mute"
    } else {
        muteBtn.value = "Play"
        muteBtn.innerHTML = "Play"
    }

    sound = !sound
})

// FUNCTION THAT RUNS THE PREDICTIONS
function runDetection() {

    model.detect(video).then(predictions => {
        model.renderPredictions(predictions, canvas, context, video)

        if (sound) {

            if (predictions.length !== 0) {

                let hand1 = predictions[0].bbox
                let x = hand1[0]
                let y = hand1[1]
                console.log(x)

                if (y > 150 && x > 100 && x < 450) {
                    audio.play()

                }
            }
        } else return
    })
}