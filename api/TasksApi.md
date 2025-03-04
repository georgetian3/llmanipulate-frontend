# .TasksApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createTaskResponse**](TasksApi.md#createTaskResponse) | **POST** /tasks/{task_id}/response | Create Task Response
[**getAllTasks**](TasksApi.md#getAllTasks) | **GET** /tasks/ | Get All Tasks
[**getSampleTask**](TasksApi.md#getSampleTask) | **GET** /tasks/sample | Get Sample Task
[**getTask**](TasksApi.md#getTask) | **GET** /tasks/{task_id} | Get Task
[**getTaskResponse**](TasksApi.md#getTaskResponse) | **GET** /tasks/{task_id}/response | Get Task Response


# **createTaskResponse**
> TaskResponseRead createTaskResponse(taskResponseCreate)


### Example


```typescript
import { createConfiguration, TasksApi } from '';
import type { TasksApiCreateTaskResponseRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TasksApi(configuration);

const request: TasksApiCreateTaskResponseRequest = {
  
  taskId: "task_id_example",
  
  taskResponseCreate: {
    task: "task_example",
    draft: false,
    response: {
      "key": null,
    },
  },
};

const data = await apiInstance.createTaskResponse(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **taskResponseCreate** | **TaskResponseCreate**|  |
 **taskId** | [**string**] |  | defaults to undefined


### Return type

**TaskResponseRead**

### Authorization

[OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAllTasks**
> Array<TaskRead> getAllTasks()


### Example


```typescript
import { createConfiguration, TasksApi } from '';

const configuration = createConfiguration();
const apiInstance = new TasksApi(configuration);

const request = {};

const data = await apiInstance.getAllTasks(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<TaskRead>**

### Authorization

[OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getSampleTask**
> TaskRead getSampleTask()


### Example


```typescript
import { createConfiguration, TasksApi } from '';

const configuration = createConfiguration();
const apiInstance = new TasksApi(configuration);

const request = {};

const data = await apiInstance.getSampleTask(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**TaskRead**

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

# **getTask**
> TaskRead getTask()


### Example


```typescript
import { createConfiguration, TasksApi } from '';
import type { TasksApiGetTaskRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TasksApi(configuration);

const request: TasksApiGetTaskRequest = {
  
  taskId: "task_id_example",
};

const data = await apiInstance.getTask(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **taskId** | [**string**] |  | defaults to undefined


### Return type

**TaskRead**

### Authorization

[OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**403** | Forbidden |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getTaskResponse**
> TaskResponseRead getTaskResponse()


### Example


```typescript
import { createConfiguration, TasksApi } from '';
import type { TasksApiGetTaskResponseRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TasksApi(configuration);

const request: TasksApiGetTaskResponseRequest = {
  
  taskId: "task_id_example",
};

const data = await apiInstance.getTaskResponse(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **taskId** | [**string**] |  | defaults to undefined


### Return type

**TaskResponseRead**

### Authorization

[OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


