
const Jimp = require('jimp');

async function compareImages(args) {
    const imgBase = await Jimp.read(args.imgBase);
    const imgAfterChanges = await Jimp.read(args.imgAfterChanges);
    const diff = Jimp.diff(imgBase, imgAfterChanges);

    return diff.percent;
}

exports.compareImages = compareImages;