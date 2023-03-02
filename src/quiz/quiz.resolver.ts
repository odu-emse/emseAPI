import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
	AnswerFields,
	CreateQuestion,
	CreateQuiz,
	UpdateQuiz,
	UpdateQuestion,
	QuestionFields,
	QuizFields,
	CreateAnswer,
	UpdateAnswer,
	QuizResultFields,
	QuizSubmission
} from "gql/graphql";
import { QuizService } from "@/quiz/quiz.service";

@Resolver()
export class QuizResolver {
	constructor(private readonly quizService: QuizService) {}
	@Query("quiz")
	async quiz(@Args("args") args: QuizFields) {
		return await this.quizService.quiz(args);
	}

	@Query("question")
	async question(@Args("args") args: QuestionFields) {
		return await this.quizService.question(args);
	}

	@Query("answer")
	async answer(@Args("args") args: AnswerFields) {
		return await this.quizService.answer(args);
	}

	@Query("quizResult")
	async quizResult(@Args("args") args: QuizResultFields) {
		return await this.quizService.quizResult(args);
	}

	@Mutation("createQuiz")
	async createQuiz(@Args("input") input: CreateQuiz) {
		return await this.quizService.createQuiz(input);
	}

	@Mutation("updateQuiz")
	async updateQuiz(@Args("id") id: string, @Args("values") values: UpdateQuiz) {
		return await this.quizService.updateQuiz(id, values);
	}

	@Mutation("deleteQuiz")
	async deleteQuiz(@Args("id") id: string) {
		return await this.quizService.deleteQuiz(id);
	}

	@Mutation("createQuestion")
	async createQuestion(@Args("input") input: CreateQuestion) {
		return await this.quizService.createQuestion(input);
	}

	@Mutation("updateQuestion")
	async updateQuestion(
		@Args("id") id: string,
		@Args("values") values: UpdateQuestion
	) {
		return await this.quizService.updateQuestion(id, values);
	}

	@Mutation("deleteQuestion")
	async deleteQuestion(@Args("id") id: string) {
		return await this.quizService.deleteQuestion(id);
	}

	@Mutation("createAnswer")
	async createAnswer(@Args("input") input: CreateAnswer) {
		return await this.quizService.createAnswer(input);
	}

	@Mutation("updateAnswer")
	async updateAnswer(
		@Args("id") id: string,
		@Args("values") values: UpdateAnswer
	) {
		return await this.quizService.updateAnswer(id, values);
	}
	@Mutation("deleteAnswer")
	async deleteAnswer(@Args("id") id: string) {
		return await this.quizService.deleteAnswer(id);
	}

	@Mutation("submitQuiz")
	async submitQuiz(@Args("input") input: QuizSubmission) {
		return await this.quizService.submitQuiz(input);
	}

	@Mutation("updateQuizScore")
	async updateQuizScore(
		@Args("id") id: string,
		@Args("newScore") newScore: number
	) {
		return await this.quizService.updateQuizScore(id, newScore);
	}

	@Mutation("deleteQuizResult")
	async deleteQuizResult(@Args("id") id: string) {
		return await this.quizService.deleteQuizResult(id);
	}
}
