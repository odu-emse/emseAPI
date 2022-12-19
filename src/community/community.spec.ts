import {PrismaService} from "@/prisma.service";
import {CommunityResolver, CommunityService} from "@/community";

describe('Community', () => {
    let service: CommunityService;
    let resolver: CommunityResolver;
    let testingThreadID: string
    let prisma: PrismaService = new PrismaService()

    const pickRandomFromArray = (arr: any[]): number => {
        return Math.floor(Math.random() * arr.length);
    }

    const shuffle = str => [...str].sort(() => Math.random() - .5).join('');

    beforeEach(async () => {
        service = new CommunityService(prisma);
        resolver = new CommunityResolver(service);
    });

    afterEach(async () => {
        await prisma.$disconnect()
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
    it('should return an array of threads', async () => {
        const threads = await resolver.threads();
        expect(threads).toBeInstanceOf(Array);

        testingThreadID = threads[pickRandomFromArray(threads)].id;

        expect(threads[pickRandomFromArray(threads)].comments).toBeInstanceOf(Array);
        expect(threads[pickRandomFromArray(threads)].usersWatching).toBeInstanceOf(Array);
        expect(threads[pickRandomFromArray(threads)].author).toBeInstanceOf(Object);
    });
    //TODO: figure out how to test for error throwing
    //
    // it('should throw an error when ID is not found', async () => {
    //     const thread = await resolver.thread(shuffle(testingThreadID))
    //     expect(thread).toThrowError();
    // });
    it('should return the threads requested by ID', async () => {
        const thread = await resolver.thread(testingThreadID);
        expect(thread).toBeInstanceOf(Object);
        expect(thread.comments).toBeInstanceOf(Array);
        expect(thread.usersWatching).toBeInstanceOf(Array);
        expect(thread.author).toBeInstanceOf(Object);
    });
});


// const createModule = async (input: Prisma.ModuleCreateInput) => {
//   return await resolver.create(input);
// }
//
// const createCollection = async (input: CreateCollectionArgs) => {
//   return await resolver.createCollection(input);
// }
//
// const deleteModule = async (id: string) => {
//   return await prisma.module.delete({
//     where: { id },
//   });
// }
//
// const deleteCollection = async (id: string) => {
//   return await prisma.collection.delete({
//     where: { id },
//   });
// }
//
// const lessons = [
//   "639217c90482bbfb9aba86cc",
//   "639217e70482bbfb9aba86d0",
//   "639217e70482bbfb9aba86d1",
//   "639217e70482bbfb9aba86d2"
// ]
//
// let testingCollectionID: string;
// let testingModuleID: string;
//
// beforeAll(async () => {
//   service = new ProgramService(prisma);
//   resolver = new ProgramResolver(service);
//
//   const module = await createModule({
//     moduleName: "Test Module",
//     moduleNumber: 1,
//     duration: 1,
//     intro: "Test Intro",
//     numSlides: 1,
//     description: "Test Description",
//   })
//
//   testingModuleID = module.id;
//
//   const collection = await createCollection({
//     name: "Test Collection",
//     moduleID: testingModuleID,
//     lessons
//   })
//
//   testingCollectionID = collection.id;
// });
// afterAll(async () => {
//   await deleteCollection(testingCollectionID);
//   await deleteModule(testingModuleID);
//   prisma.$disconnect();
// })