import {
    createStudent,
    deleteStudentById,
    getStudents,
    getStudentById,
    updateStudentById,
} from "../utils/students.js";

export const createStudentController = (req, res) => {
    const student = req.body;
    const result = createStudent(student);
    res.json({
        message: "Create student successfully",
        result,
    });
};

export const getStudentsController = (req, res) => {
    /*
     * get query page (If query empty, replace with default page)
     */
    const page = Number.parseInt(req.query.page) || 1;
    const filterName = req.query.name || "";
    const filterAge = Number(req.query.age) || 0;
    const filterGender = req.query.gender || "";
    /*
     * Get student listing
     */
    const students = getStudents(page, filterName, filterAge, filterGender);

    /*
     * Response JSON to client
     */
    res.json(students);
};

export const getStudentByIdController = (req, res) => {
    const {id} = req.params;
    const result = getStudentById(id);
    return res.json({
        message: "Get students successfully",
        result,
    });
};

export const updateStudentByIdController = (req, res) => {
    const {id} = req.params;
    const result = updateStudentById(id, req.body);
    return res.json({
        message: `Update students with ${id} successfully`,
        result,
    });
};

export const deleteStudentByIdController = (req, res) => {
    const {id} = req.params;
    deleteStudentById(id);
    return res.json({
        message: `Delete student with ${id} successfully`,
    });
};
