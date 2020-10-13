import { apiManageMission, apiManageLearning, apiManageGame } from "@/js/api";

class MissionSystem {
    constructor() {
        this.missions = []
        this.learningdata = {}
        this.detector = this.missionDetector()
    }

    init() {
        return new Promise((resolve, reject) => {
            const getLearningData = apiManageLearning({ type: 'get' });
            const getMissionData = apiManageMission({ type: 'get', amount: 'all' });
            const getUserData = apiManageGame({ type: 'get' });
            const learningDataPrase = (res) => {
                this.learningdata = res.data
                this.learningdata.train = JSON.parse(this.learningdata.train)
                this.learningdata.practice = JSON.parse(this.learningdata.practice)
                this.learningdata.test = JSON.parse(this.learningdata.test)
            }
            const missionDataPrase = (res) => {
                this.missions = res.data
                this.missions.forEach(mission => {
                    mission.required = JSON.parse(mission.required)
                    mission.rewards = JSON.parse(mission.rewards)
                })
            }
            const userDataParse = (res) => {
                console.log('complete mission', res.data)
                let complete_missions = res.data.mission
                if (complete_missions == null) return
                complete_missions = JSON.parse(complete_missions)
                // console.log(JSON.parse(complete_missions))
                /**處理每日任務已完成的 */
                this.missions.forEach(mission => {
                    if (mission.type == '每日任務') {
                        let the_same_mission = complete_missions.find(complete_mission => mission.id == complete_mission.id)
                        if (the_same_mission == undefined) return
                        let today = new Date()
                        let today_string = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 0:0:0`
                        if (Date.parse(today_string) < Date.parse(the_same_mission.time)) mission.status = 'received'
                    }
                    else {
                        let the_same_mission = complete_missions.find(complete_mission => mission.id == complete_mission.id)
                        if (the_same_mission != undefined) mission.status = 'received'
                    }
                })
            }

            Promise.all([getLearningData, getMissionData, getUserData])
                .then(res => {
                    learningDataPrase(res[0])
                    missionDataPrase(res[1])
                    userDataParse(res[2])
                    resolve()
                })
                .catch(res => reject(res));
        })
    }

    missionDetect(mission) {
        console.log('detect')
        if (mission.status == 'received') return
        this.detector[mission.required.mode.id](mission)
    }

    missionDetector() {
        let app = this
        let dateFilter = (mission, data) => {
            if (mission.type != '每日任務') return data
            let today = new Date()
            let today_string = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 0:0:0`
            data = data.filter(item => Date.parse(today_string) < Date.parse(item.time))
            return data
        }
        return {
            train(mission) {
                let trainData = app.learningdata.train.train
                /**任務類型(每日/成長) */
                trainData = dateFilter(mission, trainData)
                let isNeedSpecificEnviro = (mission.required.enviro != null)
                let isNeedSpecificObject = (mission.required.object != null)
                trainData = (!isNeedSpecificObject && isNeedSpecificEnviro)
                    ? trainData.filter(item => item.enviro == mission.required.enviro) : trainData;
                trainData = (isNeedSpecificObject) ? trainData.filter(item => item.id == mission.required.object) : trainData;
                mission.status = (trainData.length >= mission.required.times) ? 'finished' : 'unfinished'
                mission.fit = trainData.length
            },
            practice(mission) {
                // console.log('practice',mission)
                mission.status = 'unfinished'
                mission.fit = 0
            },
            test(mission) {
                let testData = app.learningdata.test.test
                /**任務類型(每日/成長) */
                testData = dateFilter(mission, testData)

                let isNeedSpecificEnviro = (mission.required.enviro != null)
                if (isNeedSpecificEnviro) testData = testData.filter(item => item.enviro_id == mission.required.enviro)
                let action_type = (mission.required.action == "遊玩次數") ? 'playtimes' : 'accuracy'

                const action = {
                    playtimes() {
                        mission.status = (testData.length >= mission.required.times) ? 'finished' : 'unfinished'
                        mission.fit = testData.length
                    },
                    accuracy() {
                        let best_value = 0
                        if (testData.length > 0)
                            best_value = Math.max(...testData.map(item => (item.accuracy.your / item.accuracy.all) * 100))
                        mission.status = (best_value >= mission.required.times) ? 'finished' : 'unfinished'
                        mission.fit = Math.round(best_value)
                    }
                }
                action[action_type]();
            }
        }
    }
}

export default new MissionSystem()