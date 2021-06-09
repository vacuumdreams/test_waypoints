/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Waypoint = {
    properties: {
        longitude: {
            type: 'number',
            isRequired: true,
            format: 'float',
            maximum: 180,
            minimum: -180,
        },
        latitude: {
            type: 'number',
            isRequired: true,
            format: 'float',
            maximum: 90,
            minimum: -90,
        },
        name: {
            type: 'string',
            isRequired: true,
        },
    },
};