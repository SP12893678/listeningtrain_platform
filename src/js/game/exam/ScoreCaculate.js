import { apiManageLearning } from '@/js/api'
export default class ScoreCaculate {
    constructor() {
        this.exam_data = []
    }

    getDefaultFormateObject() {
        return {
            accuracy: { your: 0, all: 0 },
            completion: { your: 0, all: 0 },
            response_rate: 0,
            high_frequency_accuracy: { your: 0, all: 0 },
            low_frequency_accuracy: { your: 0, all: 0 },
            total: 0,
        }
    }

    getExamData() {
        return apiManageLearning({ type: 'get' }).then((res) => {
            if (res.data == null) return
            let past_exams = JSON.parse(res.data.test).test
            if (past_exams.length < 1) return
            this.exam_data = past_exams
        })
    }

    hasExamDataNoneID() {
        return (Array.isArray(this.exam_data) && this.exam_data.length > 0)
    }

    hasExamData(enviro_id) {
        return (Array.isArray(this.exam_data) && this.exam_data.filter((exam) => exam.enviro_id == enviro_id).length > 0)
    }

    getAverageScoreDataAll() {
        let exam_data = this.exam_data
        let average_score = this.getDefaultFormateObject()
        let first_response_rate = exam_data[0].response_rate
        exam_data.forEach((exam) => {
            average_score.accuracy.your += exam.accuracy.your
            average_score.accuracy.all += exam.accuracy.all
            average_score.completion.your += exam.completion.your
            average_score.completion.all += exam.completion.all
            average_score.response_rate += exam.response_rate
            average_score.high_frequency_accuracy.your += exam.high_frequency_accuracy.your
            average_score.high_frequency_accuracy.all += exam.high_frequency_accuracy.all
            average_score.low_frequency_accuracy.your += exam.low_frequency_accuracy.your
            average_score.low_frequency_accuracy.all += exam.low_frequency_accuracy.all
            average_score.total++
        })

        return [
            Math.round((average_score.accuracy.your / average_score.accuracy.all) * 100),
            Math.round(
                (average_score.response_rate / average_score.total / (first_response_rate * 2)) * 100
            ),
            Math.round(
                (average_score.low_frequency_accuracy.your / average_score.low_frequency_accuracy.all) * 100
            ),
            Math.round(
                (average_score.high_frequency_accuracy.your / average_score.high_frequency_accuracy.all) * 100
            ),
            Math.round((average_score.completion.your / average_score.completion.all) * 100),
        ]
    }

    getAverageScoreData(enviro_id) {
        let exam_data = this.exam_data.filter((exam) => exam.enviro_id == enviro_id)
        let average_score = this.getDefaultFormateObject()
        let first_response_rate = exam_data[0].response_rate
        exam_data.forEach((exam) => {
            average_score.accuracy.your += exam.accuracy.your
            average_score.accuracy.all += exam.accuracy.all
            average_score.completion.your += exam.completion.your
            average_score.completion.all += exam.completion.all
            average_score.response_rate += exam.response_rate
            average_score.high_frequency_accuracy.your += exam.high_frequency_accuracy.your
            average_score.high_frequency_accuracy.all += exam.high_frequency_accuracy.all
            average_score.low_frequency_accuracy.your += exam.low_frequency_accuracy.your
            average_score.low_frequency_accuracy.all += exam.low_frequency_accuracy.all
            average_score.total++
        })

        return [
            Math.round((average_score.accuracy.your / average_score.accuracy.all) * 100),
            Math.round(
                (average_score.response_rate / average_score.total / (first_response_rate * 2)) * 100
            ),
            Math.round(
                (average_score.low_frequency_accuracy.your / average_score.low_frequency_accuracy.all) * 100
            ),
            Math.round(
                (average_score.high_frequency_accuracy.your / average_score.high_frequency_accuracy.all) * 100
            ),
            Math.round((average_score.completion.your / average_score.completion.all) * 100),
        ]
    }

    getAverageCompletion(enviro_id) {
        let exam_data = this.exam_data.filter((exam) => exam.enviro_id == enviro_id)
        let average_score = this.getDefaultFormateObject()
        exam_data.forEach((exam) => {
            average_score.completion.your += exam.completion.your
            average_score.completion.all += exam.completion.all
        })

        return Math.round((average_score.completion.your / average_score.completion.all) * 100)
    }
}
