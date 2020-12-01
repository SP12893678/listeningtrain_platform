import Character_tex from '@/assets/images/Character_tex.png'
import character_tex_json from '@/assets/json/Character_tex.json'

export default class loadClothes {
    constructor () {
        this.pic = {
            gg: { hair: [], clothes: [], bottoms: [], shoe: [], h_deco: [], wrist_deco: [] },
            mm: { hair: [], clothes: [], bottoms: [], shoe: [], h_deco: [], wrist_deco: [] }
        }
        this.canvas = document.createElement('canvas')
        this.canvas.width = 120
        this.canvas.height = 120
        this.canvas.style = 'display: none;'
        this.context = this.canvas.getContext('2d')
        this.imageObj = new Image()
        this.imageObj.src = Character_tex
        this.mydata = {}
        // this.pic = {}//整理好的no跟imgsrc
        this.imageObj.onload = () => this.init()
    }

    init () {
        this.mydata = this.item_classifier(character_tex_json)
        this.pic_classifier()
    }

    /* 將讀取的json檔內容 配件info做好分類 */
    item_classifier (itemPath) {
        const temp = itemPath
        const itemClass = {
            gg: { hair: {}, clothes: {}, cleft: {}, cright: {}, bottoms: {}, shoe: {}, sright: {}, h_deco: {}, wrist_deco: {} },
            mm: { hair: {}, clothes: {}, cleft: {}, cright: {}, bottoms: {}, shoe: {}, sright: {}, h_deco: {}, wrist_deco: {} }
        }
        const itemName = Object.keys(Object.values(itemClass)[0])

        for (let i = 0; i < temp.SubTexture.length; i++) {
            const str = temp.SubTexture[i]
            itemName.forEach(item => {
                if (str.name.indexOf(item) > -1) {
                    const no = str.name.match(/\d+/g)[0]
                    if (str.name.indexOf('gg') > -1) {
                        itemClass.gg[item][no] = str
                    }
                    if (str.name.indexOf('mm') > -1) {
                        itemClass.mm[item][no] = str
                    }
                }
            })
        }
        return itemClass
    }

    pic_classifier () {
        const itemName = Object.keys(Object.values(this.pic)[0])
        Object.keys(this.mydata).forEach(gender => { // 性別
            itemName.forEach(item => { // 類別
                Object.keys(this.mydata[gender][item]).forEach(no => { // 號碼
                    this.showClothes(item, no, gender)
                })
            })
        })
    }

    show_itemPic (itemName, no, gender = 'gg', xx = 0, yy = 0) {
        const imageObj = this.imageObj
        const context = this.context
        const item_data = this.mydata[gender][itemName]
        const height = item_data[no].height
        const width = item_data[no].width
        const x = item_data[no].x
        const y = item_data[no].y
        let hh = height
        let ww = width

        /* 針對clothes的顯示 */
        if (itemName == 'clothes' || itemName == 'cleft' || itemName == 'cright') {
            if (itemName == 'cleft') {
                xx += 10
                yy += 20
                ww = ww * (40 / width)
                hh = hh * (40 / width)
            } else if (itemName == 'cright') {
                xx += 70
                yy += 20
                ww = ww * (40 / width)
                hh = hh * (40 / width)
            } else {
                xx += 20
                yy += 20
                ww = ww * (78 / width)
                hh = hh * (78 / width)
            }
        }
        /* 針對女生hair的顯示 */
        else if (itemName == 'hair' && this.gender == 'mm') {
            xx = xx + 10 + (90 - width * (90 / height)) / 2
            yy = yy + 10 + (90 - height * (90 / height)) / 2
            ww = ww * (90 / width)
            hh = hh * (90 / width)
        }
        /* 針對shoe的顯示 */
        else if (itemName == 'shoe' || itemName == 'sright') {
            if (itemName == 'shoe') {
                xx = xx + (90 - width * (45 / height)) / 2
                yy = yy + 10 + (90 - height * (45 / height)) / 2
                ww = ww * (40 / width)
                hh = hh * (40 / width)
            } else {
                xx = xx + 45 + (90 - width * (45 / height)) / 2
                yy = yy + 10 + (90 - height * (45 / height)) / 2
                ww = ww * (40 / width)
                hh = hh * (40 / width)
            }
        }
        /* 針對wrist_deco的顯示 */
        else if (itemName == 'wrist_deco') {
            xx = xx + 10 + (90 - width * (90 / width)) / 2
            yy = yy + 10 + (90 - height * (90 / width)) / 2
        } else {
            const sc = (90 / width) < (90 / height) ? (90 / width) : (90 / height)
            xx = xx + 10 + (90 - width * sc) / 2
            yy = yy + 10 + (90 - height * sc) / 2
            ww = ww * sc
            hh = hh * sc
        }
        context.drawImage(imageObj, x, y, width, height, xx, yy, ww, hh)
    }

    /* 角色服飾pic */
    showClothes (itemName, no, gender = 'gg', xx = 0, yy = 0) {
        /* 針對clothes的顯示 */
        if (itemName == 'clothes') {
            this.show_itemPic('cleft', no, gender, xx, yy)
            this.show_itemPic('cright', no, gender, xx, yy)
        }
        /* 針對shoes的顯示 */
        else if (itemName == 'shoe') {
            this.show_itemPic('sright', no, gender, xx, yy)
        }
        this.show_itemPic(itemName, no, gender, xx, yy)
        const canvas = this.canvas
        const context = this.context
        const dataURL = canvas.toDataURL('image/png')
        const image = new Image()
        image.src = dataURL
        image.onload = () => {

        }
        this.pic[gender][itemName].push({ no: no, imgsrc: dataURL })
        context.clearRect(0, 0, canvas.width, canvas.height)// clear
    }
}
