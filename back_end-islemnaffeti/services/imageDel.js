import fs from 'fs';

export default async function deletImage(filename, callback) {
    fs.unlink(`upload/images/${filename}`, (err) => {
        if (err) return callback(err);

        callback(null);
    });
}
