/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { HttpFile } from '../http/http';

export class User {
    'demographics'?: any;
    'personality'?: any;
    'agentType'?: string;
    'taskType'?: string;
    'id': string;
    'isAdmin': boolean;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "demographics",
            "baseName": "demographics",
            "type": "any",
            "format": ""
        },
        {
            "name": "personality",
            "baseName": "personality",
            "type": "any",
            "format": ""
        },
        {
            "name": "agentType",
            "baseName": "agent_type",
            "type": "string",
            "format": ""
        },
        {
            "name": "taskType",
            "baseName": "task_type",
            "type": "string",
            "format": ""
        },
        {
            "name": "id",
            "baseName": "id",
            "type": "string",
            "format": ""
        },
        {
            "name": "isAdmin",
            "baseName": "is_admin",
            "type": "boolean",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return User.attributeTypeMap;
    }

    public constructor() {
    }
}
