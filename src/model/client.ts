import { AxiosInstance } from "axios";
import axios from "axios";
import { IUFActivityPayload } from "./activity_payload";
import * as http from 'http';
import { IUFEngagementPayload } from "./engagement_payload";
import { IUFImpressionPayload } from "./impression_payload";

export class UltimateFeedClient {
    clientId: string;
    apiKey: string;
    axiosInstance: AxiosInstance;
    constructor(clientId: string, apiKey: string, clientOptions?: ClientOptions) {
        this.clientId = clientId;
        this.apiKey = apiKey;
        this.axiosInstance = axios.create({
            baseURL: process.env.UL_BASE_URL,
            timeout: clientOptions?.timeout || 7000,
            httpAgent: new http.Agent({ keepAlive: clientOptions?.keepAlive || true }),
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
                "apiKey": apiKey,
            }
        });
    }



    async getFeed(limit: number, userId: string) {
        const response = await this.axiosInstance.get(
            `/api/feed/${userId}?limit=${limit}`,
        );
        return response.data.foreign_ids;
    }
    async addActivity(request: IUFActivityPayload) {
        return this.axiosInstance.post(
            `/api/activity`,
            request
        );
    }

    async deleteActivity(foreign_id: string) {
        return this.axiosInstance.delete(
            `/api/activity/${foreign_id}`,
        );
    }
    async updateActivity(foreign_id: string, request: IUFActivityPayload) {
        return this.axiosInstance.put(
            `/api/activity/${foreign_id}`,
            request
        );
    }
    async trackEngagement(engagement: IUFEngagementPayload) {
        const response = await this.axiosInstance.post(
            `/api/engagement`,
            engagement,
        );
        return response;
    }
    async removeEngagement(foreign_id: string) {
        const response = await this.axiosInstance.delete(
            `/api/engagement/${foreign_id}`,
        );
        return response;
    }

    async trackImpression(payload: IUFImpressionPayload) {
        const response = await this.axiosInstance.post(
            `/api/impression`,
            payload
        );
        return response;
    }
    async removeImpression(userId: string, activityId: string) {
        const response = await this.axiosInstance.delete(
            `/api/impression?userId=${userId}&activityId=${activityId}`,
        );
        return response;
    }

}

