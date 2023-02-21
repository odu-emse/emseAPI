import { QuizService } from './quiz.service';
import { PrismaService } from "@/prisma.service";
import {QuizResolver} from "@/quiz/quiz.resolver";
import {test, describe, expect, afterAll, beforeAll} from "vitest";
import {
  createAnswer,
  createCollection, createLesson,
  createModule, createQuestion,
  createQuiz, createRandomAnswer, createRandomCollection,
  createRandomLesson,
  createRandomQuestion,
  createRandomQuiz,
} from "../../utils";
import {ProgramResolver, ProgramService} from "@/program";

describe('Quiz Services', () => {
  // Init resolvers
  const prisma: PrismaService = new PrismaService();
  const service: QuizService = new QuizService(prisma);
  const resolver: QuizResolver =new QuizResolver(service);
  const progServ: ProgramService = new ProgramService(prisma);
  const progResolver: ProgramResolver = new ProgramResolver(progServ);
  // Make mock models for iting against
  let fakeModule;
  let fakeCollection;
  let fakeLesson;
  let fakePool;
  let fakeQuiz;
  let fakeQuestion;
  let fakeAnswer;

  // const poolsToDelete: string[] = [];

  afterAll(async () => {
    await progResolver.delete(fakeModule.id);
  })


  test('should be defined', () => {
    expect(service).toBeDefined();
    expect(resolver).toBeDefined();
  });

  test("should create mock dependencies", async () =>{
    fakeModule = await createModule(progResolver, {
      moduleName: "testing3",
      moduleNumber: 1003,
      description: "Stuff",
      duration: 10.0,
      intro: "Intro",
      keywords: ["Word", "other"],
      numSlides: 10
    })

    fakeCollection = await createCollection(progResolver, {
      name: "test",
      moduleID: fakeModule.id,
      positionIndex: 1
    });

    fakeLesson = await createLesson(progResolver, createRandomLesson(fakeCollection.id));
  })

  describe("Creates", () =>{
    describe("Mutation.createQuestionPool()", () => {
      test("should create a question pool", async () => {
        const count = (await resolver.questionPool({})).length;
        fakePool = await resolver.createQuestionPool();
        const endCount = (await resolver.questionPool({})).length;
        expect(fakePool).toBeDefined();
        expect(endCount).toEqual(count + 1);
      })
    })
    describe("Mutation.createQuiz()", () => {
      test("should create a new quiz", async () => {
        const quizData = createRandomQuiz(fakeLesson.id, fakePool.id);
        fakeQuiz = await createQuiz(resolver, quizData);
        if (fakeQuiz instanceof Error) throw new Error(fakeQuiz.message);
        expect(fakeQuiz).toBeDefined();
        expect(fakeQuiz.id).toBeDefined();
        expect(fakeQuiz.totalPoints).toEqual(quizData.totalPoints);
        expect(fakeQuiz.numQuestions).toEqual(quizData.numQuestions);
        expect(fakeQuiz.minScore).toEqual(quizData.minScore);
        expect(fakeQuiz.dueAt).toEqual(quizData.dueAt);
        expect(fakeQuiz.parentLessonID).toEqual(fakeLesson.id);
        expect(fakeQuiz.questionPoolID).toEqual(fakePool.id);
      })
    })
    describe("Mutation.createQuestion", ()=>{
      test("should create a question record", async () =>{
        const start = (await resolver.question({})).length;
        const questionData = createRandomQuestion(fakePool.id)
        fakeQuestion = await createQuestion(resolver, questionData);
        if (fakeQuestion instanceof Error) throw new Error(fakeQuestion.message);
        const final = (await resolver.question({})).length;
        expect(fakeQuestion).toBeDefined();
        expect(fakeQuestion.number).toEqual(questionData.number);
        expect(fakeQuestion.text).toEqual(questionData.text);
        expect(fakeQuestion.parentPoolID).toEqual(fakePool.id);
        expect(final).toEqual(start + 1);
      });
    })
    describe("Mutation.createAnswer", () =>{
      test("should create an Answer record", async () =>{
        const start = (await resolver.answer({})).length;
        const answerData = createRandomAnswer(fakeQuestion.id);
        fakeAnswer = await createAnswer(resolver, answerData);
        if (fakeAnswer instanceof Error) throw new Error(fakeAnswer.message);
        const end = (await resolver.answer({})).length;
        expect(fakeAnswer).toBeDefined();
        expect(fakeAnswer.text).toEqual(answerData.text);
        expect(fakeAnswer.correct).toEqual(answerData.correct);
        expect(fakeAnswer.weight).toEqual(answerData.weight);
        expect(fakeAnswer.index).toEqual(answerData.index);
        expect(fakeAnswer.parentQuestionID).toEqual(fakeQuestion.id);
        expect(end).toEqual(start + 1);
      });
    })
  })

  describe("Reads", () => {
    describe("Query.questionPool()", () =>{
      test("should return a list of questionPools", async () =>{
        const pools = await resolver.questionPool({});
        expect(pools).toBeDefined();
        expect(typeof pools).toBe(typeof []);
        expect(pools.length).toBeGreaterThanOrEqual(1);
        pools.map((pool) => {
          expect(pool.id).toBeDefined();
          expect(pool.questions).toBeDefined();
          expect(pool.quizzes).toBeDefined();
        })
      })
      test("should take less than 1.5 seconds to return all pools", async () =>{
        const begin = new Date();
        await resolver.questionPool({});
        const end = new Date();
        expect(end.getTime() - begin.getTime()).toBeLessThan(1500);
      })
      test("should return a single record given an ID", async() =>{
        const pools = await resolver.questionPool({id: fakePool.id});
        expect(pools).toBeDefined();
        expect(pools.length).toEqual(1);
        expect(typeof pools).toBe(typeof []);
        expect(pools[0].id).toEqual(fakePool.id);
      })
      // test("should return only matching records", async () => {
      //   const questions = [itQuestions[0].id, testQuestions[1].id]
      //   const pools = await resolver.questionPool({
      //     questions,
      //     quizzes: [itQuiz.id]
      //   })
      //   expect(pools).toBeDefined();
      //   expect(pools.length).toBeGreaterThanOrEqual(1);
      //   expect(typeof pools).toBe(typeof []);
      //   pools.map((pool) =>{
      //     //TODO Wrteste test condition for matching list records.
      //   })
      // })
    })
    describe("Query.quiz()", () => {
      test("should return a list of quizzes", async () => {
        const quizzes = await resolver.quiz({});
        expect(quizzes).toBeDefined();
        expect(typeof quizzes).toBe(typeof []);
        expect(quizzes.length).toBeGreaterThanOrEqual(1);
      })
      test("should return a single record given an ID", async () => {
        const quizzes = await resolver.quiz({id: fakeQuiz.id})
        expect(quizzes).toBeDefined();
        expect(quizzes.length).toEqual(1);
        expect(quizzes[0].id).toEqual(fakeQuiz.id);
      })
      test("should return only records that match parameters", async () => {
        const params = fakeQuiz;
        const quizzes = await resolver.quiz({
          totalPoints: fakeQuiz.totalPoints,
          dueAt: fakeQuiz.dueAt,
          numQuestions: fakeQuiz.numQuestions,
          minScore: fakeQuiz.minScore,
          parentLesson: fakeQuiz.parentLessonID,
          questionPool: fakeQuiz.questionPoolID
        });

        expect(quizzes).toBeDefined();
        quizzes.map((quiz) => {
          expect(quiz.totalPoints).toEqual(params.totalPoints);
          expect(quiz.dueAt).toEqual(params.dueAt);
          expect(quiz.numQuestions).toEqual(params.numQuestions);
          expect(quiz.minScore).toEqual(params.minScore);
          expect(quiz.parentLesson.id).toEqual(params.parentLessonID);
          expect(quiz.questionPool.id).toEqual(params.questionPoolID);
        })
      })
      test("should take less than 1.5 seconds to get all quizzes", async () =>{
        const start = new Date();
        const quizzes = await resolver.quiz({});
        const end = new Date();
        expect(quizzes).toBeDefined();
        expect(end.getTime() - start.getTime()).toBeLessThanOrEqual(1500);
      })

    })
    describe("Query.question()", () =>{
      test("should return a list of questions", async () =>{
        const questions = await resolver.question({});
        expect(questions).toBeDefined();
        expect(typeof questions).toBe(typeof []);
        expect(questions.length).toBeGreaterThanOrEqual(1);
      });
      test("should get a list in less than 1.5 seconds", async () =>{
        const start = new Date();
        const questions = await resolver.question({});
        const end = new Date();
        expect(questions).toBeDefined();
        expect(questions.length).toBeGreaterThanOrEqual(1);
        expect(end.getTime() - start.getTime()).toBeLessThanOrEqual(1500);
      });
      test("should get a single record given an ID", async () =>{
        const questions = await resolver.question({id: fakeQuestion.id});
        expect(questions).toBeDefined();
        expect(questions.length).toEqual(1);
        expect(questions[0].id).toEqual(fakeQuestion.id);
      });
      test("should get only matching records", async () => {
        const questions = await resolver.question({
          number: fakeQuestion.number,
          text: fakeQuestion.text,
          points: fakeQuestion.points,
          parentPool: fakeQuestion.parentPoolID,
        })
        expect(questions).toBeDefined();
        expect(questions.length).toBeGreaterThanOrEqual(1);
        questions.map((question) => {
          expect(question.number).toEqual(fakeQuestion.number);
          expect(question.text).toEqual(fakeQuestion.text);
          expect(question.parentPoolID).toEqual(fakeQuestion.parentPoolID);
          // TODO Write it condition for list parameters in query
          // expect(question.answers.includes(itAnswers[0].id)).toBeTruthy();
          expect(question.points).toEqual(fakeQuestion.points);
        })
      });
    })
    describe("Query.answer()", () =>{
      test("should return a list of answers", async () => {
        const answers = await resolver.answer({});
        expect(answers).toBeDefined();
        expect(typeof answers).toBe(typeof []);
        expect(answers.length).toBeGreaterThanOrEqual(1);
      });
      test("should return all answers in less than 1.5s", async () =>{
        const start = new Date();
        const answers = await resolver.answer({});
        const end = new Date();
        expect(answers).toBeDefined();
        expect(answers.length).toBeGreaterThanOrEqual(1);
        expect(end.getTime() - start.getTime()).toBeLessThan(1500);
      });
      test("should return a single answer given ID", async () =>{
        const answers = await resolver.answer({id: fakeAnswer.id});
        expect(answers).toBeDefined();
        expect(answers.length).toEqual(1);
        expect(answers[0].id).toEqual(fakeAnswer.id);
      });
      test("should return only matching records", async () =>{
        const answers = await resolver.answer({
          text: fakeAnswer.text,
          correct: fakeAnswer.correct,
          weight: fakeAnswer.weight,
          index: fakeAnswer.index,
          parentQuestion: fakeAnswer.parentQuestionID
        });
        expect(answers).toBeDefined();
        expect(typeof answers).toBe(typeof []);
        answers.map((answer) =>{
          expect(answer.text).toEqual(fakeAnswer.text);
          expect(answer.correct).toEqual(fakeAnswer.correct);
          expect(answer.weight).toEqual(fakeAnswer.weight);
          expect(answer.index).toEqual(fakeAnswer.index);
          expect(answer.parentQuestionID).toEqual(fakeAnswer.parentQuestionID);
        })
      });
    })
  })

  describe("Updates", () => {
    describe("Mutation.updateQuiz()", () =>{
      test("should update all specified fields", async () =>{
        const otherLesson = await createLesson(progResolver, createRandomLesson(fakeCollection.id));
        if (otherLesson instanceof Error) throw new Error(otherLesson.message);
        const otherPool = await resolver.createQuestionPool();
        const quizData = createRandomQuiz();
        const updatedQuiz = await resolver.updateQuiz(fakeQuiz.id, {
          totalPoints: quizData.totalPoints,
          numQuestions: quizData.numQuestions,
          minScore: quizData.minScore,
          parentLesson: otherLesson.id,
          questionPool: otherPool.id,
          dueAt: quizData.dueAt
        });
        expect(updatedQuiz).toBeDefined();
        expect(updatedQuiz.totalPoints).toEqual(quizData.totalPoints);
        expect(updatedQuiz.numQuestions).toEqual(quizData.numQuestions);
        expect(updatedQuiz.minScore).toEqual(quizData.minScore);
        expect(updatedQuiz.parentLesson.id).toEqual(otherLesson.id);
        expect(updatedQuiz.questionPool.id).toEqual(otherPool.id);
        expect(updatedQuiz.dueAt).toEqual(quizData.dueAt);

      })
    })
    describe("Mutation.updateQuestion", ()=>{
      test("should update only specified fields", async () => {
        const newPool = await resolver.createQuestionPool();
        const questionData = createRandomQuestion();
        const updated = await resolver.updateQuestion(fakeQuestion.id, {
          number: questionData.number,
          text: questionData.text,
          parentPool: newPool.id
        });
        expect(updated).toBeDefined();
        expect(updated.number).toEqual(questionData.number);
        expect(updated.text).toEqual(questionData.text);
        expect(updated.parentPoolID).toEqual(newPool.id);
      });

    })
    describe("Mutation.updateAnswer", () => {
      test("should update only matching fields", async () => {
        const questionData = createRandomQuestion(fakePool.id);
        const question = await createQuestion(resolver, questionData);
        if (question instanceof Error) throw new Error(question.message);
        const answerData = createRandomAnswer();
        console.log(fakeAnswer.id, question.id);
        const update = await resolver.updateAnswer(fakeAnswer.id, {
          text: answerData.text,
          correct: answerData.correct,
          weight: answerData.weight,
          index: answerData.index,
          parentQuestion: question.id
        });
        expect(update).toBeDefined();
        expect(update.text).toEqual(answerData.text);
        expect(update.correct).toEqual(answerData.correct);
        expect(update.weight).toEqual(answerData.weight);
        expect(update.index).toEqual(answerData.index);
        expect(update.parentQuestionID).toEqual(question.id);
      });
    })

  })

  describe("Deletes", () =>{
    describe("Mutation.deleteAnswer", () => {
      test("should delete an Answer record", async () =>{
        const deleted = await resolver.deleteAnswer(fakeAnswer.id);
        expect(deleted).toBeDefined();
        expect(deleted.id).toEqual(fakeAnswer.id);
      });
    })
    describe("Mutation.deleteQuestion", ()=>{
      test("should delete a question record",async () => {
        const deleted = await resolver.deleteQuestion(fakeQuestion.id);
        expect(deleted).toBeDefined();
        expect(deleted.id).toEqual(fakeQuestion.id);
      });
      test("should delete all child answers", async () =>{
        fakeQuestion.answers.map(async (answer) => {
          const answers = await resolver.answer({id: answer.id});
          expect(answers).toBeDefined();
          expect(typeof answers).toBe(typeof []);
          expect(answers.length).toEqual(0);
        })
      });

    })
    describe("Mutation.deleteQuiz()", () => {
      test("should delete a quiz record", async () => {
        await resolver.deleteQuiz(fakeQuiz.id);
        const quizCheck = await resolver.quiz({id: fakeQuiz.id});
        expect(quizCheck.length).toEqual(0);
      })
    })
    describe("Mutation.deleteQuestionPool()", () => {
      let pools;
      test("should delete a questionPool", async () => {
        pools = await resolver.questionPool({id: fakePool.id});
        const deleted = await resolver.deleteQuestionPool(fakePool.id);
        expect(deleted).toBeDefined();
        expect(deleted.id).toEqual(fakePool.id);
      });
      test("should delete all child Quizzes", async () => {
        pools[0].quizzes.map(async (quiz) => {
          const quizzes = await resolver.quiz({id: quiz.id});
          expect(quizzes).toBeDefined();
          expect(typeof quizzes).toBe(typeof []);
          expect(quizzes.length).toEqual(0);
        })
      });
      test("should delete all child Questions", async () => {
        pools[0].questions.map(async (question) => {
          const questions = await resolver.question({id: question.id});
          expect(questions).toBeDefined();
          expect(typeof questions).toBe(typeof []);
          expect(questions.length).toEqual(0);
        })
      });
    })

  })
});
