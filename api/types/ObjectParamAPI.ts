import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

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
import { Participant } from '../models/Participant';
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

import { ObservableAuthApi } from "./ObservableAPI";
import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";

export interface AuthApiAuthAuthLoginRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApiauthAuthLogin
     */
    username: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApiauthAuthLogin
     */
    password: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApiauthAuthLogin
     */
    grantType?: string
    /**
     * 
     * Defaults to: &#39;&#39;
     * @type string
     * @memberof AuthApiauthAuthLogin
     */
    scope?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApiauthAuthLogin
     */
    clientId?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApiauthAuthLogin
     */
    clientSecret?: string
}

export interface AuthApiAuthAuthLogoutRequest {
}

export interface AuthApiRegisterRegisterRequest {
    /**
     * 
     * @type UserCreate
     * @memberof AuthApiregisterRegister
     */
    userCreate: UserCreate
}

export interface AuthApiResetForgotPasswordRequest {
    /**
     * 
     * @type BodyResetForgotPasswordAuthForgotPasswordPost
     * @memberof AuthApiresetForgotPassword
     */
    bodyResetForgotPasswordAuthForgotPasswordPost: BodyResetForgotPasswordAuthForgotPasswordPost
}

export interface AuthApiResetResetPasswordRequest {
    /**
     * 
     * @type BodyResetResetPasswordAuthResetPasswordPost
     * @memberof AuthApiresetResetPassword
     */
    bodyResetResetPasswordAuthResetPasswordPost: BodyResetResetPasswordAuthResetPasswordPost
}

export interface AuthApiVerifyRequestTokenRequest {
    /**
     * 
     * @type BodyVerifyRequestTokenAuthRequestVerifyTokenPost
     * @memberof AuthApiverifyRequestToken
     */
    bodyVerifyRequestTokenAuthRequestVerifyTokenPost: BodyVerifyRequestTokenAuthRequestVerifyTokenPost
}

export interface AuthApiVerifyVerifyRequest {
    /**
     * 
     * @type BodyVerifyVerifyAuthVerifyPost
     * @memberof AuthApiverifyVerify
     */
    bodyVerifyVerifyAuthVerifyPost: BodyVerifyVerifyAuthVerifyPost
}

export class ObjectAuthApi {
    private api: ObservableAuthApi

    public constructor(configuration: Configuration, requestFactory?: AuthApiRequestFactory, responseProcessor?: AuthApiResponseProcessor) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Auth:Auth.Login
     * @param param the request object
     */
    public authAuthLoginWithHttpInfo(param: AuthApiAuthAuthLoginRequest, options?: Configuration): Promise<HttpInfo<BearerResponse>> {
        return this.api.authAuthLoginWithHttpInfo(param.username, param.password, param.grantType, param.scope, param.clientId, param.clientSecret,  options).toPromise();
    }

    /**
     * Auth:Auth.Login
     * @param param the request object
     */
    public authAuthLogin(param: AuthApiAuthAuthLoginRequest, options?: Configuration): Promise<BearerResponse> {
        return this.api.authAuthLogin(param.username, param.password, param.grantType, param.scope, param.clientId, param.clientSecret,  options).toPromise();
    }

    /**
     * Auth:Auth.Logout
     * @param param the request object
     */
    public authAuthLogoutWithHttpInfo(param: AuthApiAuthAuthLogoutRequest = {}, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.authAuthLogoutWithHttpInfo( options).toPromise();
    }

    /**
     * Auth:Auth.Logout
     * @param param the request object
     */
    public authAuthLogout(param: AuthApiAuthAuthLogoutRequest = {}, options?: Configuration): Promise<any> {
        return this.api.authAuthLogout( options).toPromise();
    }

    /**
     * Register:Register
     * @param param the request object
     */
    public registerRegisterWithHttpInfo(param: AuthApiRegisterRegisterRequest, options?: Configuration): Promise<HttpInfo<UserRead>> {
        return this.api.registerRegisterWithHttpInfo(param.userCreate,  options).toPromise();
    }

    /**
     * Register:Register
     * @param param the request object
     */
    public registerRegister(param: AuthApiRegisterRegisterRequest, options?: Configuration): Promise<UserRead> {
        return this.api.registerRegister(param.userCreate,  options).toPromise();
    }

    /**
     * Reset:Forgot Password
     * @param param the request object
     */
    public resetForgotPasswordWithHttpInfo(param: AuthApiResetForgotPasswordRequest, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.resetForgotPasswordWithHttpInfo(param.bodyResetForgotPasswordAuthForgotPasswordPost,  options).toPromise();
    }

    /**
     * Reset:Forgot Password
     * @param param the request object
     */
    public resetForgotPassword(param: AuthApiResetForgotPasswordRequest, options?: Configuration): Promise<any> {
        return this.api.resetForgotPassword(param.bodyResetForgotPasswordAuthForgotPasswordPost,  options).toPromise();
    }

    /**
     * Reset:Reset Password
     * @param param the request object
     */
    public resetResetPasswordWithHttpInfo(param: AuthApiResetResetPasswordRequest, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.resetResetPasswordWithHttpInfo(param.bodyResetResetPasswordAuthResetPasswordPost,  options).toPromise();
    }

    /**
     * Reset:Reset Password
     * @param param the request object
     */
    public resetResetPassword(param: AuthApiResetResetPasswordRequest, options?: Configuration): Promise<any> {
        return this.api.resetResetPassword(param.bodyResetResetPasswordAuthResetPasswordPost,  options).toPromise();
    }

    /**
     * Verify:Request-Token
     * @param param the request object
     */
    public verifyRequestTokenWithHttpInfo(param: AuthApiVerifyRequestTokenRequest, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.verifyRequestTokenWithHttpInfo(param.bodyVerifyRequestTokenAuthRequestVerifyTokenPost,  options).toPromise();
    }

    /**
     * Verify:Request-Token
     * @param param the request object
     */
    public verifyRequestToken(param: AuthApiVerifyRequestTokenRequest, options?: Configuration): Promise<any> {
        return this.api.verifyRequestToken(param.bodyVerifyRequestTokenAuthRequestVerifyTokenPost,  options).toPromise();
    }

    /**
     * Verify:Verify
     * @param param the request object
     */
    public verifyVerifyWithHttpInfo(param: AuthApiVerifyVerifyRequest, options?: Configuration): Promise<HttpInfo<UserRead>> {
        return this.api.verifyVerifyWithHttpInfo(param.bodyVerifyVerifyAuthVerifyPost,  options).toPromise();
    }

    /**
     * Verify:Verify
     * @param param the request object
     */
    public verifyVerify(param: AuthApiVerifyVerifyRequest, options?: Configuration): Promise<UserRead> {
        return this.api.verifyVerify(param.bodyVerifyVerifyAuthVerifyPost,  options).toPromise();
    }

}

import { ObservableChatsApi } from "./ObservableAPI";
import { ChatsApiRequestFactory, ChatsApiResponseProcessor} from "../apis/ChatsApi";

export interface ChatsApiGetChatRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof ChatsApigetChat
     */
    id: string
}

export class ObjectChatsApi {
    private api: ObservableChatsApi

    public constructor(configuration: Configuration, requestFactory?: ChatsApiRequestFactory, responseProcessor?: ChatsApiResponseProcessor) {
        this.api = new ObservableChatsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get Chat
     * @param param the request object
     */
    public getChatWithHttpInfo(param: ChatsApiGetChatRequest, options?: Configuration): Promise<HttpInfo<ChatHistoryRead>> {
        return this.api.getChatWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Get Chat
     * @param param the request object
     */
    public getChat(param: ChatsApiGetChatRequest, options?: Configuration): Promise<ChatHistoryRead> {
        return this.api.getChat(param.id,  options).toPromise();
    }

}

import { ObservableResponsesApi } from "./ObservableAPI";
import { ResponsesApiRequestFactory, ResponsesApiResponseProcessor} from "../apis/ResponsesApi";

export interface ResponsesApiGetResponsesRequest {
}

export class ObjectResponsesApi {
    private api: ObservableResponsesApi

    public constructor(configuration: Configuration, requestFactory?: ResponsesApiRequestFactory, responseProcessor?: ResponsesApiResponseProcessor) {
        this.api = new ObservableResponsesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get Responses
     * @param param the request object
     */
    public getResponsesWithHttpInfo(param: ResponsesApiGetResponsesRequest = {}, options?: Configuration): Promise<HttpInfo<any>> {
        return this.api.getResponsesWithHttpInfo( options).toPromise();
    }

    /**
     * Get Responses
     * @param param the request object
     */
    public getResponses(param: ResponsesApiGetResponsesRequest = {}, options?: Configuration): Promise<any> {
        return this.api.getResponses( options).toPromise();
    }

}

import { ObservableTasksApi } from "./ObservableAPI";
import { TasksApiRequestFactory, TasksApiResponseProcessor} from "../apis/TasksApi";

export interface TasksApiCreateTaskResponseRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof TasksApicreateTaskResponse
     */
    taskId: string
    /**
     * 
     * @type TaskResponseCreate
     * @memberof TasksApicreateTaskResponse
     */
    taskResponseCreate: TaskResponseCreate
}

export interface TasksApiGetAllTasksRequest {
}

export interface TasksApiGetSampleTaskRequest {
}

export interface TasksApiGetTaskRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof TasksApigetTask
     */
    taskId: string
}

export interface TasksApiGetTaskResponseRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof TasksApigetTaskResponse
     */
    taskId: string
}

export class ObjectTasksApi {
    private api: ObservableTasksApi

    public constructor(configuration: Configuration, requestFactory?: TasksApiRequestFactory, responseProcessor?: TasksApiResponseProcessor) {
        this.api = new ObservableTasksApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Task Response
     * @param param the request object
     */
    public createTaskResponseWithHttpInfo(param: TasksApiCreateTaskResponseRequest, options?: Configuration): Promise<HttpInfo<TaskResponseRead>> {
        return this.api.createTaskResponseWithHttpInfo(param.taskId, param.taskResponseCreate,  options).toPromise();
    }

    /**
     * Create Task Response
     * @param param the request object
     */
    public createTaskResponse(param: TasksApiCreateTaskResponseRequest, options?: Configuration): Promise<TaskResponseRead> {
        return this.api.createTaskResponse(param.taskId, param.taskResponseCreate,  options).toPromise();
    }

    /**
     * Get All Tasks
     * @param param the request object
     */
    public getAllTasksWithHttpInfo(param: TasksApiGetAllTasksRequest = {}, options?: Configuration): Promise<HttpInfo<Array<TaskRead>>> {
        return this.api.getAllTasksWithHttpInfo( options).toPromise();
    }

    /**
     * Get All Tasks
     * @param param the request object
     */
    public getAllTasks(param: TasksApiGetAllTasksRequest = {}, options?: Configuration): Promise<Array<TaskRead>> {
        return this.api.getAllTasks( options).toPromise();
    }

    /**
     * Get Sample Task
     * @param param the request object
     */
    public getSampleTaskWithHttpInfo(param: TasksApiGetSampleTaskRequest = {}, options?: Configuration): Promise<HttpInfo<TaskRead>> {
        return this.api.getSampleTaskWithHttpInfo( options).toPromise();
    }

    /**
     * Get Sample Task
     * @param param the request object
     */
    public getSampleTask(param: TasksApiGetSampleTaskRequest = {}, options?: Configuration): Promise<TaskRead> {
        return this.api.getSampleTask( options).toPromise();
    }

    /**
     * Get Task
     * @param param the request object
     */
    public getTaskWithHttpInfo(param: TasksApiGetTaskRequest, options?: Configuration): Promise<HttpInfo<TaskRead>> {
        return this.api.getTaskWithHttpInfo(param.taskId,  options).toPromise();
    }

    /**
     * Get Task
     * @param param the request object
     */
    public getTask(param: TasksApiGetTaskRequest, options?: Configuration): Promise<TaskRead> {
        return this.api.getTask(param.taskId,  options).toPromise();
    }

    /**
     * Get Task Response
     * @param param the request object
     */
    public getTaskResponseWithHttpInfo(param: TasksApiGetTaskResponseRequest, options?: Configuration): Promise<HttpInfo<TaskResponseRead>> {
        return this.api.getTaskResponseWithHttpInfo(param.taskId,  options).toPromise();
    }

    /**
     * Get Task Response
     * @param param the request object
     */
    public getTaskResponse(param: TasksApiGetTaskResponseRequest, options?: Configuration): Promise<TaskResponseRead> {
        return this.api.getTaskResponse(param.taskId,  options).toPromise();
    }

}

import { ObservableUsersApi } from "./ObservableAPI";
import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";

export interface UsersApiCreateUserRequest {
    /**
     * 
     * @type UserCreate
     * @memberof UsersApicreateUser
     */
    userCreate: UserCreate
}

export interface UsersApiGetAllUsersRequest {
}

export interface UsersApiGetAllUsersResponsesRequest {
}

export interface UsersApiGetMyTasksRequest {
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

export interface UsersApiUsersCurrentUserRequest {
}

export interface UsersApiUsersDeleteUserRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApiusersDeleteUser
     */
    id: string
}

export interface UsersApiUsersPatchCurrentUserRequest {
    /**
     * 
     * @type UserUpdate
     * @memberof UsersApiusersPatchCurrentUser
     */
    userUpdate: UserUpdate
}

export interface UsersApiUsersPatchUserRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApiusersPatchUser
     */
    id: string
    /**
     * 
     * @type UserUpdate
     * @memberof UsersApiusersPatchUser
     */
    userUpdate: UserUpdate
}

export interface UsersApiUsersUserRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApiusersUser
     */
    id: string
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
        return this.api.createUserWithHttpInfo(param.userCreate,  options).toPromise();
    }

    /**
     * Creates a new non-admin user. Requires an admin\'s user_id for authentication.
     * Create User
     * @param param the request object
     */
    public createUser(param: UsersApiCreateUserRequest, options?: Configuration): Promise<User> {
        return this.api.createUser(param.userCreate,  options).toPromise();
    }

    /**
     * Get All Users
     * @param param the request object
     */
    public getAllUsersWithHttpInfo(param: UsersApiGetAllUsersRequest = {}, options?: Configuration): Promise<HttpInfo<Array<User>>> {
        return this.api.getAllUsersWithHttpInfo( options).toPromise();
    }

    /**
     * Get All Users
     * @param param the request object
     */
    public getAllUsers(param: UsersApiGetAllUsersRequest = {}, options?: Configuration): Promise<Array<User>> {
        return this.api.getAllUsers( options).toPromise();
    }

    /**
     * Get All Users Responses
     * @param param the request object
     */
    public getAllUsersResponsesWithHttpInfo(param: UsersApiGetAllUsersResponsesRequest = {}, options?: Configuration): Promise<HttpInfo<Array<TaskResponse>>> {
        return this.api.getAllUsersResponsesWithHttpInfo( options).toPromise();
    }

    /**
     * Get All Users Responses
     * @param param the request object
     */
    public getAllUsersResponses(param: UsersApiGetAllUsersResponsesRequest = {}, options?: Configuration): Promise<Array<TaskResponse>> {
        return this.api.getAllUsersResponses( options).toPromise();
    }

    /**
     * Get My Tasks
     * @param param the request object
     */
    public getMyTasksWithHttpInfo(param: UsersApiGetMyTasksRequest = {}, options?: Configuration): Promise<HttpInfo<Array<TaskRead>>> {
        return this.api.getMyTasksWithHttpInfo( options).toPromise();
    }

    /**
     * Get My Tasks
     * @param param the request object
     */
    public getMyTasks(param: UsersApiGetMyTasksRequest = {}, options?: Configuration): Promise<Array<TaskRead>> {
        return this.api.getMyTasks( options).toPromise();
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

    /**
     * Users:Current User
     * @param param the request object
     */
    public usersCurrentUserWithHttpInfo(param: UsersApiUsersCurrentUserRequest = {}, options?: Configuration): Promise<HttpInfo<UserRead>> {
        return this.api.usersCurrentUserWithHttpInfo( options).toPromise();
    }

    /**
     * Users:Current User
     * @param param the request object
     */
    public usersCurrentUser(param: UsersApiUsersCurrentUserRequest = {}, options?: Configuration): Promise<UserRead> {
        return this.api.usersCurrentUser( options).toPromise();
    }

    /**
     * Users:Delete User
     * @param param the request object
     */
    public usersDeleteUserWithHttpInfo(param: UsersApiUsersDeleteUserRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.usersDeleteUserWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Users:Delete User
     * @param param the request object
     */
    public usersDeleteUser(param: UsersApiUsersDeleteUserRequest, options?: Configuration): Promise<void> {
        return this.api.usersDeleteUser(param.id,  options).toPromise();
    }

    /**
     * Users:Patch Current User
     * @param param the request object
     */
    public usersPatchCurrentUserWithHttpInfo(param: UsersApiUsersPatchCurrentUserRequest, options?: Configuration): Promise<HttpInfo<UserRead>> {
        return this.api.usersPatchCurrentUserWithHttpInfo(param.userUpdate,  options).toPromise();
    }

    /**
     * Users:Patch Current User
     * @param param the request object
     */
    public usersPatchCurrentUser(param: UsersApiUsersPatchCurrentUserRequest, options?: Configuration): Promise<UserRead> {
        return this.api.usersPatchCurrentUser(param.userUpdate,  options).toPromise();
    }

    /**
     * Users:Patch User
     * @param param the request object
     */
    public usersPatchUserWithHttpInfo(param: UsersApiUsersPatchUserRequest, options?: Configuration): Promise<HttpInfo<UserRead>> {
        return this.api.usersPatchUserWithHttpInfo(param.id, param.userUpdate,  options).toPromise();
    }

    /**
     * Users:Patch User
     * @param param the request object
     */
    public usersPatchUser(param: UsersApiUsersPatchUserRequest, options?: Configuration): Promise<UserRead> {
        return this.api.usersPatchUser(param.id, param.userUpdate,  options).toPromise();
    }

    /**
     * Users:User
     * @param param the request object
     */
    public usersUserWithHttpInfo(param: UsersApiUsersUserRequest, options?: Configuration): Promise<HttpInfo<UserRead>> {
        return this.api.usersUserWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Users:User
     * @param param the request object
     */
    public usersUser(param: UsersApiUsersUserRequest, options?: Configuration): Promise<UserRead> {
        return this.api.usersUser(param.id,  options).toPromise();
    }

}
