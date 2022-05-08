export class TeacherDto {
    name: string;
    surname: string;
    patronymic: string;
    numberСertificateTeacher: number;

    constructor(
        name: string, 
        surname: string, 
        patronymic: string, 
        numberСertificateTeacher: number
        ) {
            this.name = name;
            this.surname = surname;
            this.patronymic = patronymic;
            this.numberСertificateTeacher = numberСertificateTeacher;
    }
}