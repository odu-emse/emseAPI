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

@Resolver()
export class QuizResolver {

    @Query("quiz")
    async quiz(@Args("input") input: QuizFields) {
        return;
    }

    @Query("questionPool")
    async questionPool(@Args("input") input: QuestionPoolFields) {
        return;
    }

    @Query("question")
    async question(@Args("input") input: QuestionFields) {
        return;
    }

    @Query("answer")
    async answer(@Args("input") input: AnswerFields) {
        return;
    }

    @Mutation("createQuiz")
    async createQuiz(@Args("input") input: CreateQuiz) {
        return;
    }

    @Mutation("updateQuiz")
    async updateQuiz(@Args("input") input: UpdateQuiz) {
        return;
    }

    @Mutation("deleteQuiz")
    async deleteQuiz(@Args("id") id: string) {
        return;
    }

    @Mutation("createQuestionPool")
    async createQuestionPool() {
        return;
    }

    @Mutation("deleteQuestionPool")
    async deleteQuestionPool(@Args("id") id: string) {
        return;
    }

    @Mutation("createQuestion")
    async createQuestion(@Args("input") input: CreateQuestion) {
        return;
    }

    @Mutation("updateQuestion")
    async updateQuestion(@Args("selectors") selectors: QuestionFields, @Args("values") values: UpdateQuestion) {
        return;
    }

    @Mutation("deleteQuestion")
    async deleteQuestion(@Args("id") id: string) {
        return;
    }

    @Mutation("createAnswer")
    async createAnswer(@Args("input") input: CreateAnswer) {
        return;
    }

    @Mutation("updateAnswer")
    async updateAnswer(@Args("selector") selector: AnswerFields, @Args("values") values: UpdateAnswer) {
        return;
    }

    @Mutation("deleteAnswer")
    async deleteAnswer(@Args("id") id: string) {
        return;
    }
}
