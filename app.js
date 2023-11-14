// script.js
function simulateMeeting() {
    const agenda = document.getElementById('agenda').value;
    const participants = document.getElementById('participants').value.split(',').map(participant => participant.trim());

    if (agenda === '' || participants.length === 0) {
        alert('Please fill in the meeting agenda and participants.');
        return;
    }

    const transcript = generateTranscript(agenda, participants);

    displayTranscript(transcript);
}

function generateTranscript(agenda, participants) {
    const transcript = [];

    transcript.push('** Business Meeting Transcript **');
    transcript.push(`Agenda: ${agenda}`);
    transcript.push('Participants: ' + participants.join(', '));
    transcript.push('---');

    // Simulate meeting discussion (you can customize this part)
    participants.forEach(participant => {
        transcript.push(`${participant}: I agree with the agenda.`);
        transcript.push(`${participant}: Let's discuss item 1.`);
        transcript.push(`${participant}: I propose...`);
        // Add more discussion points
    });

    transcript.push('---');
    transcript.push('** End of Meeting **');

    return transcript.join('\n');
}

function displayTranscript(transcript) {
    const transcriptDiv = document.getElementById('transcript');
    transcriptDiv.textContent = transcript;
}
