import { Response } from "express"
import fs from "fs"
import path from "path"

export const episodeService = {
    streamEpisodeToResponse: (res: Response, videoUrl: string, range: string | undefined) => {
        const filePath = path.join(__dirname, '..', '..', 'uploads', videoUrl)
        const fileStats = fs.statSync(filePath)

        if (range) {
            const parts = range.replace(/bytes=/, '').split('-')

            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileStats.size - 1

            const chunkSize = (end - start) + 1

            const file = fs.createReadStream(filePath, { start, end })

            const head = {
                'content-Range': `bytes ${start}-${end}/${fileStats.size}`,
                'Accept-Ranges': `bytes`,
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4'
            }

            res.writeHead(206, head)

            file.pipe(res)
        } else {
            const head = {
                'Content-Length': fileStats.size,
                'Content-Type': 'video/mp4'
            }

            res.writeHead(200, head)

            fs.createReadStream(filePath).pipe(res)
        }
    }
}