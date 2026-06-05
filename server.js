const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get("/students", (req, res) => {

    const students = JSON.parse(
        fs.readFileSync("students.json")
    );

    students.forEach(student => {

        const score =
            (student.attendance * 0.5) +
            (student.assignments * 8) +
            (student.grade * 10);

        student.aiScore = score;

        if(score >= 100){
            student.prediction = "Good Student";
        }else{
            student.prediction = "Risk Student";
        }

    });

    res.json(students);

});

app.post("/update", (req, res) => {

    const { name, attendance, grade } = req.body;

    const students = JSON.parse(
        fs.readFileSync("students.json")
    );

    const student = students.find(
        s => s.name === name
    );

    if(student){

        student.attendance =
            Number(attendance);

        student.grade =
            Number(grade);

        fs.writeFileSync(
            "students.json",
            JSON.stringify(
                students,
                null,
                2
            )
        );

    }

    res.json({
        success:true
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        "Server running on port " + PORT
    );

});
