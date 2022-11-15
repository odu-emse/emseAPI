import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";
import { getPrismaClient } from "@prisma/client/runtime";
import { Error, Social, User } from "dist/gql/graphql";

let testingUserDocumentID: string;
let testingTwitterURL: string;
let testingGithubURL:string;
let testingLinkedInURL:string;
let testingFacebookURL: string;
let testingPortfolioURL: string;


describe("Query.Social()", () => {
    let service: UserService;
	let resolver: UserResolver;
	let prisma: PrismaService;
    let jwtService: JwtService
	prisma = new PrismaService();
    let instructorProfileid= ""
    let userid=""
    let documentId = "62966864bd7f125c4df63c11"
    let updateUser=""
    let NewUser = ""
    let InstrctorProfileInput=""
    let SocialInput=""
    let user=""
    let input=""

    beforeEach(async () => {
		service = new UserService(prisma, jwtService);
		resolver = new UserResolver(service);
	});
    
    it("should return user social Url", async () => {
        const social = await resolver.social(documentId);
        expect(social).toBeDefined();
        expect(social!.id).toBeDefined();
        expect(social!.twitter).toBeDefined();
        expect(social!.github).toBeDefined();
        expect(social!.linkedin).toBeDefined();
        expect(social!.facebook).toBeDefined();
        expect(social!.portfolio).toBeDefined();
    });
    describe("Query.instructorProfile()", () =>{
        it("should return Instructor Profile",async () =>{
            const instructorProfile = await resolver.instructorProfile(instructorProfileid); 
            expect(instructorProfile).toBeDefined();
            expect(instructorProfile!.id).toBeDefined();
            expect(instructorProfile!.account).toBeDefined();
            expect(instructorProfile!.title).toBeDefined();
            expect(instructorProfile!.officeLocation).toBeDefined();
            expect(instructorProfile!.officeHours).toBeDefined();
            expect(instructorProfile!.contactPolicy).toBeDefined();
            expect(instructorProfile!.phone).toBeDefined();
            expect(instructorProfile!.background).toBeDefined();
            expect(instructorProfile!.researchInterest).toBeDefined();
            expect(instructorProfile!.selectedPapersAndPublications).toBeDefined();
            expect(instructorProfile!.personalWebsite).toBeDefined();
            expect(instructorProfile!.philosophy).toBeDefined();
        });

    });
    describe("Query.User()",() =>{
        it("should return User", async () =>{
            const user = await resolver.user(userid);
            expect(user).toBeDefined();
            expect(user!.id).toBeDefined();
            expect(user!.email).toBeDefined();
            expect(user!.firstName).toBeDefined();
            expect(user!.lastName).toBeDefined();
            expect(user!.isActive).toBeDefined();
            expect(user!.dob).toBeDefined();
        });
    });
    describe("Query.updateUser()",() =>{
        it("should return updateUser", async ()=>{
            //@ts-ignore
            const UpdateUser: User = await resolver.update({
                openID:"",
                id:userid,
                email:"test@gmail.com",
                picURL:"",
                firstName:"",
                lastName:"",
                middleName:""
            })
                expect(UpdateUser).toBeDefined();
                expect(UpdateUser!.id).toBeDefined();
                expect(UpdateUser!.email).toBeDefined();
                expect(UpdateUser!.firstName).toBeDefined();
                expect(UpdateUser!.lastName).toBeDefined();
                expect(UpdateUser!.dob).toBeDefined();
                expect(UpdateUser!.isAdmin).toBeDefined();
                // expect(UpdateUser!.instrctorProfile).toBeDefined(); 
        });  
               
                //query socail(returning the social row)
                
        });
        describe("Query.deleteUser()",() =>{
            it("should return deleteUser", async ()=>{
                //@ts-ignore
                const DeleteUser: User = await resolver.delete({
                    openID:"",
                    id:userid,
                    email:"test@gmail.com",
                    picURL:"",
                    firstName:"",
                    lastName:"",
                    middleName:""
                })
                    expect(DeleteUser).toBeDefined();
                    expect(DeleteUser!.id).toBeDefined();
                    expect(DeleteUser!.email).toBeDefined();
                    expect(DeleteUser!.firstName).toBeDefined();
                    expect(DeleteUser!.lastName).toBeDefined();
                    expect(DeleteUser!.dob).toBeDefined();
                    expect(DeleteUser!.isAdmin).toBeDefined();
            });
        });
        describe("Query.addSocial()",() =>{
            it("should return addSocial", async ()=>{
                const addSocial: User = await resolver.addSocial(user,{
                    twitter: '',
    github: '',
    linkedin: '',
    facebook: '',
    portfolio: ''
                })
                    expect(SocialInput).toBeDefined();
                    expect(SocialInput!.twitter).toBeDefined();
                    expect(SocialInput!.github).toBeDefined();
                    expect(SocialInput!.linkedin).toBeDefined();
                    expect(SocialInput!.facebook).toBeDefined();
                    expect(SocialInput!.portfolio).toBeDefined();
        });});
        describe("Query.deleteSocial()",() =>{
            it("should return deleteSocial", async ()=>{
                const addSocial: User = await resolver.addSocial(user,input){
                })
                    expect(SocialInput).toBeDefined();
                    expect(SocialInput!.twitter).toBeDefined();
                    expect(SocialInput!.github).toBeDefined();
                    expect(SocialInput!.linkedin).toBeDefined();
                    expect(SocialInput!.facebook).toBeDefined();
                    expect(SocialInput!.portfolio).toBeDefined();
        });});
        describe("Query.Social()", () =>{
            it("should return user social Url", async () => {
                const social = await resolver.social(documentId);
                expect(social).toBeDefined();
                expect(social!.id).toBeDefined();
                expect(social!.twitter).toBeDefined();
                expect(social!.github).toBeDefined();
                expect(social!.linkedin).toBeDefined();
                expect(social!.facebook).toBeDefined();
                expect(social!.portfolio).toBeDefined();
            })
        });

