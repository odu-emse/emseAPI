import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { Prisma } from "@prisma/client";
import {
	AnswerFields,
	CreateAnswer,
	CreateQuestion,
	CreateQuiz,
	QuestionFields,
	QuizFields,
	QuizInstanceFields,
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
		questionPool: {
			include: {
				answers: true
			}
		},
		instances: true
	});

	private quizInstanceInclude = Prisma.validator<Prisma.QuizInstanceInclude>()({
		quiz: {
			include: {
				parentLesson: true,
				questionPool: {
					include: {
						answers: true
					}
				}
			}
		},
		questions: {
			include: {
				answers: true,
				parent: true
			}
		}
	});

	private questionInclude = Prisma.validator<Prisma.QuestionInclude>()({
		answers: true,
		parent: {
			include: {
				parentLesson: true
			}
		}
	});

	private answerInclude = Prisma.validator<Prisma.AnswerInclude>()({
		parentQuestion: {
			include: {
				parent: {
					include: {
						parentLesson: true
					}
				}
			}
		}
	});

	private quizResultInclude = Prisma.validator<Prisma.QuizResultInclude>()({
		student: {
			include: {
				student: true
			}
		},
		quizInstance: {
			include: {
				quiz: true,
				questions: {}
			}
		}
	});

	async quiz(args: QuizFields) {
		const where = Prisma.validator<Prisma.QuizWhereInput>()({
			id: args.id ? args.id : undefined,
			totalPoints: args.totalPoints ? args.totalPoints : undefined,
			dueAt: args.dueAt ? args.dueAt : undefined,
			timeLimit: args.timeLimit ? args.timeLimit : undefined,
			numQuestions: args.numQuestions ? args.numQuestions : undefined,
			minScore: args.minScore ? args.minScore : undefined,
			parentLessonID: args.parentLesson ? args.parentLesson : undefined
		});
		return this.prisma.quiz.findMany({
			where,
			include: this.quizInclude
		});
	}

	async quizInstance(args: QuizInstanceFields) {
		const where = Prisma.validator<Prisma.QuizInstanceWhereInput>()({
			id: args.id ? args.id : undefined,
			quizID: args.quiz ? args.quiz : undefined
		});
		return this.prisma.quizInstance.findMany({
			where,
			include: this.quizInstanceInclude
		});
	}

	async question(args: QuestionFields) {
		const where = Prisma.validator<Prisma.QuestionWhereInput>()({
			id: args.id ? args.id : undefined,
			number: args.number ? args.number : undefined,
			text: args.text ? args.text : undefined,
			points: args.points ? args.points : undefined
		});
		return this.prisma.question.findMany({
			where,
			include: this.questionInclude
		});
	}

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

	async quizResult(args: QuizResultFields) {
		const where = Prisma.validator<Prisma.QuizResultWhereInput>()({
			id: args.id ? args.id : undefined,
			score: args.score ? args.score : undefined,
			student: args.student ? { id: args.student } : undefined,
			quizInstance: args.quizInstance ? { id: args.quizInstance } : undefined
		});
		return this.prisma.quizResult.findMany({
			where,
			include: this.quizResultInclude
		});
	}

	async createQuiz(input: CreateQuiz) {
		const create = Prisma.validator<Prisma.QuizCreateInput>()({
			totalPoints: input.totalPoints,
			dueAt: input.dueAt ? input.dueAt : undefined,
			timeLimit: input.timeLimit ? input.timeLimit : undefined,
			numQuestions: input.numQuestions,
			minScore: input.minScore ? input.minScore : undefined,
			parentLesson: { connect: { id: input.parentLesson } }
		});
		return this.prisma.quiz.create({
			data: create,
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
				parentLesson: values.parentLesson
					? { connect: { id: values.parentLesson } }
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

	async deleteQuiz(id: string) {
		return this.prisma.quiz.delete({
			where: {
				id
			}
		});
	}

	async createQuizInstance(quizID: string) {
		// Get the quiz template
		const quiz = await this.prisma.quiz.findFirst({
			where: {
				id: quizID
			},
			include: {
				questionPool: {
					include: {
						answers: true
					}
				}
			}
		});
		if (quiz === null) {
			return new Error(
				"Could not find a quiz with given document ID: " + quizID
			);
		}
		//Start an array of question IDs
		const questionIDs: Array<{ id: string }> = [];
		//For each question that should be on the quiz
		for (let i = 1; i <= quiz.numQuestions; i++) {
			//Get all the variants of this question
			const questions = quiz.questionPool.filter(
				(question) => question.number === i
			);
			//Select a random question variant
			questionIDs.push({
				id: questions[Math.floor(Math.random() * questions.length)].id
			});
		}
		return this.prisma.quizInstance.create({
			data: {
				quiz: {
					connect: { id: quizID }
				},
				questions: {
					connect: questionIDs
				}
			}
		});
	}

	async deleteQuizInstance(id: string) {
		return this.prisma.quizInstance.delete({
			where: {
				id
			}
		});
	}

	async createQuestion(input: CreateQuestion) {
		const data = Prisma.validator<Prisma.QuestionCreateInput>()({
			number: input.number,
			text: input.text,
			variant: input.variant,
			points: input.points ? input.points : undefined,
			parent: { connect: { id: input.parentQuiz } }
		});
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
				parent: values.parentQuiz
					? { connect: { id: values.parentQuiz } }
					: undefined
			}
		});
		return this.prisma.question.update({
			...update,
			include: this.questionInclude
		});
	}

	async deleteQuestion(id: string) {
		return this.prisma.question.delete({
			where: {
				id
			}
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

	async deleteAnswer(id: string) {
		return this.prisma.answer.delete({
			where: {
				id
			}
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
		});
		if (!student || !student.plan)
			return new Error("Could not find user plan of study");
		const plan = student.plan.id;
		//Score counter;
		let score = 0.0
		//Check all answers
		const results = input.answers.map(async (answer) => {
			const answerObj = await this.prisma.answer.findUnique({
				where: {
					id: answer
				},
				include: {
					parentQuestion: true
				}
			});
			if (!answerObj) {
				return new Error("Could not find answer given ID");
			}
			if (answerObj.correct) {
				score += answerObj.parentQuestion.points;
			}
		})

		return Promise.all(results).then(() => this.prisma.quizResult.create({
			data: {
				score: score,
				// answers: input.answers,
				student: { connect: { id: plan } },
				quizInstance: { connect: { id: input.quizInstance } }
			}
		}))
		//TODO: Add quiz grading logic
		// const questions =

	}

	async updateQuizScore(id: string, newScore: number) {
		return this.prisma.quizResult.update({
			where: { id },
			data: { score: newScore },
			include: this.quizResultInclude
		});
	}

	async deleteQuizResult(id: string) {
		return this.prisma.quizResult.delete({
			where: { id }
		});
	}
}
