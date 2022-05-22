export const adapterStudyPlan = (dataStudyPlan) => {
    const {  dataInstitutes, dataDirections, dataSubjects} = dataStudyPlan;
    const adaptInsitute = adapterInstitute(dataInstitutes);
    const adaptDirection = adapterDirection(dataDirections);
    const adaptSubject = adapterSubject(dataSubjects);

    return {
        adaptInsitute,
        adaptDirection,
        adaptSubject,
    }
}

export const adapterInstitute = (dataInstitute) => {
    const resutl = [];
    for(let institute of dataInstitute) {
        const { name: name, id } = institute;
        resutl.push({
            name,
            id,
        })
    }

    return resutl;
}

export const adapterDirection = (dataDirection) => {
    const resutl = [];
    for(let direction of dataDirection) {
        const { name: name, id, institute } = direction;
        resutl.push({
            name,
            id,
            institute,
        })
    }
    return resutl;
}

export const adapterSubject = (dataSubjects) => {
    const resutl = [];
    for(let subject of dataSubjects) {
        const { name: name, id, institutes } = subject;
        resutl.push({
            name,
            id,
            institutes,
        })
    }
    return resutl;
}