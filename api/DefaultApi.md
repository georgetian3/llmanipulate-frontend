# .DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createResponse**](DefaultApi.md#createResponse) | **POST** /submit_response | Create Response
[**getResponses**](DefaultApi.md#getResponses) | **GET** /responses | Get Responses
[**getResponsesByUser**](DefaultApi.md#getResponsesByUser) | **GET** /responses_by_user | Get Responses By User
[**root**](DefaultApi.md#root) | **GET** / | Root


# **createResponse**
> Response createResponse(newResponse)


### Example


```typescript
import { createConfiguration, DefaultApi } from '';
import type { DefaultApiCreateResponseRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DefaultApi(configuration);

const request: DefaultApiCreateResponseRequest = {
  
  newResponse: {
    taskName: "taskName_example",
    initialScores: {},
    convHistory: {},
    finalScores: {},
    userId: "userId_example",
  },
};

const data = await apiInstance.createResponse(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **newResponse** | **NewResponse**|  |


### Return type

**Response**

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

# **getResponses**
> any getResponses()


### Example


```typescript
import { createConfiguration, DefaultApi } from '';
import type { DefaultApiGetResponsesRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DefaultApi(configuration);

const request: DefaultApiGetResponsesRequest = {
  
  userId: "user_id_example",
};

const data = await apiInstance.getResponses(request);
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

# **getResponsesByUser**
> any getResponsesByUser()


### Example


```typescript
import { createConfiguration, DefaultApi } from '';
import type { DefaultApiGetResponsesByUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DefaultApi(configuration);

const request: DefaultApiGetResponsesByUserRequest = {
  
  userId: "user_id_example",
};

const data = await apiInstance.getResponsesByUser(request);
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
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **root**
> any root()


### Example


```typescript
import { createConfiguration, DefaultApi } from '';

const configuration = createConfiguration();
const apiInstance = new DefaultApi(configuration);

const request = {};

const data = await apiInstance.root(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


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

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


