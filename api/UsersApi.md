# .UsersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createUser**](UsersApi.md#createUser) | **PUT** /users | Create User
[**getAllUsers**](UsersApi.md#getAllUsers) | **GET** /users | Get All Users
[**getAllUsersResponses**](UsersApi.md#getAllUsersResponses) | **GET** /users_responses | Get All Users Responses
[**getUser**](UsersApi.md#getUser) | **GET** /users/{user_id} | Get User


# **createUser**
> User createUser(newUser)

Creates a new non-admin user. Requires an admin\'s user_id for authentication.

### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiCreateUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiCreateUserRequest = {
  
  userId: "user_id_example",
  
  newUser: {
    demographics: {},
    personality: {},
    agentType: 0.0,
    taskType: 0.0,
    id: "id_example",
  },
};

const data = await apiInstance.createUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **newUser** | **NewUser**|  |
 **userId** | [**string**] |  | defaults to undefined


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
**401** | Not authenticated |  -  |
**403** | Admin privileges required |  -  |
**400** | Bad Request |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAllUsers**
> Array<User> getAllUsers()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiGetAllUsersRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiGetAllUsersRequest = {
  
  userId: "user_id_example",
};

const data = await apiInstance.getAllUsers(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | [**string**] |  | defaults to undefined


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
**401** | Not authenticated |  -  |
**403** | Admin privileges required |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAllUsersResponses**
> any getAllUsersResponses()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiGetAllUsersResponsesRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiGetAllUsersResponsesRequest = {
  
  userId: "user_id_example",
};

const data = await apiInstance.getAllUsersResponses(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | [**string**] |  | defaults to undefined


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**401** | Not authenticated |  -  |
**403** | Admin privileges required |  -  |
**422** | Validation Error |  -  |

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
**401** | Not authenticated |  -  |
**403** | Admin privileges required |  -  |
**404** | Object not found |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


