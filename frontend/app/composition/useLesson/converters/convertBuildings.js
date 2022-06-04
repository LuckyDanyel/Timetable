export default function (buildings) {
    const result = [];

    for(let building of buildings) {
        result.push({
            name: building.adress,
            id: building.id,
            numberCorpuse: building.numberCorpuse,
        })
    }
    return result;
}