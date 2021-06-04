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
        page,
        size,
    }: {
        page?: number,
        size?: number,
    }): Promise<Array<Waypoint>> {
        const result = await __request({
            method: 'GET',
            path: `/waypoints`,
            query: {
                'page': page,
                'size': size,
            },
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
    }: {
        requestBody: Waypoint,
    }): Promise<Waypoint> {
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