const fs = require('fs');
const entries = require('./new_entries.json');

const filePath = './old_entries_with_clips.json';
function getRandomNumber(min, max, offset) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1))
    return randomNumber + offset
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    // Parse the JSON data
    let jsonData = JSON.parse(data);
    jsonData.map((movie) => {
            const randomNumber = getRandomNumber(0, 15, 0)
            const entry = entries[randomNumber]
            movie.videoTitle = entry.title
            movie.description = entry.description
            movie.videoUrl = entry.videoUrl
        return movie
    })

    // Stringify the modified JSON object
    const jsonString = JSON.stringify(jsonData, null, 2); // null, 2 for pretty formatting

    // Write the modified JSON object back to the file
    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("Successfully updated JSON file.");
        }
    });
});