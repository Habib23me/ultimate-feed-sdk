
require('dotenv').config({ path: `${__dirname}/../../.env` });
import { UltimateFeedClient } from "../model/client";
describe('ultimate feed endpoints', () => {
    const feedClient = new UltimateFeedClient(
        process.env.CLIENT_Id,
        process.env.API_KEY,
    );
    beforeAll(() => {
        jest.setTimeout(30000);
    });

    test('Add activity test', async () => {
        const activity = {
            foreign_id: '124',
            media: ["https://www.google.com"],
            caption: "hello there",
            time: new Date(),
            actor: "123",
        };
        try {

            const response = await feedClient.addActivity(activity);
            expect(response.status).toBe(201);
        }
        catch (e) {
            console.log(e);
        }
    });
    test('Delete activity test', async () => {
        try {
            const response = await feedClient.deleteActivity("123");
            expect(response.status).toBe(200);
        }
        catch (e) {
            console.log(e);
        }
    });
    test('track engagement', async () => {
        const engagement = {
            activity_id: '124',
            actor: "123",
            time: new Date(),
            verb: "like",
            score: 0.5,
            foreign_id: "124",
        };
        try {
            const response = await feedClient.trackEngagement(engagement);
            expect(response.status).toBe(201);
        }
        catch (e) {
            console.log(e);
        }
    }
    );
    test('Delete engagement test', async () => {
        try {
            const response = await feedClient.removeEngagement("123");
            expect(response.status).toBe(200);
        }
        catch (e) {
            console.log(e);
        }
    });
    test('track impression', async () => {
        const impression = {
            activity_id: '124',
            actor: "123",
            time: new Date(),
            foreign_id: "124",
        };
        try {
            const response = await feedClient.trackImpression(impression);
            console.log(response.data);
            expect(response.status).toBe(201);
        } catch (e) { console.log(e); }
    });
    test('Delete engagement test', async () => {
        try {
            const response = await feedClient.removeImpression("123","124");
            expect(response.status).toBe(200);
        }
        catch (e) {
            console.log(e);
        }
    });

    test('get feed', async () => {
        const user = "123";
        const limit = 10;
        try {
            const response = await feedClient.getFeed(limit, user);
            console.log(response);
            expect(response).toBeDefined();
        }
        catch (e) {
            console.log(e);
        }
    });
});