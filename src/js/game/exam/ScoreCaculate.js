export default class ScoreCaculate {
    constructor(exam_data) {
        this.exam_data = exam_data
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
}
