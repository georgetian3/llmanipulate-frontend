# .UsersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createUser**](UsersApi.md#createUser) | **PUT** /users | Create User
[**getAllUsers**](UsersApi.md#getAllUsers) | **GET** /users | Get All Users
[**getAllUsersResponses**](UsersApi.md#getAllUsersResponses) | **GET** /users_responses | Get All Users Responses
[**getUser**](UsersApi.md#getUser) | **GET** /users/{user_id} | Get User
[**usersCurrentUser**](UsersApi.md#usersCurrentUser) | **GET** /users/me | Users:Current User
[**usersDeleteUser**](UsersApi.md#usersDeleteUser) | **DELETE** /users/{id} | Users:Delete User
[**usersPatchCurrentUser**](UsersApi.md#usersPatchCurrentUser) | **PATCH** /users/me | Users:Patch Current User
[**usersPatchUser**](UsersApi.md#usersPatchUser) | **PATCH** /users/{id} | Users:Patch User
[**usersUser**](UsersApi.md#usersUser) | **GET** /users/{id} | Users:User


# **createUser**
> User createUser(userCreate)

Creates a new non-admin user. Requires an admin\'s user_id for authentication.

### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiCreateUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiCreateUserRequest = {
  
  userCreate: {
    email: "email_example",
    password: "password_example",
    isActive: true,
    isSuperuser: true,
    isVerified: true,
  },
};

const data = await apiInstance.createUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userCreate** | **UserCreate**|  |


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAllUsers**
> Array<User> getAllUsers()


### Example


```typescript
import { createConfiguration, UsersApi } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request = {};

const data = await apiInstance.getAllUsers(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<User>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAllUsersResponses**
> Array<TaskResponse> getAllUsersResponses()


### Example


```typescript
import { createConfiguration, UsersApi } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request = {};

const data = await apiInstance.getAllUsersResponses(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<TaskResponse>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getUser**
> User getUser()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiGetUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiGetUserRequest = {
  
  userId: "user_id_example",
};

const data = await apiInstance.getUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | [**string**] |  | defaults to undefined


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **usersCurrentUser**
> UserRead usersCurrentUser()


### Example


```typescript
import { createConfiguration, UsersApi } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request = {};

const data = await apiInstance.usersCurrentUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**UserRead**

### Authorization

[OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**401** | Missing token or inactive user. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **usersDeleteUser**
> void usersDeleteUser()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiUsersDeleteUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiUsersDeleteUserRequest = {
  
  id: "id_example",
};

const data = await apiInstance.usersDeleteUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**void**

### Authorization

[OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | Successful Response |  -  |
**401** | Missing token or inactive user. |  -  |
**403** | Not a superuser. |  -  |
**404** | The user does not exist. |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **usersPatchCurrentUser**
> UserRead usersPatchCurrentUser(userUpdate)


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiUsersPatchCurrentUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiUsersPatchCurrentUserRequest = {
  
  userUpdate: {
    password: "password_example",
    email: "email_example",
    isActive: true,
    isSuperuser: true,
    isVerified: true,
  },
};

const data = await apiInstance.usersPatchCurrentUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userUpdate** | **UserUpdate**|  |


### Return type

**UserRead**

### Authorization

[OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**401** | Missing token or inactive user. |  -  |
**400** | Bad Request |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **usersPatchUser**
> UserRead usersPatchUser(userUpdate)


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiUsersPatchUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiUsersPatchUserRequest = {
  
  id: "id_example",
  
  userUpdate: {
    password: "password_example",
    email: "email_example",
    isActive: true,
    isSuperuser: true,
    isVerified: true,
  },
};

const data = await apiInstance.usersPatchUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userUpdate** | **UserUpdate**|  |
 **id** | [**string**] |  | defaults to undefined


### Return type

**UserRead**

### Authorization

[OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**401** | Missing token or inactive user. |  -  |
**403** | Not a superuser. |  -  |
**404** | The user does not exist. |  -  |
**400** | Bad Request |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **usersUser**
> UserRead usersUser()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiUsersUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiUsersUserRequest = {
  
  id: "id_example",
};

const data = await apiInstance.usersUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**UserRead**

### Authorization

[OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**401** | Missing token or inactive user. |  -  |
**403** | Not a superuser. |  -  |
**404** | The user does not exist. |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


