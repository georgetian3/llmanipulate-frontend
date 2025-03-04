import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { Agent } from '../models/Agent';
import { BearerResponse } from '../models/BearerResponse';
import { BodyResetForgotPasswordAuthForgotPasswordPost } from '../models/BodyResetForgotPasswordAuthForgotPasswordPost';
import { BodyResetResetPasswordAuthResetPasswordPost } from '../models/BodyResetResetPasswordAuthResetPasswordPost';
import { BodyVerifyRequestTokenAuthRequestVerifyTokenPost } from '../models/BodyVerifyRequestTokenAuthRequestVerifyTokenPost';
import { BodyVerifyVerifyAuthVerifyPost } from '../models/BodyVerifyVerifyAuthVerifyPost';
import { Chat } from '../models/Chat';
import { ChatHistoryRead } from '../models/ChatHistoryRead';
import { ChatMessageRead } from '../models/ChatMessageRead';
import { ComponentGroup } from '../models/ComponentGroup';
import { ComponentGroupComponentsInner } from '../models/ComponentGroupComponentsInner';
import { Detail } from '../models/Detail';
import { ErrorModel } from '../models/ErrorModel';
import { ErrorResponse } from '../models/ErrorResponse';
import { FreeText } from '../models/FreeText';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { Id } from '../models/Id';
import { Label } from '../models/Label';
import { MultiChoice } from '../models/MultiChoice';
import { MyTasks } from '../models/MyTasks';
import { ResponseValue } from '../models/ResponseValue';
import { SingleChoice } from '../models/SingleChoice';
import { Slider } from '../models/Slider';
import { TaskConfig } from '../models/TaskConfig';
import { TaskPage } from '../models/TaskPage';
import { TaskRead } from '../models/TaskRead';
import { TaskResponse } from '../models/TaskResponse';
import { TaskResponseCreate } from '../models/TaskResponseCreate';
import { TaskResponseRead } from '../models/TaskResponseRead';
import { Translations } from '../models/Translations';
import { User } from '../models/User';
import { UserCreate } from '../models/UserCreate';
import { UserRead } from '../models/UserRead';
import { UserUpdate } from '../models/UserUpdate';
import { ValidationError } from '../models/ValidationError';
import { ValidationErrorLocInner } from '../models/ValidationErrorLocInner';
import { ObservableAuthApi } from './ObservableAPI';

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class PromiseAuthApi {
    private api: ObservableAuthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Auth:Auth.Login
     * @param username
     * @param password
     * @param [grantType]
     * @param [scope]
     * @param [clientId]
     * @param [clientSecret]
     */
    public authAuthLoginWithHttpInfo(username: string, password: string, grantType?: string, scope?: string, clientId?: string, clientSecret?: string, _options?: Configuration): Promise<HttpInfo<BearerResponse>> {
        const result = this.api.authAuthLoginWithHttpInfo(username, password, grantType, scope, clientId, clientSecret, _options);
        return result.toPromise();
    }

    /**
     * Auth:Auth.Login
     * @param username
     * @param password
     * @param [grantType]
     * @param [scope]
     * @param [clientId]
     * @param [clientSecret]
     */
    public authAuthLogin(username: string, password: string, grantType?: string, scope?: string, clientId?: string, clientSecret?: string, _options?: Configuration): Promise<BearerResponse> {
        const result = this.api.authAuthLogin(username, password, grantType, scope, clientId, clientSecret, _options);
        return result.toPromise();
    }

    /**
     * Auth:Auth.Logout
     */
    public authAuthLogoutWithHttpInfo(_options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.authAuthLogoutWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Auth:Auth.Logout
     */
    public authAuthLogout(_options?: Configuration): Promise<any> {
        const result = this.api.authAuthLogout(_options);
        return result.toPromise();
    }

    /**
     * Register:Register
     * @param userCreate
     */
    public registerRegisterWithHttpInfo(userCreate: UserCreate, _options?: Configuration): Promise<HttpInfo<UserRead>> {
        const result = this.api.registerRegisterWithHttpInfo(userCreate, _options);
        return result.toPromise();
    }

    /**
     * Register:Register
     * @param userCreate
     */
    public registerRegister(userCreate: UserCreate, _options?: Configuration): Promise<UserRead> {
        const result = this.api.registerRegister(userCreate, _options);
        return result.toPromise();
    }

    /**
     * Reset:Forgot Password
     * @param bodyResetForgotPasswordAuthForgotPasswordPost
     */
    public resetForgotPasswordWithHttpInfo(bodyResetForgotPasswordAuthForgotPasswordPost: BodyResetForgotPasswordAuthForgotPasswordPost, _options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.resetForgotPasswordWithHttpInfo(bodyResetForgotPasswordAuthForgotPasswordPost, _options);
        return result.toPromise();
    }

    /**
     * Reset:Forgot Password
     * @param bodyResetForgotPasswordAuthForgotPasswordPost
     */
    public resetForgotPassword(bodyResetForgotPasswordAuthForgotPasswordPost: BodyResetForgotPasswordAuthForgotPasswordPost, _options?: Configuration): Promise<any> {
        const result = this.api.resetForgotPassword(bodyResetForgotPasswordAuthForgotPasswordPost, _options);
        return result.toPromise();
    }

    /**
     * Reset:Reset Password
     * @param bodyResetResetPasswordAuthResetPasswordPost
     */
    public resetResetPasswordWithHttpInfo(bodyResetResetPasswordAuthResetPasswordPost: BodyResetResetPasswordAuthResetPasswordPost, _options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.resetResetPasswordWithHttpInfo(bodyResetResetPasswordAuthResetPasswordPost, _options);
        return result.toPromise();
    }

    /**
     * Reset:Reset Password
     * @param bodyResetResetPasswordAuthResetPasswordPost
     */
    public resetResetPassword(bodyResetResetPasswordAuthResetPasswordPost: BodyResetResetPasswordAuthResetPasswordPost, _options?: Configuration): Promise<any> {
        const result = this.api.resetResetPassword(bodyResetResetPasswordAuthResetPasswordPost, _options);
        return result.toPromise();
    }

    /**
     * Verify:Request-Token
     * @param bodyVerifyRequestTokenAuthRequestVerifyTokenPost
     */
    public verifyRequestTokenWithHttpInfo(bodyVerifyRequestTokenAuthRequestVerifyTokenPost: BodyVerifyRequestTokenAuthRequestVerifyTokenPost, _options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.verifyRequestTokenWithHttpInfo(bodyVerifyRequestTokenAuthRequestVerifyTokenPost, _options);
        return result.toPromise();
    }

    /**
     * Verify:Request-Token
     * @param bodyVerifyRequestTokenAuthRequestVerifyTokenPost
     */
    public verifyRequestToken(bodyVerifyRequestTokenAuthRequestVerifyTokenPost: BodyVerifyRequestTokenAuthRequestVerifyTokenPost, _options?: Configuration): Promise<any> {
        const result = this.api.verifyRequestToken(bodyVerifyRequestTokenAuthRequestVerifyTokenPost, _options);
        return result.toPromise();
    }

    /**
     * Verify:Verify
     * @param bodyVerifyVerifyAuthVerifyPost
     */
    public verifyVerifyWithHttpInfo(bodyVerifyVerifyAuthVerifyPost: BodyVerifyVerifyAuthVerifyPost, _options?: Configuration): Promise<HttpInfo<UserRead>> {
        const result = this.api.verifyVerifyWithHttpInfo(bodyVerifyVerifyAuthVerifyPost, _options);
        return result.toPromise();
    }

    /**
     * Verify:Verify
     * @param bodyVerifyVerifyAuthVerifyPost
     */
    public verifyVerify(bodyVerifyVerifyAuthVerifyPost: BodyVerifyVerifyAuthVerifyPost, _options?: Configuration): Promise<UserRead> {
        const result = this.api.verifyVerify(bodyVerifyVerifyAuthVerifyPost, _options);
        return result.toPromise();
    }


}



import { ObservableChatsApi } from './ObservableAPI';

import { ChatsApiRequestFactory, ChatsApiResponseProcessor} from "../apis/ChatsApi";
export class PromiseChatsApi {
    private api: ObservableChatsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: ChatsApiRequestFactory,
        responseProcessor?: ChatsApiResponseProcessor
    ) {
        this.api = new ObservableChatsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get Chat
     * @param id
     */
    public getChatWithHttpInfo(id: string, _options?: Configuration): Promise<HttpInfo<ChatHistoryRead>> {
        const result = this.api.getChatWithHttpInfo(id, _options);
        return result.toPromise();
    }

    /**
     * Get Chat
     * @param id
     */
    public getChat(id: string, _options?: Configuration): Promise<ChatHistoryRead> {
        const result = this.api.getChat(id, _options);
        return result.toPromise();
    }


}



import { ObservableResponsesApi } from './ObservableAPI';

import { ResponsesApiRequestFactory, ResponsesApiResponseProcessor} from "../apis/ResponsesApi";
export class PromiseResponsesApi {
    private api: ObservableResponsesApi

    public constructor(
        configuration: Configuration,
        requestFactory?: ResponsesApiRequestFactory,
        responseProcessor?: ResponsesApiResponseProcessor
    ) {
        this.api = new ObservableResponsesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get Responses
     */
    public getResponsesWithHttpInfo(_options?: Configuration): Promise<HttpInfo<any>> {
        const result = this.api.getResponsesWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Get Responses
     */
    public getResponses(_options?: Configuration): Promise<any> {
        const result = this.api.getResponses(_options);
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
     * Create Task Response
     * @param taskId
     * @param taskResponseCreate
     */
    public createTaskResponseWithHttpInfo(taskId: string, taskResponseCreate: TaskResponseCreate, _options?: Configuration): Promise<HttpInfo<TaskResponseRead>> {
        const result = this.api.createTaskResponseWithHttpInfo(taskId, taskResponseCreate, _options);
        return result.toPromise();
    }

    /**
     * Create Task Response
     * @param taskId
     * @param taskResponseCreate
     */
    public createTaskResponse(taskId: string, taskResponseCreate: TaskResponseCreate, _options?: Configuration): Promise<TaskResponseRead> {
        const result = this.api.createTaskResponse(taskId, taskResponseCreate, _options);
        return result.toPromise();
    }

    /**
     * Get All Tasks
     */
    public getAllTasksWithHttpInfo(_options?: Configuration): Promise<HttpInfo<Array<TaskRead>>> {
        const result = this.api.getAllTasksWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Get All Tasks
     */
    public getAllTasks(_options?: Configuration): Promise<Array<TaskRead>> {
        const result = this.api.getAllTasks(_options);
        return result.toPromise();
    }

    /**
     * Get Sample Task
     */
    public getSampleTaskWithHttpInfo(_options?: Configuration): Promise<HttpInfo<TaskRead>> {
        const result = this.api.getSampleTaskWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Get Sample Task
     */
    public getSampleTask(_options?: Configuration): Promise<TaskRead> {
        const result = this.api.getSampleTask(_options);
        return result.toPromise();
    }

    /**
     * Get Task
     * @param taskId
     */
    public getTaskWithHttpInfo(taskId: string, _options?: Configuration): Promise<HttpInfo<TaskRead>> {
        const result = this.api.getTaskWithHttpInfo(taskId, _options);
        return result.toPromise();
    }

    /**
     * Get Task
     * @param taskId
     */
    public getTask(taskId: string, _options?: Configuration): Promise<TaskRead> {
        const result = this.api.getTask(taskId, _options);
        return result.toPromise();
    }

    /**
     * Get Task Response
     * @param taskId
     */
    public getTaskResponseWithHttpInfo(taskId: string, _options?: Configuration): Promise<HttpInfo<TaskResponseRead>> {
        const result = this.api.getTaskResponseWithHttpInfo(taskId, _options);
        return result.toPromise();
    }

    /**
     * Get Task Response
     * @param taskId
     */
    public getTaskResponse(taskId: string, _options?: Configuration): Promise<TaskResponseRead> {
        const result = this.api.getTaskResponse(taskId, _options);
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
     * @param userCreate
     */
    public createUserWithHttpInfo(userCreate: UserCreate, _options?: Configuration): Promise<HttpInfo<User>> {
        const result = this.api.createUserWithHttpInfo(userCreate, _options);
        return result.toPromise();
    }

    /**
     * Creates a new non-admin user. Requires an admin\'s user_id for authentication.
     * Create User
     * @param userCreate
     */
    public createUser(userCreate: UserCreate, _options?: Configuration): Promise<User> {
        const result = this.api.createUser(userCreate, _options);
        return result.toPromise();
    }

    /**
     * Get All Users
     */
    public getAllUsersWithHttpInfo(_options?: Configuration): Promise<HttpInfo<Array<User>>> {
        const result = this.api.getAllUsersWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Get All Users
     */
    public getAllUsers(_options?: Configuration): Promise<Array<User>> {
        const result = this.api.getAllUsers(_options);
        return result.toPromise();
    }

    /**
     * Get All Users Responses
     */
    public getAllUsersResponsesWithHttpInfo(_options?: Configuration): Promise<HttpInfo<Array<TaskResponse>>> {
        const result = this.api.getAllUsersResponsesWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Get All Users Responses
     */
    public getAllUsersResponses(_options?: Configuration): Promise<Array<TaskResponse>> {
        const result = this.api.getAllUsersResponses(_options);
        return result.toPromise();
    }

    /**
     * Get My Tasks
     */
    public getMyTasksWithHttpInfo(_options?: Configuration): Promise<HttpInfo<MyTasks>> {
        const result = this.api.getMyTasksWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Get My Tasks
     */
    public getMyTasks(_options?: Configuration): Promise<MyTasks> {
        const result = this.api.getMyTasks(_options);
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

    /**
     * Users:Current User
     */
    public usersCurrentUserWithHttpInfo(_options?: Configuration): Promise<HttpInfo<UserRead>> {
        const result = this.api.usersCurrentUserWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Users:Current User
     */
    public usersCurrentUser(_options?: Configuration): Promise<UserRead> {
        const result = this.api.usersCurrentUser(_options);
        return result.toPromise();
    }

    /**
     * Users:Delete User
     * @param id
     */
    public usersDeleteUserWithHttpInfo(id: string, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.usersDeleteUserWithHttpInfo(id, _options);
        return result.toPromise();
    }

    /**
     * Users:Delete User
     * @param id
     */
    public usersDeleteUser(id: string, _options?: Configuration): Promise<void> {
        const result = this.api.usersDeleteUser(id, _options);
        return result.toPromise();
    }

    /**
     * Users:Patch Current User
     * @param userUpdate
     */
    public usersPatchCurrentUserWithHttpInfo(userUpdate: UserUpdate, _options?: Configuration): Promise<HttpInfo<UserRead>> {
        const result = this.api.usersPatchCurrentUserWithHttpInfo(userUpdate, _options);
        return result.toPromise();
    }

    /**
     * Users:Patch Current User
     * @param userUpdate
     */
    public usersPatchCurrentUser(userUpdate: UserUpdate, _options?: Configuration): Promise<UserRead> {
        const result = this.api.usersPatchCurrentUser(userUpdate, _options);
        return result.toPromise();
    }

    /**
     * Users:Patch User
     * @param id
     * @param userUpdate
     */
    public usersPatchUserWithHttpInfo(id: string, userUpdate: UserUpdate, _options?: Configuration): Promise<HttpInfo<UserRead>> {
        const result = this.api.usersPatchUserWithHttpInfo(id, userUpdate, _options);
        return result.toPromise();
    }

    /**
     * Users:Patch User
     * @param id
     * @param userUpdate
     */
    public usersPatchUser(id: string, userUpdate: UserUpdate, _options?: Configuration): Promise<UserRead> {
        const result = this.api.usersPatchUser(id, userUpdate, _options);
        return result.toPromise();
    }

    /**
     * Users:User
     * @param id
     */
    public usersUserWithHttpInfo(id: string, _options?: Configuration): Promise<HttpInfo<UserRead>> {
        const result = this.api.usersUserWithHttpInfo(id, _options);
        return result.toPromise();
    }

    /**
     * Users:User
     * @param id
     */
    public usersUser(id: string, _options?: Configuration): Promise<UserRead> {
        const result = this.api.usersUser(id, _options);
        return result.toPromise();
    }


}



