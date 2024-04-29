import { randomUUID } from 'node:crypto'

export class dbMemoryQuiz {

    #questions = new Map()

    list(search = '') {
        return Array.from(this.#questions.entries())
            .map((questionArray) => {
                const id = questionArray[0]
                const question = questionArray[1]

                return {
                    id,
                    ...question
                }
            })
            .filter(question => {
                return search ? question.titleQuestion.includes(search) :  true
            })
    }

    create(question) {
        const questionID = randomUUID()
        this.#questions.set(questionID, question)
    }

    update(id, question) {
        this.#questions.set(id, question)
    }

    delete(id) {
        this.#questions.delete(id)
    }

}