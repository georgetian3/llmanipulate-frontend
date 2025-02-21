import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { Chat } from '../models/Chat';
import { ChatHistory } from '../models/ChatHistory';
import { ChatMessage } from '../models/ChatMessage';
import { ComponentGroup } from '../models/ComponentGroup';
import { ComponentGroupComponentsInner } from '../models/ComponentGroupComponentsInner';
import { ErrorResponse } from '../models/ErrorResponse';
import { FreeText } from '../models/FreeText';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { MultiChoice } from '../models/MultiChoice';
import { NewResponse } from '../models/NewResponse';
import { NewUser } from '../models/NewUser';
import { Participant } from '../models/Participant';
import { Response } from '../models/Response';
import { SingleChoice } from '../models/SingleChoice';
import { Slider } from '../models/Slider';
import { TaskConfig } from '../models/TaskConfig';
import { TaskPage } from '../models/TaskPage';
import { Translations } from '../models/Translations';
import { User } from '../models/User';
import { ValidationError } from '../models/ValidationError';
import { ValidationErrorLocInner } from '../models/ValidationErrorLocInner';
import { ObservableChatApi } from './ObservableAPI';

import { ChatApiRequestFactory, ChatApiResponseProcessor} from "../apis/ChatApi";
export class PromiseChatApi {
    private api: ObservableChatApi

    public constructor(
        configuration: Configuration,
        requestFactory?: ChatApiRequestFactory,
        responseProcessor?: ChatApiResponseProcessor
    ) {
        this.api = new ObservableChatApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get Chat
     * @param id
     */
    public getChatWithHttpInfo(id: string, _options?: Configuration): Promise<HttpInfo<ChatHistory>> {
        const result = this.api.getChatWithHttpInfo(id, _options);
        return result.toPromise();
    }

    /**
     * Get Chat
     * @param id
     */
    public getChat(id: string, _options?: Configuration): Promise<ChatHistory> {
        const result = this.api.getChat(id, _options);
        return result.toPromise();
    }


}



import { ObservableDefaultApi } from './ObservableAPI';

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class PromiseDefaultApi {
    private api: ObservableDefaultApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Response
     * @param newResponse
     */
    public createResponseWithHttpInfo(newResponse: NewResponse, _options?: Configuration): Promise<HttpInfo<Response>> {
        const result = this.api.createResponseWithHttpInfo(newResponse, _options);
        return result.toPromise();
    }

    /**
     * Create Response
     * @param newResponse
     */
    public createResponse(newResponse: NewResponse, _options?: Configuration): Promise<Response> {
        const result = this.api.createResponse(newResponse, _options);
        return result.toPromise();
    }

    /**
     * Get Responses
     * @param userId
     */
    public getResponsesWithHttpInfo(userId: string, _options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.getResponsesWithHttpInfo(userId, _options);
        return result.toPromise();
    }

    /**
     * Get Responses
     * @param userId
     */
    public getResponses(userId: string, _options?: Configuration): Promise<any> {
        const result = this.api.getResponses(userId, _options);
        return result.toPromise();
    }

    /**
     * Get Responses By User
     * @param userId
     */
    public getResponsesByUserWithHttpInfo(userId: string, _options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.getResponsesByUserWithHttpInfo(userId, _options);
        return result.toPromise();
    }

    /**
     * Get Responses By User
     * @param userId
     */
    public getResponsesByUser(userId: string, _options?: Configuration): Promise<any> {
        const result = this.api.getResponsesByUser(userId, _options);
        return result.toPromise();
    }

    /**
     * Root
     */
    public rootWithHttpInfo(_options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.rootWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Root
     */
    public root(_options?: Configuration): Promise<any> {
        const result = this.api.root(_options);
        return result.toPromise();
    }


}



import { ObservableTasksApi } from './ObservableAPI';

import { TasksApiRequestFactory, TasksApiResponseProcessor} from "../apis/TasksApi";
export class PromiseTasksApi {
    private api: ObservableTasksApi

    public constructor(
        configuration: Configuration,
        requestFactory?: TasksApiRequestFactory,
        responseProcessor?: TasksApiResponseProcessor
    ) {
        this.api = new ObservableTasksApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get Task
     * @param id
     */
    public getTaskWithHttpInfo(id: string, _options?: Configuration): Promise<HttpInfo<TaskConfig>> {
        const result = this.api.getTaskWithHttpInfo(id, _options);
        return result.toPromise();
    }

    /**
     * Get Task
     * @param id
     */
    public getTask(id: string, _options?: Configuration): Promise<TaskConfig> {
        const result = this.api.getTask(id, _options);
        return result.toPromise();
    }


}



import { ObservableUsersApi } from './ObservableAPI';

import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";
export class PromiseUsersApi {
    private api: ObservableUsersApi

    public constructor(
        configuration: Configuration,
        requestFactory?: UsersApiRequestFactory,
        responseProcessor?: UsersApiResponseProcessor
    ) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Creates a new non-admin user. Requires an admin\'s user_id for authentication.
     * Create User
     * @param userId
     * @param newUser
     */
    public createUserWithHttpInfo(userId: string, newUser: NewUser, _options?: Configuration): Promise<HttpInfo<User>> {
        const result = this.api.createUserWithHttpInfo(userId, newUser, _options);
        return result.toPromise();
    }

    /**
     * Creates a new non-admin user. Requires an admin\'s user_id for authentication.
     * Create User
     * @param userId
     * @param newUser
     */
    public createUser(userId: string, newUser: NewUser, _options?: Configuration): Promise<User> {
        const result = this.api.createUser(userId, newUser, _options);
        return result.toPromise();
    }

    /**
     * Get All Users
     * @param userId
     */
    public getAllUsersWithHttpInfo(userId: string, _options?: Configuration): Promise<HttpInfo<Array<User>>> {
        const result = this.api.getAllUsersWithHttpInfo(userId, _options);
        return result.toPromise();
    }

    /**
     * Get All Users
     * @param userId
     */
    public getAllUsers(userId: string, _options?: Configuration): Promise<Array<User>> {
        const result = this.api.getAllUsers(userId, _options);
        return result.toPromise();
    }

    /**
     * Get All Users Responses
     * @param userId
     */
    public getAllUsersResponsesWithHttpInfo(userId: string, _options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.getAllUsersResponsesWithHttpInfo(userId, _options);
        return result.toPromise();
    }

    /**
     * Get All Users Responses
     * @param userId
     */
    public getAllUsersResponses(userId: string, _options?: Configuration): Promise<any> {
        const result = this.api.getAllUsersResponses(userId, _options);
        return result.toPromise();
    }

    /**
     * Get User
     * @param userId
     */
    public getUserWithHttpInfo(userId: string, _options?: Configuration): Promise<HttpInfo<User>> {
        const result = this.api.getUserWithHttpInfo(userId, _options);
        return result.toPromise();
    }

    /**
     * Get User
     * @param userId
     */
    public getUser(userId: string, _options?: Configuration): Promise<User> {
        const result = this.api.getUser(userId, _options);
        return result.toPromise();
    }


}



