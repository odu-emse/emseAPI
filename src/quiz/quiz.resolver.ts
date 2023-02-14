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
        return this.quizService.createQuiz(input);
    }

    @Mutation("updateQuiz")
    async updateQuiz(@Args("seletors") id: string, @Args("values") values: UpdateQuiz) {
        return this.quizService.updateQuiz(id, values);
    }

    @Mutation("deleteQuiz")
    async deleteQuiz(@Args("id") id: string) {
        return this.quizService.deleteQuiz(id);
    }

    //TODO: createQuestionPool();
    @Mutation("createQuestionPool")
    async createQuestionPool() {
        return;
    }

    //TODO deleteQuestionPool()
    @Mutation("deleteQuestionPool")
    async deleteQuestionPool(@Args("id") id: string) {
        return;
    }

    //TODO createQuestion()
    @Mutation("createQuestion")
    async createQuestion(@Args("input") input: CreateQuestion) {
        return;
    }

    //TODO updateQuestion()
    @Mutation("updateQuestion")
    async updateQuestion(@Args("selectors") id: string, @Args("values") values: UpdateQuestion) {
        return;
    }

    //TODO deleteQuestion()
    @Mutation("deleteQuestion")
    async deleteQuestion(@Args("id") id: string) {
        return;
    }

    //TODO createAnswer()
    @Mutation("createAnswer")
    async createAnswer(@Args("input") input: CreateAnswer) {
        return;
    }

    //TODO updateAnswer()
    @Mutation("updateAnswer")
    async updateAnswer(@Args("selector") id: string, @Args("values") values: UpdateAnswer) {
        return;
    }

    //TODO deleteAnswer()
    @Mutation("deleteAnswer")
    async deleteAnswer(@Args("id") id: string) {
        return;
    }
}
