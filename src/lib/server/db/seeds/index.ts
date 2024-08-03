import * as schema from "../schema";
import { eq } from "drizzle-orm";
// import roles from "./data/role.json"
// import users from "./data/user.json"
// import programs from "./data/program.json"
// import courses from "./data/course.json"
// import batches from "./data/batch.json"
// import semesters from "./data/semester.json"
import lectures from "./data/lecture.json"
import { db } from "..";


// user - will insert both professor and student roles users
// course - independent for now
// programs - independent
// professors - depends on user
// batch - depends on program
// semester - program, batch
// students - depends on user, program, batch

// console.log("INSERTING ROLES")
// await db.insert(schema.roleTable).values(roles);

// console.log("INSERTING USERS")
// await db.insert(schema.userTable).values(users).returning();

// console.log("INSERTING PROFESSORS REFERENCING USERS")
// const professors = await db.select().from(schema.userTable).where(eq(schema.userTable.role, "professor"));
// professors.forEach(async (professor) => {
//     await db.insert(schema.professorTable).values({ id: professor.id, userId: professor.id });
// })

// console.log("INSERTING PROGRAMS")
// await db.insert(schema.programTable).values(programs.map((program) => ({ id: program.code, name: program.name, description: program.description })) )

// console.log("INSERTING COURSES")
// await db.insert(schema.courseTable).values(courses);

// console.log("INSERTING BATCHES")
// await db.insert(schema.batchTable).values(batches.map((batch) => ({ id: batch.id, year: 2021, programId: batch.program_code,  })))

// console.log("INSERTING SEMESTERS")
// await db.insert(schema.semesterTable).values(semesters.map((semester) => ({
//     id: semester.id,
//     name: semester.name,
//     startAt: semester.start_at,
//     endAt: semester.end_at,
//     programId: semester.program_code,
//     batchId: semester.batch_code
// })));

// console.log("INSERTING STUDENTS REFERENCING USERS")
// const students = await db.select().from(schema.userTable).where(eq(schema.userTable.role, "student"));
// students.forEach(async (student) => {
//     const program_code = student.email.split("@")[0].split('.')[1].slice(5);
//     await db.insert(schema.studentTable).values({ userId: student.id, programId: program_code, batchId: `${2021}-${program_code}` });
// })

console.log("INSERTING LECTURES")
lectures.forEach(async (lecture, i) => {
    const course = await db.query.courseTable.findFirst({
        where: eq(schema.courseTable.name,lecture["course-name"])
    });
    const user = await db.query.userTable.findFirst({
        where: eq(schema.userTable.name, lecture["professor-name"]),
        columns: {
            createdAt: false,
            email: false,
            emailVerified: false,
            image: false,
            role: false,
            name: true,
            id: false
        },
        with: {
            professor: {
                columns: {
                    id: true
                }
            }
        }
    });
    console.log(`INSERTING ${i} ${course?.name} BY ${user?.name}`);
    const dbLecture = await db.insert(schema.lectureTable).values({
        active: true,
        courseId: course?.id,
        professorId: user?.professor?.id,
        location: lecture.location,
    }).returning();
    lecture["sem-id"].forEach(async (semId) => {
        console.log(`DEFINING semesterId: ${semId} to lectureId:${dbLecture[0].id}  course:${lecture["course-name"]} `)
        await db.insert(schema.semesterLectureTable).values({
            lectureId: dbLecture[0].id,
            semesterId: semId,
        })
    })
});
