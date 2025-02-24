# .AuthApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authAuthLogin**](AuthApi.md#authAuthLogin) | **POST** /auth/login | Auth:Auth.Login
[**authAuthLogout**](AuthApi.md#authAuthLogout) | **POST** /auth/logout | Auth:Auth.Logout
[**registerRegister**](AuthApi.md#registerRegister) | **POST** /auth/register | Register:Register
[**resetForgotPassword**](AuthApi.md#resetForgotPassword) | **POST** /auth/forgot-password | Reset:Forgot Password
[**resetResetPassword**](AuthApi.md#resetResetPassword) | **POST** /auth/reset-password | Reset:Reset Password
[**verifyRequestToken**](AuthApi.md#verifyRequestToken) | **POST** /auth/request-verify-token | Verify:Request-Token
[**verifyVerify**](AuthApi.md#verifyVerify) | **POST** /auth/verify | Verify:Verify


# **authAuthLogin**
> BearerResponse authAuthLogin()


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiAuthAuthLoginRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiAuthAuthLoginRequest = {
  
  username: "username_example",
  
  password: "password_example",
  
  grantType: "password",
  
  scope: "",
  
  clientId: "clientId_example",
  
  clientSecret: "clientSecret_example",
};

const data = await apiInstance.authAuthLogin(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | [**string**] |  | defaults to undefined
 **password** | [**string**] |  | defaults to undefined
 **grantType** | [**string**] |  | (optional) defaults to undefined
 **scope** | [**string**] |  | (optional) defaults to ''
 **clientId** | [**string**] |  | (optional) defaults to undefined
 **clientSecret** | [**string**] |  | (optional) defaults to undefined


### Return type

**BearerResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**400** | Bad Request |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **authAuthLogout**
> any authAuthLogout()


### Example


```typescript
import { createConfiguration, AuthApi } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request = {};

const data = await apiInstance.authAuthLogout(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**any**

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

# **registerRegister**
> UserRead registerRegister(userCreate)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiRegisterRegisterRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiRegisterRegisterRequest = {
  
  userCreate: {
    email: "email_example",
    password: "password_example",
    isActive: true,
    isSuperuser: true,
    isVerified: true,
  },
};

const data = await apiInstance.registerRegister(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userCreate** | **UserCreate**|  |


### Return type

**UserRead**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Successful Response |  -  |
**400** | Bad Request |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **resetForgotPassword**
> any resetForgotPassword(bodyResetForgotPasswordAuthForgotPasswordPost)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiResetForgotPasswordRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiResetForgotPasswordRequest = {
  
  bodyResetForgotPasswordAuthForgotPasswordPost: {
    email: "email_example",
  },
};

const data = await apiInstance.resetForgotPassword(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **bodyResetForgotPasswordAuthForgotPasswordPost** | **BodyResetForgotPasswordAuthForgotPasswordPost**|  |


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**202** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **resetResetPassword**
> any resetResetPassword(bodyResetResetPasswordAuthResetPasswordPost)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiResetResetPasswordRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiResetResetPasswordRequest = {
  
  bodyResetResetPasswordAuthResetPasswordPost: {
    token: "token_example",
    password: "password_example",
  },
};

const data = await apiInstance.resetResetPassword(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **bodyResetResetPasswordAuthResetPasswordPost** | **BodyResetResetPasswordAuthResetPasswordPost**|  |


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**400** | Bad Request |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **verifyRequestToken**
> any verifyRequestToken(bodyVerifyRequestTokenAuthRequestVerifyTokenPost)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiVerifyRequestTokenRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiVerifyRequestTokenRequest = {
  
  bodyVerifyRequestTokenAuthRequestVerifyTokenPost: {
    email: "email_example",
  },
};

const data = await apiInstance.verifyRequestToken(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **bodyVerifyRequestTokenAuthRequestVerifyTokenPost** | **BodyVerifyRequestTokenAuthRequestVerifyTokenPost**|  |


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**202** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **verifyVerify**
> UserRead verifyVerify(bodyVerifyVerifyAuthVerifyPost)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiVerifyVerifyRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiVerifyVerifyRequest = {
  
  bodyVerifyVerifyAuthVerifyPost: {
    token: "token_example",
  },
};

const data = await apiInstance.verifyVerify(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **bodyVerifyVerifyAuthVerifyPost** | **BodyVerifyVerifyAuthVerifyPost**|  |


### Return type

**UserRead**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**400** | Bad Request |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


