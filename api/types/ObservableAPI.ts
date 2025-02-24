import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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
import { FreeText } from '../models/FreeText';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { Id } from '../models/Id';
import { MultiChoice } from '../models/MultiChoice';
import { Participant } from '../models/Participant';
import { SingleChoice } from '../models/SingleChoice';
import { Slider } from '../models/Slider';
import { TaskConfig } from '../models/TaskConfig';
import { TaskPage } from '../models/TaskPage';
import { TaskResponse } from '../models/TaskResponse';
import { Translations } from '../models/Translations';
import { User } from '../models/User';
import { UserCreate } from '../models/UserCreate';
import { UserRead } from '../models/UserRead';
import { UserUpdate } from '../models/UserUpdate';
import { ValidationError } from '../models/ValidationError';
import { ValidationErrorLocInner } from '../models/ValidationErrorLocInner';

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class ObservableAuthApi {
    private requestFactory: AuthApiRequestFactory;
    private responseProcessor: AuthApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new AuthApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new AuthApiResponseProcessor();
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
    public authAuthLoginWithHttpInfo(username: string, password: string, grantType?: string, scope?: string, clientId?: string, clientSecret?: string, _options?: Configuration): Observable<HttpInfo<BearerResponse>> {
        const requestContextPromise = this.requestFactory.authAuthLogin(username, password, grantType, scope, clientId, clientSecret, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.authAuthLoginWithHttpInfo(rsp)));
            }));
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
    public authAuthLogin(username: string, password: string, grantType?: string, scope?: string, clientId?: string, clientSecret?: string, _options?: Configuration): Observable<BearerResponse> {
        return this.authAuthLoginWithHttpInfo(username, password, grantType, scope, clientId, clientSecret, _options).pipe(map((apiResponse: HttpInfo<BearerResponse>) => apiResponse.data));
    }

    /**
     * Auth:Auth.Logout
     */
    public authAuthLogoutWithHttpInfo(_options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.authAuthLogout(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.authAuthLogoutWithHttpInfo(rsp)));
            }));
    }

    /**
     * Auth:Auth.Logout
     */
    public authAuthLogout(_options?: Configuration): Observable<any> {
        return this.authAuthLogoutWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Register:Register
     * @param userCreate
     */
    public registerRegisterWithHttpInfo(userCreate: UserCreate, _options?: Configuration): Observable<HttpInfo<UserRead>> {
        const requestContextPromise = this.requestFactory.registerRegister(userCreate, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.registerRegisterWithHttpInfo(rsp)));
            }));
    }

    /**
     * Register:Register
     * @param userCreate
     */
    public registerRegister(userCreate: UserCreate, _options?: Configuration): Observable<UserRead> {
        return this.registerRegisterWithHttpInfo(userCreate, _options).pipe(map((apiResponse: HttpInfo<UserRead>) => apiResponse.data));
    }

    /**
     * Reset:Forgot Password
     * @param bodyResetForgotPasswordAuthForgotPasswordPost
     */
    public resetForgotPasswordWithHttpInfo(bodyResetForgotPasswordAuthForgotPasswordPost: BodyResetForgotPasswordAuthForgotPasswordPost, _options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.resetForgotPassword(bodyResetForgotPasswordAuthForgotPasswordPost, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.resetForgotPasswordWithHttpInfo(rsp)));
            }));
    }

    /**
     * Reset:Forgot Password
     * @param bodyResetForgotPasswordAuthForgotPasswordPost
     */
    public resetForgotPassword(bodyResetForgotPasswordAuthForgotPasswordPost: BodyResetForgotPasswordAuthForgotPasswordPost, _options?: Configuration): Observable<any> {
        return this.resetForgotPasswordWithHttpInfo(bodyResetForgotPasswordAuthForgotPasswordPost, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Reset:Reset Password
     * @param bodyResetResetPasswordAuthResetPasswordPost
     */
    public resetResetPasswordWithHttpInfo(bodyResetResetPasswordAuthResetPasswordPost: BodyResetResetPasswordAuthResetPasswordPost, _options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.resetResetPassword(bodyResetResetPasswordAuthResetPasswordPost, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.resetResetPasswordWithHttpInfo(rsp)));
            }));
    }

    /**
     * Reset:Reset Password
     * @param bodyResetResetPasswordAuthResetPasswordPost
     */
    public resetResetPassword(bodyResetResetPasswordAuthResetPasswordPost: BodyResetResetPasswordAuthResetPasswordPost, _options?: Configuration): Observable<any> {
        return this.resetResetPasswordWithHttpInfo(bodyResetResetPasswordAuthResetPasswordPost, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Verify:Request-Token
     * @param bodyVerifyRequestTokenAuthRequestVerifyTokenPost
     */
    public verifyRequestTokenWithHttpInfo(bodyVerifyRequestTokenAuthRequestVerifyTokenPost: BodyVerifyRequestTokenAuthRequestVerifyTokenPost, _options?: Configuration): Observable<HttpInfo<any>> {
        const requestContextPromise = this.requestFactory.verifyRequestToken(bodyVerifyRequestTokenAuthRequestVerifyTokenPost, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.verifyRequestTokenWithHttpInfo(rsp)));
            }));
    }

    /**
     * Verify:Request-Token
     * @param bodyVerifyRequestTokenAuthRequestVerifyTokenPost
     */
    public verifyRequestToken(bodyVerifyRequestTokenAuthRequestVerifyTokenPost: BodyVerifyRequestTokenAuthRequestVerifyTokenPost, _options?: Configuration): Observable<any> {
        return this.verifyRequestTokenWithHttpInfo(bodyVerifyRequestTokenAuthRequestVerifyTokenPost, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Verify:Verify
     * @param bodyVerifyVerifyAuthVerifyPost
     */
    public verifyVerifyWithHttpInfo(bodyVerifyVerifyAuthVerifyPost: BodyVerifyVerifyAuthVerifyPost, _options?: Configuration): Observable<HttpInfo<UserRead>> {
        const requestContextPromise = this.requestFactory.verifyVerify(bodyVerifyVerifyAuthVerifyPost, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.verifyVerifyWithHttpInfo(rsp)));
            }));
    }

    /**
     * Verify:Verify
     * @param bodyVerifyVerifyAuthVerifyPost
     */
    public verifyVerify(bodyVerifyVerifyAuthVerifyPost: BodyVerifyVerifyAuthVerifyPost, _options?: Configuration): Observable<UserRead> {
        return this.verifyVerifyWithHttpInfo(bodyVerifyVerifyAuthVerifyPost, _options).pipe(map((apiResponse: HttpInfo<UserRead>) => apiResponse.data));
    }

}

import { ChatsApiRequestFactory, ChatsApiResponseProcessor} from "../apis/ChatsApi";
export class ObservableChatsApi {
    private requestFactory: ChatsApiRequestFactory;
    private responseProcessor: ChatsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: ChatsApiRequestFactory,
        responseProcessor?: ChatsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new ChatsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new ChatsApiResponseProcessor();
    }

    /**
     * Get Chat
     * @param id
     */
    public getChatWithHttpInfo(id: string, _options?: Configuration): Observable<HttpInfo<ChatHistoryRead>> {
        const requestContextPromise = this.requestFactory.getChat(id, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getChatWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Chat
     * @param id
     */
    public getChat(id: string, _options?: Configuration): Observable<ChatHistoryRead> {
        return this.getChatWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<ChatHistoryRead>) => apiResponse.data));
    }

}

import { TasksApiRequestFactory, TasksApiResponseProcessor} from "../apis/TasksApi";
export class ObservableTasksApi {
    private requestFactory: TasksApiRequestFactory;
    private responseProcessor: TasksApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: TasksApiRequestFactory,
        responseProcessor?: TasksApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new TasksApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new TasksApiResponseProcessor();
    }

    /**
     * Get Task
     * @param id
     */
    public getTaskWithHttpInfo(id: string, _options?: Configuration): Observable<HttpInfo<TaskConfig>> {
        const requestContextPromise = this.requestFactory.getTask(id, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getTaskWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get Task
     * @param id
     */
    public getTask(id: string, _options?: Configuration): Observable<TaskConfig> {
        return this.getTaskWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<TaskConfig>) => apiResponse.data));
    }

}

import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";
export class ObservableUsersApi {
    private requestFactory: UsersApiRequestFactory;
    private responseProcessor: UsersApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: UsersApiRequestFactory,
        responseProcessor?: UsersApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new UsersApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new UsersApiResponseProcessor();
    }

    /**
     * Creates a new non-admin user. Requires an admin\'s user_id for authentication.
     * Create User
     * @param userCreate
     */
    public createUserWithHttpInfo(userCreate: UserCreate, _options?: Configuration): Observable<HttpInfo<User>> {
        const requestContextPromise = this.requestFactory.createUser(userCreate, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createUserWithHttpInfo(rsp)));
            }));
    }

    /**
     * Creates a new non-admin user. Requires an admin\'s user_id for authentication.
     * Create User
     * @param userCreate
     */
    public createUser(userCreate: UserCreate, _options?: Configuration): Observable<User> {
        return this.createUserWithHttpInfo(userCreate, _options).pipe(map((apiResponse: HttpInfo<User>) => apiResponse.data));
    }

    /**
     * Get All Users
     */
    public getAllUsersWithHttpInfo(_options?: Configuration): Observable<HttpInfo<Array<User>>> {
        const requestContextPromise = this.requestFactory.getAllUsers(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAllUsersWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get All Users
     */
    public getAllUsers(_options?: Configuration): Observable<Array<User>> {
        return this.getAllUsersWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<User>>) => apiResponse.data));
    }

    /**
     * Get All Users Responses
     */
    public getAllUsersResponsesWithHttpInfo(_options?: Configuration): Observable<HttpInfo<Array<TaskResponse>>> {
        const requestContextPromise = this.requestFactory.getAllUsersResponses(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAllUsersResponsesWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get All Users Responses
     */
    public getAllUsersResponses(_options?: Configuration): Observable<Array<TaskResponse>> {
        return this.getAllUsersResponsesWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<TaskResponse>>) => apiResponse.data));
    }

    /**
     * Get User
     * @param userId
     */
    public getUserWithHttpInfo(userId: string, _options?: Configuration): Observable<HttpInfo<User>> {
        const requestContextPromise = this.requestFactory.getUser(userId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getUserWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get User
     * @param userId
     */
    public getUser(userId: string, _options?: Configuration): Observable<User> {
        return this.getUserWithHttpInfo(userId, _options).pipe(map((apiResponse: HttpInfo<User>) => apiResponse.data));
    }

    /**
     * Users:Current User
     */
    public usersCurrentUserWithHttpInfo(_options?: Configuration): Observable<HttpInfo<UserRead>> {
        const requestContextPromise = this.requestFactory.usersCurrentUser(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersCurrentUserWithHttpInfo(rsp)));
            }));
    }

    /**
     * Users:Current User
     */
    public usersCurrentUser(_options?: Configuration): Observable<UserRead> {
        return this.usersCurrentUserWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<UserRead>) => apiResponse.data));
    }

    /**
     * Users:Delete User
     * @param id
     */
    public usersDeleteUserWithHttpInfo(id: string, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.usersDeleteUser(id, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersDeleteUserWithHttpInfo(rsp)));
            }));
    }

    /**
     * Users:Delete User
     * @param id
     */
    public usersDeleteUser(id: string, _options?: Configuration): Observable<void> {
        return this.usersDeleteUserWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * Users:Patch Current User
     * @param userUpdate
     */
    public usersPatchCurrentUserWithHttpInfo(userUpdate: UserUpdate, _options?: Configuration): Observable<HttpInfo<UserRead>> {
        const requestContextPromise = this.requestFactory.usersPatchCurrentUser(userUpdate, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersPatchCurrentUserWithHttpInfo(rsp)));
            }));
    }

    /**
     * Users:Patch Current User
     * @param userUpdate
     */
    public usersPatchCurrentUser(userUpdate: UserUpdate, _options?: Configuration): Observable<UserRead> {
        return this.usersPatchCurrentUserWithHttpInfo(userUpdate, _options).pipe(map((apiResponse: HttpInfo<UserRead>) => apiResponse.data));
    }

    /**
     * Users:Patch User
     * @param id
     * @param userUpdate
     */
    public usersPatchUserWithHttpInfo(id: string, userUpdate: UserUpdate, _options?: Configuration): Observable<HttpInfo<UserRead>> {
        const requestContextPromise = this.requestFactory.usersPatchUser(id, userUpdate, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersPatchUserWithHttpInfo(rsp)));
            }));
    }

    /**
     * Users:Patch User
     * @param id
     * @param userUpdate
     */
    public usersPatchUser(id: string, userUpdate: UserUpdate, _options?: Configuration): Observable<UserRead> {
        return this.usersPatchUserWithHttpInfo(id, userUpdate, _options).pipe(map((apiResponse: HttpInfo<UserRead>) => apiResponse.data));
    }

    /**
     * Users:User
     * @param id
     */
    public usersUserWithHttpInfo(id: string, _options?: Configuration): Observable<HttpInfo<UserRead>> {
        const requestContextPromise = this.requestFactory.usersUser(id, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersUserWithHttpInfo(rsp)));
            }));
    }

    /**
     * Users:User
     * @param id
     */
    public usersUser(id: string, _options?: Configuration): Observable<UserRead> {
        return this.usersUserWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<UserRead>) => apiResponse.data));
    }

}
