import Config from '@/js/game/Config'
import language_zh_tw from '@/assets/json/language_zh_tw.json'
import language_en_us from '@/assets/json/language_en_us.json'

const languageList = {
    chinese: language_zh_tw,
    english: language_en_us,
}

const languageChooser = {
    select(language) {
        Config.lanague = language
        Config.text = languageList[language]
    },
}

export default languageChooser
