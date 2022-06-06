export default function(structureDataLesson) {
    const result = [];
    for(let index in structureDataLesson) {
        result.push(structureDataLesson[index]);
    }
    return result; 
}