// src/index.js
import { fastify } from "fastify"

// Configuranção dos servidor
const serve = fastify()

// 
// API QUIZ
// 
import QuizJson from './json/QuizJson.json' with { "type": "json" }
import { dbMemoryQuiz } from './database/dbMemoryQuiz.js'
const dbQuiz = new dbMemoryQuiz()


// POST  http://localhost:3030/questions
serve.post('/questions', async (request, reply) => {
    const { quantidade } = request.body
    const QuizJsonRadom = QuizJson.sort(() => Math.random() - 0.5);

    QuizJsonRadom.slice(0, quantidade).map(async (question) => {
        const { pergunta, respostas, resposta_correta } = question
        await dbQuiz.create({
            pergunta,
            respostas,
            resposta_correta
        })
    })

    return reply.status(201).send()
});

// GET  http://localhost:3030/questions
serve.get('/questions', async (request) => {
    const { search } = request.query
    const question = await dbQuiz.list(search)

    return question
});

// PUT  http://localhost:3030/questions/id_da_questão
serve.put('/questions/:id', async (request, reply) => {
    const questionId = request.params.id;
    const { titleQuestion, correctAnswer, answers } = request.body

    await dbQuiz.update(questionId, {
        titleQuestion,
        correctAnswer,
        answers
    })

    return reply.status(204).send()
});

// DELETE  http://localhost:3030/questions/id_da_questão
serve.delete('/questions/:id', async (request, reply) => {
    const questionId = request.params.id;

    await dbQuiz.delete(questionId)

    return reply.status(204).send()
});


// 
// Ligando o servidor
// 
serve.listen({
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0'
}, (err) => {
    if (err) throw err
    console.log(`\nHTTP server running on port ${process.env.PORT}`);
})