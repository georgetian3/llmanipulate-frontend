import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { ComponentGroup } from '../models/ComponentGroup';
import { ComponentGroupComponentsInner } from '../models/ComponentGroupComponentsInner';
import { ErrorResponse } from '../models/ErrorResponse';
import { FreeText } from '../models/FreeText';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { MultiChoice } from '../models/MultiChoice';
import { NewResponse } from '../models/NewResponse';
import { NewUser } from '../models/NewUser';
import { Response } from '../models/Response';
import { SingleChoice } from '../models/SingleChoice';
import { Slider } from '../models/Slider';
import { TaskConfig } from '../models/TaskConfig';
import { TaskPage } from '../models/TaskPage';
import { Translations } from '../models/Translations';
import { User } from '../models/User';
import { ValidationError } from '../models/ValidationError';
import { ValidationErrorLocInner } from '../models/ValidationErrorLocInner';

import { ObservableDefaultApi } from "./ObservableAPI";
import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";

export interface DefaultApiCreateResponseRequest {
    /**
     * 
     * @type NewResponse
     * @memberof DefaultApicreateResponse
     */
    newResponse: NewResponse
}

export interface DefaultApiGetResponsesRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DefaultApigetResponses
     */
    userId: string
}

export interface DefaultApiGetResponsesByUserRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DefaultApigetResponsesByUser
     */
    userId: string
}

export interface DefaultApiRootRequest {
}

export class ObjectDefaultApi {
    private api: ObservableDefaultApi

    public constructor(configuration: Configuration, requestFactory?: DefaultApiRequestFactory, responseProcessor?: DefaultApiResponseProcessor) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Response
     * @param param the request object
     */
    public createResponseWithHttpInfo(param: DefaultApiCreateResponseRequest, options?: Configuration): Promise<HttpInfo<Response>> {
        return this.api.createResponseWithHttpInfo(param.newResponse,  options).toPromise();
    }

    /**
     * Create Response
     * @param param the request object
     */
    public createResponse(param: DefaultApiCreateResponseRequest, options?: Configuration): Promise<Response> {
        return this.api.createResponse(param.newResponse,  options).toPromise();
    }

    /**
     * Get Responses
     * @param param the request object
     */
    public getResponsesWithHttpInfo(param: DefaultApiGetResponsesRequest, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.getResponsesWithHttpInfo(param.userId,  options).toPromise();
    }

    /**
     * Get Responses
     * @param param the request object
     */
    public getResponses(param: DefaultApiGetResponsesRequest, options?: Configuration): Promise<any> {
        return this.api.getResponses(param.userId,  options).toPromise();
    }

    /**
     * Get Responses By User
     * @param param the request object
     */
    public getResponsesByUserWithHttpInfo(param: DefaultApiGetResponsesByUserRequest, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.getResponsesByUserWithHttpInfo(param.userId,  options).toPromise();
    }

    /**
     * Get Responses By User
     * @param param the request object
     */
    public getResponsesByUser(param: DefaultApiGetResponsesByUserRequest, options?: Configuration): Promise<any> {
        return this.api.getResponsesByUser(param.userId,  options).toPromise();
    }

    /**
     * Root
     * @param param the request object
     */
    public rootWithHttpInfo(param: DefaultApiRootRequest = {}, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.rootWithHttpInfo( options).toPromise();
    }

    /**
     * Root
     * @param param the request object
     */
    public root(param: DefaultApiRootRequest = {}, options?: Configuration): Promise<any> {
        return this.api.root( options).toPromise();
    }

}

import { ObservableTasksApi } from "./ObservableAPI";
import { TasksApiRequestFactory, TasksApiResponseProcessor} from "../apis/TasksApi";

export interface TasksApiGetTaskRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof TasksApigetTask
     */
    id: string
}

export class ObjectTasksApi {
    private api: ObservableTasksApi

    public constructor(configuration: Configuration, requestFactory?: TasksApiRequestFactory, responseProcessor?: TasksApiResponseProcessor) {
        this.api = new ObservableTasksApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get Task
     * @param param the request object
     */
    public getTaskWithHttpInfo(param: TasksApiGetTaskRequest, options?: Configuration): Promise<HttpInfo<TaskConfig>> {
        return this.api.getTaskWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Get Task
     * @param param the request object
     */
    public getTask(param: TasksApiGetTaskRequest, options?: Configuration): Promise<TaskConfig> {
        return this.api.getTask(param.id,  options).toPromise();
    }

}

import { ObservableUsersApi } from "./ObservableAPI";
import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";

export interface UsersApiCreateUserRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApicreateUser
     */
    userId: string
    /**
     * 
     * @type NewUser
     * @memberof UsersApicreateUser
     */
    newUser: NewUser
}

export interface UsersApiGetAllUsersRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApigetAllUsers
     */
    userId: string
}

export interface UsersApiGetAllUsersResponsesRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApigetAllUsersResponses
     */
    userId: string
}

export interface UsersApiGetUserRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApigetUser
     */
    userId: string
}

export class ObjectUsersApi {
    private api: ObservableUsersApi

    public constructor(configuration: Configuration, requestFactory?: UsersApiRequestFactory, responseProcessor?: UsersApiResponseProcessor) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Creates a new non-admin user. Requires an admin\'s user_id for authentication.
     * Create User
     * @param param the request object
     */
    public createUserWithHttpInfo(param: UsersApiCreateUserRequest, options?: Configuration): Promise<HttpInfo<User>> {
        return this.api.createUserWithHttpInfo(param.userId, param.newUser,  options).toPromise();
    }

    /**
     * Creates a new non-admin user. Requires an admin\'s user_id for authentication.
     * Create User
     * @param param the request object
     */
    public createUser(param: UsersApiCreateUserRequest, options?: Configuration): Promise<User> {
        return this.api.createUser(param.userId, param.newUser,  options).toPromise();
    }

    /**
     * Get All Users
     * @param param the request object
     */
    public getAllUsersWithHttpInfo(param: UsersApiGetAllUsersRequest, options?: Configuration): Promise<HttpInfo<Array<User>>> {
        return this.api.getAllUsersWithHttpInfo(param.userId,  options).toPromise();
    }

    /**
     * Get All Users
     * @param param the request object
     */
    public getAllUsers(param: UsersApiGetAllUsersRequest, options?: Configuration): Promise<Array<User>> {
        return this.api.getAllUsers(param.userId,  options).toPromise();
    }

    /**
     * Get All Users Responses
     * @param param the request object
     */
    public getAllUsersResponsesWithHttpInfo(param: UsersApiGetAllUsersResponsesRequest, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.getAllUsersResponsesWithHttpInfo(param.userId,  options).toPromise();
    }

    /**
     * Get All Users Responses
     * @param param the request object
     */
    public getAllUsersResponses(param: UsersApiGetAllUsersResponsesRequest, options?: Configuration): Promise<any> {
        return this.api.getAllUsersResponses(param.userId,  options).toPromise();
    }

    /**
     * Get User
     * @param param the request object
     */
    public getUserWithHttpInfo(param: UsersApiGetUserRequest, options?: Configuration): Promise<HttpInfo<User>> {
        return this.api.getUserWithHttpInfo(param.userId,  options).toPromise();
    }

    /**
     * Get User
     * @param param the request object
     */
    public getUser(param: UsersApiGetUserRequest, options?: Configuration): Promise<User> {
        return this.api.getUser(param.userId,  options).toPromise();
    }

}
