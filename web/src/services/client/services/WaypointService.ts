/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Waypoint } from '../models/Waypoint';
import { request as __request } from '../core/request';

export class WaypointService {

    /**
     * Returns the list of saved waypoints.
     * @returns Waypoint A JSON array of waypoints
     * @throws ApiError
     */
    public static async list({
        user,
    }: {
        user?: string,
    }): Promise<Array<Waypoint>> {
        const result = await __request({
            method: 'GET',
            path: `/waypoints/${user}/`,
        });
        return result.body;
    }

    /**
     * Saves a waypoint.
     * @returns Waypoint A JSON array of waypoints
     * @throws ApiError
     */
    public static async create({
        requestBody,
        user,
    }: {
        requestBody: Waypoint,
        user?: string,
    }): Promise<Waypoint> {
        const result = await __request({
            method: 'POST',
            path: `/waypoint/${user}/`,
            body: requestBody,
            errors: {
                400: `Invalid request`,
            },
        });
        return result.body;
    }

}