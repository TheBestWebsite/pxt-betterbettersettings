function imageToArray(value: Image): Array<number> {
    let array = [];
    for (let i = 0; i < value.height; i++) {
        for (let j = 0; j < value.width; j++) {
            array.push(value.getPixel(j, i));
        }
    }
    return array;
}

function arrayToImage(value: Array<number>, width: number, height: number): Image {
    let img = image.create(width, height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            img.setPixel(j, i, value[width * i + j]);
        }
    }
    return img;
}

//% groups='["Numbers", "Strings", "Booleans", "Images", "Arrays", "Operations"]'
namespace blockSettings {

    /**
     * Write a boolean value (T/F) to settings
     * @param name Name of the setting to set
     */
    //% blockId=block_settings_write_boolean
    //% block="set setting $name to $value"
    //% weight=100 blockGap=8 group="Booleans"
    export function writeBoolean(name: string, value: boolean): void {
        settings.writeNumber(name, value == true ? 1 : 0);
    }

    /**
     * Read a boolean value (T/F) from settings
     * @param name Name of the setting to set
     */
    //% blockId=block_settings_read_boolean
    //% block="read setting $name as boolean"
    //% weight=90 blockGap=8 group="Booleans"
    export function readBoolean(name: string): boolean {
        let value = settings.readNumber(name);
        return value === 1 ? true : false;
    }

    /**
     * Write an image object to settings
     * @param name Name of the setting to set
     */
    //% blockId=block_settings_write_image
    //% block="set setting $name to $value"
    //% value.shadow="screen_image_picker"
    //% weight=100 blockGap=8 group="Images"
    export function writeImage(name: string, value: Image): void {
        let width = value.width;
        let height = value.height;
        settings.writeNumberArray(name, [width, height].concat(imageToArray(value)));
    }

    /**
     * Read an image object from settings
     * @param name Name of the setting to set
     */
    //% blockId=block_settings_read_image
    //% block="read setting $name as image"
    //% weight=90 blockGap=8 group="Images"
    export function readImage(name: string): Image {
        let value = settings.readNumberArray(name);
        if (value.length < 2) {
            throw "Settings error: Invalid image input";
        }
        let width = value[0];
        let height = value[1];
        let imageArray = value.slice(2);
        return arrayToImage(imageArray, width, height);
    }

}