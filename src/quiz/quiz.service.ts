import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { Prisma } from "@prisma/client";
import {
    AnswerFields, CreateAnswer,
    CreateQuestion,
    CreateQuiz,
    QuestionFields,
    QuizFields, 
    QuizResultFields,
    QuizSubmission, 
    UpdateAnswer, 
    UpdateQuestion,
    UpdateQuiz
} from "@/types/graphql";

@Injectable()
export class QuizService {
	constructor(private prisma: PrismaService) {}

    private quizInclude = Prisma.validator<Prisma.QuizInclude>()({
        parentLesson: true,
        questions: {
            include: {
                answers: true
            }
        },
        quizResults: {
            include: {
                student: true,
            }
        }
    });

    private questionInclude = Prisma.validator<Prisma.QuestionInclude>()({
        answers: true,
        parent: {
            include: {
                parentLesson: true,
                quizResults: true
            }
        }
    })

    private answerInclude = Prisma.validator<Prisma.AnswerInclude>()({
        parentQuestion: {
            include: {
                parent: {
                    include: {
                        parentLesson: true,
                        quizResults: true
                    }
                }
            }
        }
    })

    private quizResultInclude = Prisma.validator<Prisma.QuizResultInclude>()({
        student: {
            include: {
                student: true,
            }
        },
        quiz: {
            include: {
                parentLesson: true,
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
        })
        return this.prisma.quiz.findMany({
            where,
            include: this.quizInclude
        })
    }

    async question(args: QuestionFields) {
        const where = Prisma.validator<Prisma.QuestionWhereInput>()({
            id: args.id ? args.id : undefined,
            number: args.number ? args.number : undefined,
            text: args.text ? args.text : undefined,
            points: args.points ? args.points : undefined,
        })

	async answer(args: AnswerFields) {
		const where = Prisma.validator<Prisma.AnswerWhereInput>()({
			id: args.id ? args.id : undefined,
			text: args.text ? args.text : undefined,
			correct: args.correct ? args.correct : undefined,
			weight: args.weight ? args.weight : undefined,
			index: args.index ? args.index : undefined,
			parentQuestion: args.parentQuestion
				? { id: args.parentQuestion }
				: undefined
		});
		return this.prisma.answer.findMany({
			where,
			include: this.answerInclude
		});
	}

	async createQuiz(input: CreateQuiz) {
		const create = Prisma.validator<Prisma.QuizCreateInput>()({
			totalPoints: input.totalPoints,
			dueAt: input.dueAt ? input.dueAt : undefined,
			timeLimit: input.timeLimit ? input.timeLimit : undefined,
			numQuestions: input.numQuestions,
			minScore: input.minScore ? input.minScore : undefined,
			parentLesson: { connect: { id: input.parentLesson } },
			questionPool: { connect: { id: input.questionPool } }
		});

    async quizResult(args: QuizResultFields) {
        const where = Prisma.validator<Prisma.QuizResultWhereInput>()({
            id: args.id ? args.id : undefined,
            score: args.score ? args.score : undefined,
            student: args.student ? {id: args.student} : undefined,
            quiz: args.quiz ? {id: args.quiz} : undefined
        })
        return this.prisma.quizResult.findMany({
            where,
            include: this.quizResultInclude
        })
    }

    async createQuiz(input: CreateQuiz) {
        const create = Prisma.validator<Prisma.QuizCreateInput>()({
            totalPoints: input.totalPoints,
            dueAt: input.dueAt ? input.dueAt : undefined,
            timeLimit: input.timeLimit ? input.timeLimit : undefined,
            numQuestions: input.numQuestions,
            minScore: input.minScore ? input.minScore : undefined,
            parentLesson: {connect: {id: input.parentLesson}}
        })

	async updateQuiz(id: string, values: UpdateQuiz) {
		const update = Prisma.validator<Prisma.QuizUpdateArgs>()({
			data: {
				totalPoints: values.totalPoints ? values.totalPoints : undefined,
				dueAt: values.dueAt ? values.dueAt : undefined,
				timeLimit: values.timeLimit ? values.timeLimit : undefined,
				numQuestions: values.numQuestions ? values.numQuestions : undefined,
				minScore: values.minScore ? values.minScore : undefined,
				parentLesson: values.parentLesson
					? { connect: { id: values.parentLesson } }
					: undefined,
				questionPool: values.questionPool
					? { connect: { id: values.questionPool } }
					: undefined
			},
			where: {
				id: id
			}
		});
		return this.prisma.quiz.update({
			where: update.where,
			data: update.data,
			include: this.quizInclude
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

	async createQuestionPool() {
		return this.prisma.questionPool.create({
			data: {}
		});
	}

    async createQuestion(input: CreateQuestion) {
        const data = Prisma.validator<Prisma.QuestionCreateInput>()({
            number: input.number,
            text: input.text,
            variant: input.variant,
            points: input.points ? input.points : undefined,
            parent: {connect: {id: input.parentQuiz}}
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
                parent: values.parentQuiz ? {connect: {id: values.parentQuiz}} : undefined
            }
        })
        return this.prisma.question.update({
            ...(update),
            include: this.questionInclude
        });
    }

	async createAnswer(input: CreateAnswer) {
		const data = Prisma.validator<Prisma.AnswerCreateInput>()({
			text: input.text,
			correct: input.correct,
			weight: input.weight ? input.weight : undefined,
			index: input.index ? input.index : undefined,
			parentQuestion: { connect: { id: input.parentQuestion } }
		});
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
				correct: values.correct != null ? values.correct : undefined,
				weight: values.weight ? values.weight : undefined,
				index: values.index ? values.index : undefined,
				parentQuestion: values.parentQuestion
					? { connect: { id: values.parentQuestion } }
					: undefined
			}
		});
		return this.prisma.answer.update({
			...update,
			include: this.answerInclude
		});
	}

    async submitQuiz(input: QuizSubmission) {
        //Get plan of study for the submitted user
        const student = await this.prisma.user.findUnique({
            where: {
                id: input.student
            },
            include: {
                plan: true
            }
        })
        if(!student || !student.plan) return new Error("Could not find user plan of study");
        const plan = student.plan.id

        //TODO: Add quiz grading logic

        return this.prisma.quizResult.create({
            data: {
                score: 100.0,
                answers: input.answers,
                student: {connect: {id: plan}},
                quiz: {connect: {id: input.quiz}}
            }
        })
    }

    async updateQuizScore(id: string, newScore: number) {
        return this.prisma.quizResult.update({
            where: {id},
            data: {score: newScore},
            include: this.quizResultInclude
        })
    }

    async deleteQuizResult(id: string) {
        return this.prisma.quizResult.delete({
            where: {id}
        })
    }
}
