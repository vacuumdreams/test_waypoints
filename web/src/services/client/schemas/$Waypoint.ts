/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Waypoint = {
    properties: {
        coordinates: {
            properties: {
                'X': {
                    type: 'number',
                    format: 'float',
                    maximum: 180,
                    minimum: -180,
                },
                'Y': {
                    type: 'number',
                    format: 'float',
                    maximum: 90,
                    minimum: -90,
                },
            },
            isRequired: true,
        },
        name: {
            type: 'string',
            isRequired: true,
        },
    },
};