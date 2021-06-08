/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SavedWaypoint } from '../models/SavedWaypoint';
import type { Waypoint } from '../models/Waypoint';
import type { WaypointOrder } from '../models/WaypointOrder';
import { request as __request } from '../core/request';

export class WaypointService {

    /**
     * Returns the list of saved waypoints.
     * @returns SavedWaypoint A collection of waypoints.
     * @throws ApiError
     */
    public static async list({
        user,
    }: {
        user: string,
    }): Promise<Array<SavedWaypoint>> {
        const result = await __request({
            method: 'GET',
            path: `/waypoints/${user}`,
        });
        return result.body;
    }

    /**
     * Updates waypoint order.
     * @returns WaypointOrder Returns the list of saved waypoints.
     * @throws ApiError
     */
    public static async updateOrder({
        user,
        requestBody,
    }: {
        user: string,
        requestBody: Array<WaypointOrder>,
    }): Promise<Array<WaypointOrder>> {
        const result = await __request({
            method: 'PUT',
            path: `/waypoints/${user}`,
            body: requestBody,
            errors: {
                400: `Invalid request.`,
            },
        });
        return result.body;
    }

    /**
     * Saves a waypoint.
     * @returns SavedWaypoint The created waypoint.
     * @throws ApiError
     */
    public static async create({
        user,
        requestBody,
    }: {
        user: string,
        requestBody: Waypoint,
    }): Promise<SavedWaypoint> {
        const result = await __request({
            method: 'POST',
            path: `/waypoint/${user}`,
            body: requestBody,
            errors: {
                400: `Invalid request.`,
            },
        });
        return result.body;
    }

    /**
     * Deletes a waypoint.
     * @returns any Empty response when success.
     * @throws ApiError
     */
    public static async delete({
        user,
        id,
    }: {
        user: string,
        id: number,
    }): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/waypoint/${user}`,
            query: {
                'id': id,
            },
            errors: {
                400: `Invalid request.`,
            },
        });
        return result.body;
    }

}