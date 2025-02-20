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

import { Translations } from '../models/Translations';
import { HttpFile } from '../http/http';

export class SingleChoice {
    'id': string;
    'label': Translations;
    'optional'?: boolean;
    'choices': Array<Translations>;
    /**
    * If `true`, choices are displayed in a random order to the user
    */
    'shuffle'?: boolean;
    'type'?: SingleChoiceTypeEnum;

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
            "name": "label",
            "baseName": "label",
            "type": "Translations",
            "format": ""
        },
        {
            "name": "optional",
            "baseName": "optional",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "choices",
            "baseName": "choices",
            "type": "Array<Translations>",
            "format": ""
        },
        {
            "name": "shuffle",
            "baseName": "shuffle",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "SingleChoiceTypeEnum",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return SingleChoice.attributeTypeMap;
    }

    public constructor() {
    }
}

export enum SingleChoiceTypeEnum {
    SingleChoice = 'single_choice'
}

