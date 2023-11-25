import fs from "fs";
import path from "path";

export function createStudent({name, age, gender}) {
    console.log(path.resolve());
    // Đọc file
    const students = JSON.parse(fs.readFileSync("students.json").toString());
    //   Tạo student giả
    const student = {
        id: Math.random() * 1000,
        name: name,
        age: age,
        gender: gender,
    };
    const results = [...students, {...student}];
    fs.writeFileSync("students.json", JSON.stringify(results));
    return student;
}

export function getStudents(page = 1, filterName = "", filterAge = 0, filterGender = "") {
    // Đọc file
    const students = JSON.parse(fs.readFileSync("students.json").toString());

    /*
     * Paginate students
     */
    const studentsObj = paginateStudents(students, page, 10);

    /*
     * Filter students
     */
    const filterResultStudents = filterStudents(studentsObj.results, filterName, filterAge, filterGender);

    studentsObj.results = filterResultStudents.length > 0 ? filterResultStudents : [];
    studentsObj.message = filterResultStudents.length > 0 ? "Student(s) Found." : "Found No Student.";
    studentsObj.status = filterResultStudents.length > 0 ? 200 : 404;

    return studentsObj;
}

export function getStudentById(id) {
    // Đọc file
    const students = JSON.parse(fs.readFileSync("students.json").toString());
    const student = students.find((student) => student.id === +id);
    console.log(student);
    return student;
}

export const updateStudentById = (id, body) => {
    // Đọc file
    const students = JSON.parse(fs.readFileSync("students.json").toString());
    const result = students.map((student) => {
        if (student.id === +id) {
            return {...student, ...body};
        }
        return student;
    });
    fs.writeFileSync("students.json", JSON.stringify(result));
    return result;
};

export const deleteStudentById = (id) => {
    // Đọc file
    const students = JSON.parse(fs.readFileSync("students.json").toString());
    const result = students.filter((student) => student.id !== +id);
    fs.writeFileSync("students.json", JSON.stringify(result));
};


const paginateStudents = (students = [], page = 1, LIMIT = 10) => {
    // Total Pages
    const totalPages = Math.ceil(students.length / LIMIT);
    const remainItems = students.length % LIMIT;
    const isRemainItems = ((page * LIMIT) - students.length) < LIMIT;

    // Pagination
    const FIRST_PAGE = 1;
    const firstItem = ((LIMIT * page) - LIMIT);
    const lastItem = (LIMIT * page) - 1;
    const paginateStudents = {
        message: "",
        results: [],
        totalResults: students.length,
        page: page,
        totalPages: (students.length > 0 && students.length <= 10) ? FIRST_PAGE : totalPages,
        status: 102 // Processing Status
    };

    /* Add Message For Paginate Students Array*/
    paginateStudents.message = ((page > totalPages) && !isRemainItems) ? "PAGE EXCEED LIMIT" : "Get students successfully";
    paginateStudents.status = ((page > totalPages) && !isRemainItems) ? 404 : 200;

    // Get Paginate Students Listing
    let firstItemCount = firstItem;

    while (firstItemCount <= lastItem) {
        /* Check Item Exits When Page > Total Pages Or Last Page >= Total Pages */
        const isRemainItemsExceedNotExist = page > totalPages && !isRemainItems;
        const isRemainItemsLastPageNotExist = page >= totalPages && firstItemCount >= (firstItem + remainItems);

        if (isRemainItemsLastPageNotExist) {
            break;
        }

        if (isRemainItemsExceedNotExist) {
            break;
        }

        /* Add Student Into Paginate Students Array */
        paginateStudents.results.push(students[firstItemCount]);

        /* Increase student count by 1 */
        firstItemCount++;
    }

    return paginateStudents;
}

const filterStudents = (students = [], name = "", age = 0, gender = "") => {
    if (name !== "" && name !== null) {
        const regName = new RegExp(name, 'i');
        students = students.filter(student => regName.test(student.name));
    }

    if (age !== 0) {
        students = students.filter(student => student.age === age);
    }

    if (gender !== "" && gender !== null) {
        students = students.filter(student => student.gender === gender.toLowerCase());
    }

    return students;
}