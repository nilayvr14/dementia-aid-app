import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import nlp from 'compromise';

// Add custom tags
/*nlp.extend((Doc, world) => {
    world.addWords({
      'aspirin': 'Medicine',
      'ibuprofen': 'Medicine',
      'meeting': 'Event',
      'doctor appointment': 'Event',
      'morning': 'Time',
      'afternoon': 'Time',
      'evening': 'Time'
    });
  });*/
  

const VoiceRecognitionComponent = ({ patient, addReminder }) => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [analysisResult, setAnalysisResult] = useState('');

  let words = {
        'aspirin': 'Medicine',
        'ibuprofen': 'Medicine',
        'meeting': 'Event',
        'doctor appointment': 'Event',
        'morning': 'Time',
        'afternoon': 'Time',
        'evening': 'Time'
    };
  

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleAnalysis = () => {
    const doc = nlp(transcript, words);
    const medicine = doc.match('#Medicine').out('text');
    const event = doc.match('#Event').out('text');
    const time = doc.match('#Time').out('text');

    let result = 'No reminders set.';
    if (medicine || event) {
      result = `Reminder set for ${medicine ? medicine + ' medicine' : event + ' event'} at ${time}.`;
      addReminder({ id: Date.now(), text: result });
    }

    setAnalysisResult(result);
    resetTranscript();
  };

  return (
    <div>
      <button onClick={SpeechRecognition.startListening} disabled={listening}>
        Start Listening
      </button>
      <button onClick={SpeechRecognition.stopListening} disabled={!listening}>
        Stop Listening
      </button>
      <button onClick={handleAnalysis}>Analyze</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>Transcript: {transcript}</p>
      <p>Analysis Result: {analysisResult}</p>
    </div>
  );
};

export default VoiceRecognitionComponent;
