# .TasksApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getTask**](TasksApi.md#getTask) | **GET** /tasks/{id} | Get Task


# **getTask**
> TaskConfig getTask()


### Example


```typescript
import { createConfiguration, TasksApi } from '';
import type { TasksApiGetTaskRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TasksApi(configuration);

const request: TasksApiGetTaskRequest = {
  
  id: "id_example",
};

const data = await apiInstance.getTask(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**TaskConfig**

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


