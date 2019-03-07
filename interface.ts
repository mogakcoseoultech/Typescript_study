interface Student {
    firstname : string;
    lastname : string;
    studentNumber : number;
}

function info(student : Student) {
    return `Name : ${student.firstname} ${student.lastname} (${student.studentNumber})`
}

let hong = {
    firstname : "H",
    lastname : "JB",
    studentNumber : 141093
};

console.log(info(hong))
