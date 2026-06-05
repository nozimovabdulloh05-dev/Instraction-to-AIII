const role =
localStorage.getItem("role");

const username =
localStorage.getItem("username");

document
.getElementById("welcomeText")
.innerText =
"Welcome " + username;

const content =
document.getElementById("content");

fetch("/students")

.then(res=>res.json())

.then(students=>{

if(role === "teacher"){

students.forEach(student=>{

content.innerHTML += `

<div class="card">

<h2>${student.name}</h2>

<p>
Attendance:
${student.attendance}%
</p>

<p>
Assignments:
${student.assignments}
</p>

<p>
Grade:
${student.grade}
</p>

<input
class="teacher-input"
type="number"
id="attendance-${student.name}"
placeholder="New Attendance">

<input
class="teacher-input"
type="number"
id="grade-${student.name}"
placeholder="New Grade">

<button
class="teacher-btn"
onclick="saveStudent('${student.name}')">

Save Changes

</button>

<div class="ai-box">

<b>AI Score:</b>
${student.aiScore}

<br><br>

<b>Prediction:</b>
${student.prediction}

</div>

</div>

`;

});

}

else{

const student =
students.find(
s =>
s.name.toLowerCase()
===
username.toLowerCase()
);

if(student){

content.innerHTML = `

<div class="card">

<h2>${student.name}</h2>

<p>
📅 Attendance:
${student.attendance}%
</p>

<p>
📝 Assignments:
${student.assignments}
</p>

<p>
🎓 Grade:
${student.grade}
</p>

<div class="ai-box">

<h3>AI Result</h3>

<p>
Prediction:
${student.prediction}
</p>

<p>
AI Score:
${student.aiScore.toFixed(2)}
</p>

</div>

</div>

`;

}

else{

content.innerHTML = `

<div class="card">

Student Not Found

</div>

`;

}

}

});

function saveStudent(name){

const attendance =
document.getElementById(
`attendance-${name}`
).value;

const grade =
document.getElementById(
`grade-${name}`
).value;

fetch("/update",{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

name,
attendance,
grade

})

})

.then(res=>res.json())

.then(()=>{

alert(
"Student Updated"
);

location.reload();

});

}