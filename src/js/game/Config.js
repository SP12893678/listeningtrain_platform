import language_zh_tw from '@/assets/json/language_zh_tw.json'

const config = {
    screen: {
        width: 1600,
        height: 900,
    },
    audio: {
        volume: 1,
    },
    lanague: 'chinese',
    text: language_zh_tw,
    initClothes: [{   'gender':'gg',
                        'hair':"1,2,3,4",
                        'clothes':"1,2,3,4",
                        'cleft':"1,2,3,4",
                        'cright':"1,2,3,4",
                        'bottoms':"1,2,3,4",
                        'shoe':"1,2",
                        'sright':"1,2",
                        'h_deco':"",
                        'wrist_deco':"1"
                    },
                    {   'gender':'mm',
                        'hair':"1,2,3,4,5,6",
                        'clothes':"1,2,3,4,5",
                        'cleft':"1,2,3,4,5",
                        'cright':"1,2,3,4,5",
                        'bottoms':"1,2",
                        'shoe':"1",
                        'sright':"1",
                        'h_deco':"1,2",
                        'wrist_deco':"1"
                    }
                ]
}

export default config
