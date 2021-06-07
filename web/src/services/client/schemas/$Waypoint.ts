/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Waypoint = {
    properties: {
        latitude: {
            type: 'number',
            isRequired: true,
            format: 'float',
            maximum: 90,
            minimum: -90,
        },
        longitude: {
            type: 'number',
            isRequired: true,
            format: 'float',
            maximum: 180,
            minimum: -180,
        },
        name: {
            type: 'string',
            isRequired: true,
        },
    },
};