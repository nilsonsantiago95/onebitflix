import { Course } from "../models"

export const courseService = {
    findByIdWithEpisodes: async (id: string) => {
        const courseWithEpisodes = await Course.findByPk(id, {
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
            ],
            include: {
                association: 'episodes',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong']
                ],
                order: [['order', 'ASC']],
                separate: true
            }
        })

        return courseWithEpisodes
    },

    getRandoFeaturedCourses: async () => {
        const featuredCouses = await Course.findAll({
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
            ],
            where: {
                featured: true
            }
        })

        const randomFeaturedCourses = featuredCouses.sort(() => 0.5 * Math.random())

        return randomFeaturedCourses.slice(0, 3)
    }
}