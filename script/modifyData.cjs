const fs = require('fs');
const filePath = './data.json';

const categories = ["Movie", "TvSeries"]
const ratings = ["E", "PG", "18+"];
const genres = ["SciFi", "Thriller", "Comedy", "Action", "Crime", "Romance", "Comedy", "War", "Horror"]

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
        delete movie.isBookmarked
        delete movie.isTrending
        if (!movie.year) {
            movie.year = getRandomNumber(2000, 2024, 2000)
        }
        if (movie.category || !movie.category) {
            const randomNumber = getRandomNumber(0, 1, 0)
            movie.category = categories[randomNumber]
        }
        if (movie.rating) {
            const randomNumber = getRandomNumber(0, 2, 0)
            movie.rating = ratings[randomNumber]
        }

        movie.genre = []
        let numberOfGenresToAdd = getRandomNumber(1, 3, 1)
        console.log(numberOfGenresToAdd)
        while (movie.genre.length < numberOfGenresToAdd) {
            let newRandomNumber = getRandomNumber(0, genres.length - 1, 0);
            let newGenre = genres[newRandomNumber];

            if (!movie.genre.includes(newGenre)) {
                movie.genre.push(newGenre);
            }
        }

        console.log(movie.genre)
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