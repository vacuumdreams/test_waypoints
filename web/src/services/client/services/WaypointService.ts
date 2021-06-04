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
    public static async list(): Promise<Array<Waypoint>> {
        const result = await __request({
            method: 'GET',
            path: `/waypoints`,
        });
        return result.body;
    }

    /**
     * Saves a waypoint.
     * @param requestBody
     * @returns Waypoint A JSON array of waypoints
     * @throws ApiError
     */
    public static async create(
        requestBody: Waypoint,
    ): Promise<Waypoint> {
        const result = await __request({
            method: 'POST',
            path: `/waypoint`,
            body: requestBody,
            errors: {
                400: `Invalid request`,
            },
        });
        return result.body;
    }

}