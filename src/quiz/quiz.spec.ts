import { QuizService } from './quiz.service';
import { PrismaService } from "@/prisma.service";
import {QuizResolver} from "@/quiz/quiz.resolver";
import {test, describe, expect} from "vitest";

describe('Quiz Services', () => {
  let service: QuizService;
  let resolver: QuizResolver;
  const testLessonID = "63e1448dbfa8ce2464890a0d"
  const prisma: PrismaService = new PrismaService();
  let testQuiz
  let testPool
  let testQuestions = []
  let testAnswers = []

  beforeAll(async() => {
    service = new QuizService(prisma);
    resolver = new QuizResolver(service);
    testPool = await resolver.createQuestionPool();
    testQuiz = await resolver.createQuiz({
      totalPoints: 0.0,
      numQuestions: 4,
      minScore: 0.0,
      parentLesson: testLessonID,
      questionPool: testPool.id,
      dueAt: new Date()
    })
    testQuestions.push(await resolver.createQuestion(testPool.id));
    testQuestions.push(await resolver.createQuestion(testPool.id));
    testAnswers.push(await resolver.createAnswer({
      text: "Some Text",
      correct: false,
      parentQuestion: testQuestions[0].id
    }));
  });

  afterAll(async() =>{
    await resolver.deleteQuestionPool(testPool.id);
  })

  test('should be defined', () => {
    expect(service).toBeDefined();
    expect(resolver).toBeDefined();
  });

  //Quiz Tests
  describe("Quiz Model", () => {
    describe("Query.quiz()", () => {
      it("should return a list of quizzes", async () => {
        const quizzes = await resolver.quiz({});
        expect(quizzes).toBeDefined();
        expect(quizzes.length).toBeGreaterThanOrEqual(1);
        expect(typeof quizzes).toBe(typeof []);
        quizzes.map((quiz) => {
          expect(quiz.id).toBeDefined();
          expect(quiz.totalPoints).toBeDefined();
          expect(quiz.dueAt).toBeDefined();
          expect(quiz.numQuestions).toBeDefined();
          expect(quiz.minScore).toBeDefined();
          expect(quiz.parentLesson).toBeDefined();
          expect(quiz.questionPool).toBeDefined();
        })
      })
      it("should return a single record given an ID", async () => {
        const searchQuiz = await resolver.createQuiz({
          totalPoints: 10.0,
          numQuestions: 10,
          minScore: 5.0,
          parentLesson: testLessonID,
          questionPool: testPool.id,
          dueAt: new Date()
        });
        const quizzes = await resolver.quiz({id: searchQuiz.id})
        expect(quizzes).toBeDefined();
        expect(quizzes.length).toEqual(1);
        quizzes.map((quiz) => {
          expect(quiz.id).toEqual(searchQuiz.id);
          expect(quiz.totalPoints).toEqual(searchQuiz.totalPoints);
          expect(quiz.dueAt).toEqual(searchQuiz.dueAt);
          expect(quiz.numQuestions).toEqual(searchQuiz.numQuestions);
          expect(quiz.minScore).toBe(searchQuiz.minScore);
          expect(quiz.parentLesson.id).toBe(searchQuiz.parentLessonID);
          expect(quiz.questionPool.id).toBe(searchQuiz.questionPoolID);
        })
        await resolver.deleteQuiz(searchQuiz.id);
      })
      it("should return only records that match parameters", async () => {
        const quizzes = await resolver.quiz({
          id: testQuiz.id,
          totalPoints: testQuiz.totalPoints,
          dueAt: testQuiz.dueAt,
          numQuestions: testQuiz.numQuestions,
          minScore: testQuiz.minScore,
          parentLesson: testQuiz.parentLessonID,
          questionPool: testQuiz.questionPoolID
        });
        expect(quizzes).toBeDefined();
        quizzes.map((quiz) => {
          expect(quiz.id).toEqual(testQuiz.id);
          expect(quiz.totalPoints).toEqual(testQuiz.totalPoints);
          expect(quiz.dueAt).toEqual(testQuiz.dueAt);
          expect(quiz.numQuestions).toEqual(testQuiz.numQuestions);
          expect(quiz.minScore).toEqual(testQuiz.minScore);
          expect(quiz.parentLesson.id).toEqual(testQuiz.parentLessonID);
          expect(quiz.questionPool.id).toEqual(testQuiz.questionPoolID);
        })
      })
      // TODO: Add time check test case

    })
    describe("Mutation.createQuiz()", () => {
      it("should create a new quiz", async () => {
        const date = new Date();
        const quiz = await resolver.createQuiz({
          totalPoints: 0.0,
          numQuestions: 1,
          minScore: 0.0,
          parentLesson: testLessonID,
          questionPool: testPool.id,
          dueAt: date
        });
        expect(quiz).toBeDefined();
        expect(quiz.id).toBeDefined();
        expect(quiz.totalPoints).toEqual(0.0);
        expect(quiz.numQuestions).toEqual(1);
        expect(quiz.minScore).toEqual(0.0);
        expect(quiz.dueAt).toEqual(date);
        expect(quiz.parentLessonID).toEqual(testLessonID);
        expect(quiz.questionPoolID).toEqual(testPool.id);
        await resolver.deleteQuiz(quiz.id);
      })
    })
    describe("Mutation.updateQuiz()", () =>{
      it("should update only specified fields", async () =>{
        const updatedQuiz = await resolver.updateQuiz(testQuiz.id, {
          minScore: 1.0
        });
        expect(updatedQuiz).toBeDefined();
        expect(updatedQuiz.id).toEqual(testQuiz.id);
        expect(updatedQuiz.totalPoints).toEqual(testQuiz.totalPoints);
        expect(updatedQuiz.numQuestions).toEqual(testQuiz.numQuestions);
        expect(updatedQuiz.minScore).toEqual(1.0);
        expect(updatedQuiz.parentLesson.id).toEqual(testQuiz.parentLessonID);
        expect(updatedQuiz.questionPool.id).toEqual(testQuiz.questionPoolID);
        expect(updatedQuiz.dueAt).toEqual(testQuiz.dueAt);
      })
      it("should only update one record", async ()=> {
        const quiz = await resolver.createQuiz({
          totalPoints: 0.0,
          numQuestions: 4,
          minScore: 0.0,
          parentLesson: testLessonID,
          questionPool: testPool.id,
          dueAt: new Date()
        })
        const updated = await resolver.updateQuiz(quiz.id, {
          totalPoints: 4.0
        })
        expect(updated).toBeDefined();
        expect(updated.totalPoints).toEqual(4.0);
        expect(testQuiz.totalPoints).not.toEqual(4.0);
        await resolver.deleteQuiz(quiz.id);
      })
    })
    describe("Mutation.deleteQuiz()", () => {
      it("should delete a quiz record", async () => {
        const quiz = await resolver.createQuiz({
          totalPoints: 0.0,
          numQuestions: 1,
          minScore: 0.0,
          parentLesson: testLessonID,
          questionPool: testPool.id,
          dueAt: new Date()
        })
        const deleted = await resolver.deleteQuiz(quiz.id);
        expect(deleted).toBeDefined();
        expect(deleted.id).toEqual(quiz.id);
        const quizCheck = await resolver.quiz({id: deleted.id});
        expect(quizCheck.length).toEqual(0);
      })
      it("should delete only one quiz record", async () =>{
        const quiz = await resolver.createQuiz({
          totalPoints: 0.0,
          numQuestions: 1,
          minScore: 0.0,
          parentLesson: testLessonID,
          questionPool: testPool.id,
          dueAt: new Date()
        })
        const count = (await resolver.quiz({})).length;
        expect(count).toBeDefined();
        expect(count).toBeGreaterThanOrEqual(2);
        await resolver.deleteQuiz(quiz.id);
        const newCount = (await resolver.quiz({})).length;
        expect(newCount).toBeDefined();
        expect(newCount).toEqual(count - 1);
      });
    })
  })

  //QuestionPool Tests
  describe("QuestionPool Model", () => {
    describe("Query.questionPool()", () =>{
      it("should return a list of questionPools", async () =>{
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
      it("should take less than 1.5 seconds to return all pools", async () =>{
        const begin = new Date();
        await resolver.questionPool({});
        const end = new Date();
        expect(end.getTime() - begin.getTime()).toBeLessThan(1500);
      })
      it("should return a single record given an ID", async() =>{
        const pools = await resolver.questionPool({id: testPool.id});
        expect(pools).toBeDefined();
        expect(pools.length).toEqual(1);
        expect(typeof pools).toBe(typeof []);
        expect(pools[0].id).toEqual(testPool.id);

      })
      it("should return only matching records", async () => {
        const questions = [testQuestions[0].id, testQuestions[1].id]
        const pools = await resolver.questionPool({
          questions,
          quizzes: [testQuiz.id]
        })
        expect(pools).toBeDefined();
        expect(pools.length).toBeGreaterThanOrEqual(1);
        expect(typeof pools).toBe(typeof []);
        pools.map((pool) =>{
          questions.map((question) =>{
            expect(pool.questions.includes(question.id)).toBeTruthy();
          })
          expect(pool.quizzes.includes(testQuiz.id)).toBeTruthy();
        })
      })
    })
    describe("Mutation.createQuestionPool()", () => {
      it("should create a question pool", async () => {
        const count = (await resolver.questionPool({})).length;
        const pool = await resolver.createQuestionPool();
        const endCount = (await resolver.questionPool({})).length;
        expect(pool).toBeDefined();
        expect(endCount).toEqual(count + 1);
      })
    })
    describe("Mutation.deleteQuestionPool()", () => {
      it("should delete a questionPool", async () => {
        const toDelete = await resolver.createQuestionPool();
        const startCount = (await resolver.questionPool({})).length;
        const deleted = await resolver.deleteQuestionPool(toDelete.id);
        const endCount = (await resolver.questionPool({})).length;
        expect(deleted).toBeDefined();
        expect(deleted.id).toEqual(toDelete.id);
        expect(endCount).toEqual(startCount + 1);
      });
      it("should delete all child Quizzes", async () => {
        const toDelete = await resolver.createQuestionPool();
        await resolver.createQuiz({
          totalPoints: 0.0,
          numQuestions: 4,
          parentLesson: testLessonID,
          questionPool: toDelete.id,
          dueAt: new Date()
        })
        await resolver.createQuiz({
          totalPoints: 5.0,
          numQuestions: 5,
          parentLesson: testLessonID,
          questionPool: toDelete.id,
          dueAt: new Date()
        })
        const deleted = await resolver.deleteQuestionPool(toDelete.id);
        expect(deleted).toBeDefined();
        deleted.quizzes.map(async (quiz) => {
          const quizzes = await resolver.quiz({id: quiz.id});
          expect(quizzes).toBeDefined();
          expect(typeof quizzes).toBe(typeof []);
          expect(quizzes.length).toEqual(0);
        })
      });
      it("should delete all child Questions", async () => {
        const toDelete = await resolver.createQuestionPool();
        await resolver.createQuestion(toDelete.id);
        await resolver.createQuestion(toDelete.id);
        const deleted = await resolver.deleteQuestionPool(toDelete.id);
        expect(deleted).toBeDefined();

        deleted.questions.map(async (question) => {
          const questions = await resolver.question({id: question.id});
          expect(questions).toBeDefined();
          expect(typeof questions).toBe(typeof []);
          expect(questions.length).toEqual(0);
        })
      });
    })
  })

  //Question Tests
  describe("Question Model", () => {
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
        const questions = await resolver.question({id: testQuestions[0].id});
        expect(questions).toBeDefined();
        expect(questions.length).toEqual(1);
        expect(questions[0].id).toEqual(testQuestions[0].id);
      });
      test("should get only matching records", async () => {
        const questions = await resolver.question({
          number: 1,
          text: "This is a question",
          parentPool: testPool.id,
          answers: [testAnswers[0].id],
          points: 1.0,
        })
        expect(questions).toBeDefined();
        expect(questions.length).toBeGreaterThan(1);
        questions.map((question) => {
          expect(question.number).toEqual(1);
          expect(question.text).toEqual("This is a question");
          expect(question.parentPoolID).toEqual(testPool.id);
          expect(question.answers.includes(testAnswers[0].id)).toBeTruthy();
          expect(question.points).toEqual(1.0);
        })
      });
    })
    describe("Mutation.createQuestion", ()=>{
      test("should create a question record", async () =>{
        const start = (await resolver.question({})).length;
        const created = await resolver.createQuestion({
          number: 1,
          text: "Some question data",
          parentPool: testPool.id
        });
        const final = (await resolver.question({})).length;
        expect(created).toBeDefined();
        expect(created.number).toEqual(1);
        expect(created.text).toEqual("Some question data");
        expect(created.parentPoolID).toEqual(testPool.id);
        expect(final).toEqual(start + 1);
        await resolver.deleteQuestion(created.id);
      });
    })
    describe("Mutation.updateQuestion", async ()=>{
      const newPool = await resolver.createQuestionPool();
      const question = await resolver.createQuestion({
        number: 1,
        text: "Some question data",
        parentPool: testPool.id
      });
      const updated = await resolver.updateQuestion(question.id, {
        number: 2,
        text: "Different text",
        parentPool: newPool.id
      });
      test("should update only specified fields", () => {
        expect(updated).toBeDefined();
        expect(updated.number).toEqual(2);
        expect(updated.text).toEqual("Different text");
        expect(updated.parentPoolID).toEqual(newPool.id);
      });
      it("should only update one record", () =>{
        expect(updated.number).not.toEqual(question.number);
        expect(updated.text).not.toEqual(question.text);
        expect(updated.parentPoolID).not.toEqual(question.parentPoolID);
      });
      await resolver.deleteQuestion(question.id);
      await resolver.deleteQuestionPool(newPool.id);
    })
    describe("Mutation.deleteQuestion", async ()=>{
      const toDelete = await resolver.createQuestion({
        number: 1,
        text: "Some question data",
        parentPool: testPool.id
      });
      const startCount = (await resolver.question({})).length;
      const deleted = await resolver.deleteQuestion(toDelete.id);
      test("should delete a question record",() => {
        expect(deleted).toBeDefined();
        expect(deleted.id).toEqual(toDelete.id);
      });
      test("should delete only one question record", async () => {
        const endCount = (await resolver.question({})).length;
        expect(endCount).toEqual(startCount - 1);
      });
      test("should delete all child answers", () =>{
        deleted.answers.map(async (answer) => {
          const answers = await resolver.answer({id: answer.id});
          expect(answers).toBeDefined();
          expect(typeof answers).toBe(typeof []);
          expect(answers.length).toEqual(0);
        })
      });

    })
  })

  //Answer Tests
  describe("Answer Model", () => {
    describe("Query.answer()", () =>{
      test("should return a list of answers", async () => {
        const answers = await resolver.answer({});
        expect(answers).toBeDefined();
        expect(typeof answers).toBe(typeof []);
        expect(answers.length).toBeGreaterThan(2);
      });
      test("should return all answers in less than 1.5s", async () =>{
        const start = new Date();
        const answers = await resolver.answer({});
        const end = new Date();
        expect(answers).toBeDefined();
        expect(answers.length).toBeGreaterThanOrEqual(1);
        expect(end.getTime() - start.getTime()).toBeLessThan(1500);
      });
      it("should return a single answer given ID", async () =>{
        const answers = await resolver.answer({id: testAnswers[0].id});
        expect(answers).toBeDefined();
        expect(answers.length).toEqual(1);
        expect(answers[0].id).toEqual(testAnswers[0].id);
      });
      it("should return only matching records", async () =>{
        const testAnswer = await resolver.createAnswer({
          text: "Stuff",
          correct: true,
          parentQuestion: testQuestions[1].id;
        })
        const answers = await resolver.answer({
          text: testAnswer.text,
          correct: testAnswer.correct,
          parentQuestion: testAnswer.parentQuestionID
        })
        expect(answers).toBeDefined();
        expect(typeof answers).toBe(typeof []);
        answers.map((answer) =>{
          expect(answer.text).toEqual(testAnswer.text);
          expect(answer.correct).toEqual(testAnswer.correct);
          expect(answer.parentQuestionID).toEqual(testAnswer.parentQuestionID);
        })
        await resolver.deleteAnswer(testAnswer.id);
      });
    })
    describe("Mutation.createAnswer", () =>{
      test("should create an Answer record", async () =>{
        const start = (await resolver.answer({})).length;
        const created = await resolver.createAnswer({
          text: "Answer",
          correct: false,
          weight: 1.0,
          index: "A",
          parentQuestion: testQuestions[0].id
        });
        const end = (await resolver.answer({})).length;
        expect(created).toBeDefined();
        expect(created.text).toEqual("Answer");
        expect(created.correct).toBeFalsy();
        expect(created.weight).toEqual(1.0);
        expect(created.index).toEqual("A");
        expect(created.parentQuestionID).toEqual(testQuestions[0].id);
        expect(end).toEqual(start + 1);
        await resolver.deleteAnswer(created.id);
      });
    })
    describe("Mutation.updateAnswer", async () =>{
      const toUpdate = await resolver.createAnswer({
        text: "Answer",
        correct: false,
        weight: 1.0,
        index: "A",
        parentQuestion: testQuestions[0].id
      });
      const update = await resolver.updateAnswer(toUpdate.id, {
        text: "Text",
        correct: true,
        weight: 2.0,
        index: "B",
        parentQuestion: testQuestions[1].id
      });
      expect(update).toBeDefined();
      test("should update only matching fields", () => {
        expect(update.text).toEqual("Text");
        expect(update.correct).toBeTruthy();
        expect(update.weight).toEqual(2.0);
        expect(update.index).toEqual("B");
        expect(update.parentQuestionID).toEqual(testQuestions[1].id);
      });
      await resolver.deleteAnswer(toUpdate.id);
    })
    describe("Mutation.deleteAnswer", async () => {
      const toDelete = await resolver.createAnswer({
        text: "Answer",
        correct: false,
        weight: 1.0,
        index: "A",
        parentQuestion: testQuestions[0].id
      })
      const start = (await resolver.answer({})).length;
      const deleted = await resolver.deleteAnswer(toDelete.id);

      test("should delete an Answer record", () =>{
        expect(deleted).toBeDefined();
        expect(deleted.id).toEqual(toDelete.id);
      });
      test("should only delete one record", async () => {
        const end = (await resolver.answer({})).length;
        expect(end).toEqual(start - 1);
      });
    })
  })
});
