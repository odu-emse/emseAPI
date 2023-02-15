import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {
    AnswerFields,
    CreateQuestion,
    CreateQuiz,
    UpdateQuiz,
    UpdateQuestion,
    QuestionFields,
    QuestionPoolFields,
    QuizFields, CreateAnswer, UpdateAnswer
} from "gql/graphql"
import {QuizService} from "@/quiz/quiz.service";

@Resolver()
export class QuizResolver {
    constructor(private readonly quizService: QuizService) {}
    @Query("quiz")
    async quiz(@Args("args") args: QuizFields) {
        return await this.quizService.quiz(args);
    }

    @Query("questionPool")
    async questionPool(@Args("args") args: QuestionPoolFields) {
        return await this.quizService.questionPool(args);
    }

    @Query("question")
    async question(@Args("args") args: QuestionFields) {
        return await this.quizService.question(args);
    }

    @Query("answer")
    async answer(@Args("args") args: AnswerFields) {
        return await this.quizService.answer(args);
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

    @Mutation("createQuestionPool")
    async createQuestionPool() {
        return await this.quizService.createQuestionPool();
    }

    @Mutation("deleteQuestionPool")
    async deleteQuestionPool(@Args("id") id: string) {
        return await this.quizService.deleteQuestionPool(id);
    }

    @Mutation("createQuestion")
    async createQuestion(@Args("input") input: CreateQuestion) {
        return await this.quizService.createQuestion(input);
    }

    @Mutation("updateQuestion")
    async updateQuestion(@Args("id") id: string, @Args("values") values: UpdateQuestion) {
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
    async updateAnswer(@Args("id") id: string, @Args("values") values: UpdateAnswer) {
        return await this.quizService.updateAnswer(id, values);
    }

    //TODO deleteAnswer()
    @Mutation("deleteAnswer")
    async deleteAnswer(@Args("id") id: string) {
        return await this.quizService.deleteAnswer(id);
    }
}
