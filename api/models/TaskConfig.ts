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

import { TaskPage } from '../models/TaskPage';
import { Translations } from '../models/Translations';
import { HttpFile } from '../http/http';

export class TaskConfig {
    'id': string;
    'name': Translations;
    'description'?: Translations | null;
    'pages': Array<TaskPage>;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string",
            "format": ""
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "Translations",
            "format": ""
        },
        {
            "name": "description",
            "baseName": "description",
            "type": "Translations",
            "format": ""
        },
        {
            "name": "pages",
            "baseName": "pages",
            "type": "Array<TaskPage>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return TaskConfig.attributeTypeMap;
    }

    public constructor() {
    }
}
