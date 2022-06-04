export default function(dataTeacher) {
    const result = [];
    for(let teacher of dataTeacher) {
        teacher = addInitials(teacher);
        teacher = addFullName(teacher);
        result.push({
            ...teacher,
        })
    }
    return result;
}

function addInitials(teacher) {
    const { name, patronymic, surname } = teacher;
    return ({
        ...teacher,
        nameInitials: `${surname} ${createInitials(name)}${createInitials(patronymic)}`,
    })
}

function addFullName(teacher) {
    const { name, patronymic, surname } = teacher;

    return({
        ...teacher,
        name: `${surname} ${name} ${patronymic}`,
    })
}



const createInitials = name => `${name.split('')[0]}.`;