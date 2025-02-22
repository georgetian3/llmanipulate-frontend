# .ChatApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getChat**](ChatApi.md#getChat) | **GET** /chat/{id} | Get Chat


# **getChat**
> ChatHistory getChat()


### Example


```typescript
import { createConfiguration, ChatApi } from '';
import type { ChatApiGetChatRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ChatApi(configuration);

const request: ChatApiGetChatRequest = {
  
  id: "id_example",
};

const data = await apiInstance.getChat(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**ChatHistory**

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


