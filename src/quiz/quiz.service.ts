import { Injectable } from '@nestjs/common';
import { PrismaService} from "@/prisma.service";
import {Prisma} from "@prisma/client";
import {AnswerFields, CreateQuiz, QuestionFields, QuestionPoolFields, QuizFields, UpdateQuiz} from "@/types/graphql";

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

    // TODO question();
    async question(args: QuestionFields) {
        return this.prisma.question.findMany({
            include: this.questionInclude
        })
    }

    // TODO answer();
    async answer(args: AnswerFields) {
        return this.prisma.answer.findMany({
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
        return;
    }

    async deleteQuestionPool() {
        return;
    }

    async createQuestion() {
        return;
    }

    async updateQuestion() {
        return;
    }

    async deleteQuestion() {
        return;
    }

    async createAnswer() {
        return;
    }

    async updateAnswer() {
        return;
    }

    async deleteAnswer() {
        return;
    }

}
