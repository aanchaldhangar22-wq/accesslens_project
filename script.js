function textToSpeech() {
  const text = document.getElementById("ttsText").value;
  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(speech);
}
function startSpeech() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.start();

  recognition.onresult = function (event) {
    document.getElementById("speechResult").innerText =
      event.results[0][0].transcript;
  };
}
async function extractText() {
  const file = document.getElementById("imageInput").files[0];
  const reader = new FileReader();

  reader.onload = async function () {
    const base64Image = reader.result.split(",")[1];

    const response = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY_HERE",
      {
        method: "POST",
        body: JSON.stringify({
          requests: [
            {
              image: { content: base64Image },
              features: [{ type: "TEXT_DETECTION" }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    document.getElementById("ocrResult").innerText =
      data.responses[0].fullTextAnnotation.text;
  };

  reader.readAsDataURL(file);
}
