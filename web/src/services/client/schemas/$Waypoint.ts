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
            pattern: '((\\-?|\\+?)?\\d+(\\.\\d+)?)',
        },
        longitude: {
            type: 'number',
            isRequired: true,
            format: 'float',
            maximum: 180,
            minimum: -180,
            pattern: '((\\-?|\\+?)?\\d+(\\.\\d+)?)',
        },
        name: {
            type: 'string',
            isRequired: true,
        },
    },
};