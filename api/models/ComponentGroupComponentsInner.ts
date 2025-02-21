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

import { Chat } from '../models/Chat';
import { FreeText } from '../models/FreeText';
import { MultiChoice } from '../models/MultiChoice';
import { Participant } from '../models/Participant';
import { SingleChoice } from '../models/SingleChoice';
import { Slider } from '../models/Slider';
import { Translations } from '../models/Translations';
import { HttpFile } from '../http/http';

export class ComponentGroupComponentsInner {
    'id': string;
    'label': Translations;
    'optional'?: boolean;
    'choices': Array<Translations>;
    /**
    * If `true`, choices are displayed in a random order to the user
    */
    'shuffle'?: boolean;
    'type'?: ComponentGroupComponentsInnerTypeEnum;
    'minChoices'?: number;
    'maxChoices'?: number;
    'steps': number;
    'labels'?: Array<Translations>;
    'regex'?: string;
    'participants'?: Array<Participant>;
    'order'?: Array<string>;

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
            "type": "ComponentGroupComponentsInnerTypeEnum",
            "format": ""
        },
        {
            "name": "minChoices",
            "baseName": "min_choices",
            "type": "number",
            "format": ""
        },
        {
            "name": "maxChoices",
            "baseName": "max_choices",
            "type": "number",
            "format": ""
        },
        {
            "name": "steps",
            "baseName": "steps",
            "type": "number",
            "format": ""
        },
        {
            "name": "labels",
            "baseName": "labels",
            "type": "Array<Translations>",
            "format": ""
        },
        {
            "name": "regex",
            "baseName": "regex",
            "type": "string",
            "format": ""
        },
        {
            "name": "participants",
            "baseName": "participants",
            "type": "Array<Participant>",
            "format": ""
        },
        {
            "name": "order",
            "baseName": "order",
            "type": "Array<string>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return ComponentGroupComponentsInner.attributeTypeMap;
    }

    public constructor() {
    }
}

export enum ComponentGroupComponentsInnerTypeEnum {
    SingleChoice = 'single_choice',
    MultiChoice = 'multi_choice',
    Slider = 'slider',
    FreeText = 'free_text',
    Chat = 'chat'
}

