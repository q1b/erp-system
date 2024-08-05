import { eq, type InferInsertModel } from "drizzle-orm";
import { db } from "../"
import { professorTable, studentTable, userTable } from "../schema"

type InsertUser = Omit<InferInsertModel<typeof userTable>, 'id' | 'createdAt'>;

export const createUser = async (details: Omit<InsertUser,'role'>) => {
    await db.insert(userTable).values(details);
}

export const updateUser = async (userId: string, details: InsertUser) => {
    await db.update(userTable).set(details).where(eq(userTable.id, userId));
}

export const deleteUser = async (userId: string) => {
    await db.delete(userTable).where(eq(userTable.id, userId));
}

export const createProfessor = async (details: Omit<InsertUser,'role'>) => {
    const user = await db.insert(userTable).values({
        ...details,
        role: 'professor'
    }).returning();
    const professor = await db.insert(professorTable).values({
        userId: user[0].id
    }).returning();
    return {
        professorId: professor[0].id,
        userId: user[0].id
    }
}

export const createStudent = async (programId: string, batchId: string, userDetails: { id: string; } | Omit<InsertUser,'role'>) => {
    if ('id' in userDetails) {
        const student = await db.insert(studentTable).values({
            userId: userDetails.id,
            programId,
            batchId
        }).returning();
        return {
            studentId: student[0].id,
            userId: userDetails.id
        }
    }
    
    const user = await db.insert(userTable).values({
        ...userDetails,
        role: 'student'
    }).returning();
    const student = await db.insert(studentTable).values({
        userId: user[0].id,
        programId,
        batchId
    }).returning();
    return {
        studentId: student[0].id,
        userId: user[0].id
    }
}