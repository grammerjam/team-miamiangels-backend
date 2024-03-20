import AWS from 'aws-sdk';

let s3 = new AWS.S3()

const bucketParams = {
    Bucket: process.env.BUCKET_NAME
}
function getMimeType(fileName) {
    const extension = fileName.split('.').pop();
    const mimeTypes = {
        'mp4': 'video/mp4',
        'mpeg': 'video/mpeg',
        'mp3': 'audio/mpeg',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        // Add more MIME types as needed
    };

    return mimeTypes[extension] || 'application/octet-stream'; // Default to binary stream if unknown
}

export async function getVideoData(req, res) {
    const fileName = req.params.filename
    const range = req.headers.range

    const videoKey = fileName
    let s3Params = {
        Key: videoKey,
        Bucket: bucketParams.Bucket
    };

    s3.headObject(s3Params, function (err, data) {
        if (err) {
            return res.status(404).send("File not found")
        }

        var stream = s3.getObject(s3Params).createReadStream();

        stream.on('error', function error(err) {
            return res.status(404).send(err)
        });

        let parts = []
        if (range) {
            parts = range.replace(/bytes=/, '').split('-')
        }

        if (range && parts[0] > 0) {
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : data.ContentLength - 1
            const chunksize = end - start + 1

            const head = {
                'Content-Type': getMimeType(videoKey),
                'Content-Length': chunksize,
                'Last-Modified': data.LastModified,
                'ETag': data.ETag,
                'Content-Range': `bytes ${start} - ${end}/${data.ContentLength}`
            };

            res.writeHead(206, head)
            stream.on('end', () => {
                // console.log('Served by Amazon S3: ' + videoKey);
            });
            stream.pipe(res);
        } else {
            const head = {
                'Content-Type': getMimeType(videoKey),
                'Content-Length': data.ContentLength,
                'Last-Modified': data.LastModified,
                'ETag': data.ETag,
            };
            // res.set('Content-Type', getMimeType(videoKey));
            // res.set('Content-Length', data.ContentLength);
            // res.set('Last-Modified', data.LastModified);
            // res.set('ETag', data.ETag);

            stream.on('end', () => {
                // console.log('Served by Amazon S3: ' + videoKey);
            });
            res.writeHead(200, head)
            stream.pipe(res);
        }
    })
}