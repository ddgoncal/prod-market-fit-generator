// pages/api/quizzes.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { questions } = req.body;
            const newQuiz = await prisma.quiz.create({
            data: {
                title: "New Quiz", // You can let user set a title later
                questions: {
                    create: questions.map(question => ({
                        text: question.text,
                        type: question.type,
                        options: question.options || null,
                        })),
                },
            },
         });
         res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz});
        } catch (error) {
            console.error('Error creating quiz:', error);
            res.status(500).json({ message: 'Error creating quiz' });
        }
    } else {
       res.status(405).json({ message: 'Method not allowed' });
    }
    finally {
        await prisma.$disconnect();
    }
}