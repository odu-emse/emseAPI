import { Injectable } from '@nestjs/common';
import { PrismaService} from "@/prisma.service";
import {Prisma} from "@prisma/client";
import {
    AnswerFields, CreateAnswer,
    CreateQuestion,
    CreateQuiz,
    QuestionFields,
    QuestionPoolFields,
    QuizFields, UpdateAnswer, UpdateQuestion,
    UpdateQuiz
} from "@/types/graphql";

@Injectable()
export class QuizService {
    constructor(private prisma: PrismaService) {}

    private quizInclude = Prisma.validator<Prisma.QuizInclude>()({
        parentLesson: true,
        questionPool: {
            include: {
                questions: true,
            }
        }
    });

    private questionPoolInclude = Prisma.validator<Prisma.QuestionPoolInclude>()({
        questions: {
            include: {
                answers: true,
            }
        },
        quizzes: {
            include: {
                parentLesson: true
            }
        }
    })

    private questionInclude = Prisma.validator<Prisma.QuestionInclude>()({
        parentPool: {
            include: {
                quizzes: {
                    include: {
                        parentLesson: true
                    }
                }
            }
        },
        answers: true
    })

    private answerInclude = Prisma.validator<Prisma.AnswerInclude>()({
        parentQuestion: {
            include: {
                parentPool: {
                    include: {
                        quizzes: {
                            include: {
                                parentLesson: true
                            }
                        }
                    }
                }
            }
        }
    })


    async quiz(args: QuizFields) {
        const where = Prisma.validator<Prisma.QuizWhereInput>()({
            id: args.id ? args.id : undefined,
            totalPoints: args.totalPoints ? args.totalPoints : undefined,
            dueAt: args.dueAt ? args.dueAt : undefined,
            timeLimit: args.timeLimit ? args.timeLimit : undefined,
            numQuestions: args.numQuestions ? args.numQuestions : undefined,
            minScore: args.minScore ? args.minScore : undefined,
            parentLessonID: args.parentLesson ? args.parentLesson : undefined,
            questionPoolID: args.questionPool ? args.questionPool : undefined
        })
        return this.prisma.quiz.findMany({
            where,
            include: this.quizInclude
        })
    }

    async questionPool(args: QuestionPoolFields) {
        const where: Omit<Prisma.QuestionPoolWhereInput, "AND"> & {
            AND: Array<Prisma.QuestionPoolWhereInput>
        } = {
            id: args.id ? args.id : undefined,
            AND: []
        }

        if (args.questions){
            args.questions.forEach((id) =>{
                where.AND.push({
                    questions: {some: {id}}
                });
            })
        }

        if (args.quizzes) {
            args.quizzes.forEach((id) => {
                where.AND.push({
                    quizzes: {some: {id}}
                })
            })
        }

        return this.prisma.questionPool.findMany({
            where,
            include: this.questionPoolInclude
        })
    }

    async question(args: QuestionFields) {
        const where: Omit<Prisma.QuestionWhereInput, "AND"> & {
            AND: Array<Prisma.QuestionWhereInput>
        } = {
            id: args.id ? args.id : undefined,
            number: args.number ? args.number : undefined,
            text: args.text ? args.text : undefined,
            points: args.points ? args.points : undefined,
            parentPool: args.parentPool ? {id: args.parentPool} : undefined,
            AND: []
        }

        if (args.answers) {
            args.answers.forEach((id) => {
                where.AND.push({
                    answers: {some: {id}}
                })
            })
        }

        return this.prisma.question.findMany({
            where,
            include: this.questionInclude
        })
    }

    async answer(args: AnswerFields) {
        const where = Prisma.validator<Prisma.AnswerWhereInput>()({
            id: args.id ? args.id : undefined,
            text: args.text ? args.text: undefined,
            correct: args.correct ? args.correct : undefined,
            weight: args.weight ? args.weight : undefined,
            index: args.index ? args.index : undefined,
            parentQuestion: args.parentQuestion ? {id: args.parentQuestion} : undefined
        })
        return this.prisma.answer.findMany({
            where,
            include: this.answerInclude
        })
    }

    async createQuiz(input: CreateQuiz) {
        const create = Prisma.validator<Prisma.QuizCreateInput>()({
            totalPoints: input.totalPoints,
            dueAt: input.dueAt ? input.dueAt : undefined,
            timeLimit: input.timeLimit ? input.timeLimit : undefined,
            numQuestions: input.numQuestions,
            minScore: input.minScore ? input.minScore : undefined,
            parentLesson: {connect: {id: input.parentLesson}},
            questionPool: {connect: {id: input.questionPool}}
        })

        return this.prisma.quiz.create({
            data: create
        });
    }

    async updateQuiz(id: string, values: UpdateQuiz) {
        const update = Prisma.validator<Prisma.QuizUpdateArgs>()({
            data: {
                totalPoints: values.totalPoints ? values.totalPoints : undefined,
                dueAt: values.dueAt ? values.dueAt : undefined,
                timeLimit: values.timeLimit ? values.timeLimit : undefined,
                numQuestions: values.numQuestions ? values.numQuestions : undefined,
                minScore: values.minScore ? values.minScore : undefined,
                parentLesson: values.parentLesson ? {connect: {id: values.parentLesson}} : undefined,
                questionPool: values.questionPool ? {connect: {id: values.questionPool}} : undefined,
            },
            where: {
                id: id
            }
        })
        return this.prisma.quiz.update({
            where: update.where,
            data: update.data,
            include: this.quizInclude
        })
    }

    async deleteQuiz(id: string) {
        return this.prisma.quiz.delete({
            where: {
                id
            }
        })
    }

    async createQuestionPool() {
        return this.prisma.questionPool.create({
            data:{}
        });
    }

    async deleteQuestionPool(id: string) {
        return this.prisma.questionPool.delete({
            where: {
                id
            },
            include: this.questionPoolInclude
        });
    }

    async createQuestion(input: CreateQuestion) {
        const data = Prisma.validator<Prisma.QuestionCreateInput>()({
            number: input.number,
            text: input.text,
            points: input.points ? input.points : undefined,
            parentPool: {connect: {id: input.parentPool}}
        })
        return this.prisma.question.create({
            data,
            include: this.questionInclude
        });
    }

    async updateQuestion(id: string, values: UpdateQuestion) {
        const update = Prisma.validator<Prisma.QuestionUpdateArgs>()({
            where: {
                id
            },
            data: {
                number: values.number ? values.number : undefined,
                text: values.text ? values.text : undefined,
                points: values.points ? values.points : undefined,
                parentPool: values.parentPool ? {connect: {id: values.parentPool}} : undefined
            }
        })
        return this.prisma.question.update({
            ...(update),
            include: this.questionInclude
        });
    }

    async deleteQuestion(id: string) {
        return this.prisma.question.delete({
            where: {
                id
            },
            include: this.questionInclude
        });
    }

    async createAnswer(input: CreateAnswer) {
        const data = Prisma.validator<Prisma.AnswerCreateInput>()({
            text: input.text,
            correct: input.correct,
            weight: input.weight ? input.weight : undefined,
            index: input.index ? input.index : undefined,
            parentQuestion: {connect: {id: input.parentQuestion}}
        })
        return this.prisma.answer.create({
            data,
            include: this.answerInclude
        });
    }

    async updateAnswer(id: string, values: UpdateAnswer) {
        const update = Prisma.validator<Prisma.AnswerUpdateArgs>()({
            where: {
                id
            },
            data: {
                text: values.text ? values.text : undefined,
                correct: (values.correct != null) ? values.correct : undefined,
                weight: values.weight ? values.weight : undefined,
                index: values.index ? values.index : undefined,
                parentQuestion: values.parentQuestion ? {connect: {id: values.parentQuestion}} : undefined
            }
        });
        return this.prisma.answer.update({
            ...(update),
            include: this.answerInclude
        });
    }

    async deleteAnswer(id: string) {
        return this.prisma.answer.delete({
            where: {
                id
            },
            include: this.answerInclude
        });
    }

}
