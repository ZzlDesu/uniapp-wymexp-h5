## 目录

[1.获取免费场景列表](#1获取免费场景列表)
[2.获取付费场景列表](#2获取付费场景列表)
[3.更新付费场景锁定情况](#3更新付费场景锁定情况)
[4.用户注册](#4用户注册)
[5.用户登录](#5用户登录)
[6.生成新的accessToken](#6生成新的accessToken)
[7.更新用户场景解锁数据](#7更新用户场景解锁数据)
[8.获取指定的用户信息](#8获取指定的用户信息)
[9.验证accessToken](#9验证accessToken)
[10.获取secretKey](#10获取secretKey)
[11.新增一条订单](#11新增一条订单)
[12.获取指定用户的所有订单信息](#12获取指定用户的所有订单信息)

## 1.获取免费场景列表

#### 接口URL

> http://103.151.217.190:3000/api/freelist

#### 请求方式

> GET

#### 成功响应示例

```javascript
{
	"message": "获取免费场景列表成功！",
	"data": [
		{
			"id": 1,
			"name": "颜华（如玉公子系）",
			"src": "http://pic.yupoo.com/zzl-desu/02f5b9cd/3775a62a.jpeg"
		},
		{
			"id": 2,
			"name": "清婉（淡雅美人系）",
			"src": "http://pic.yupoo.com/zzl-desu/afd6e453/8ddc06b6.jpeg"
		}
	]
}
```

## 2.获取付费场景列表


#### 接口URL

> http://103.151.217.190:3000/api/paymentlist

#### 请求方式

> GET

#### 成功响应示例

```javascript
{
	"message": "获取付费场景列表成功！",
	"data": [
		{
			"id": 1,
			"name": "衿悠（清新淡绿系）",
			"src": "http://pic.yupoo.com/zzl-desu/f1134c21/028b890b.jpeg",
			"isLock": true
		},
		{
			"id": 2,
			"name": "桃灼（浪漫粉色系）",
			"src": "http://pic.yupoo.com/zzl-desu/bd544b43/94913b24.jpeg",
			"isLock": false
		},
		{
			"id": 3,
			"name": "行止（沉稳大地系）",
			"src": "http://pic.yupoo.com/zzl-desu/fe019a96/96eac69f.jpeg",
			"isLock": true
		}
	]
}
```

## 3.更新付费场景锁定情况

#### 接口URL

> http://103.151.217.190:3000/api/updatelock/:id

#### 请求方式

> POST

#### Content-Type

> urlencoded

#### 路径变量

| 参数名 | 示例值 | 参数描述   |
| ------ | ------ | ---------- |
| id     | 1/2/3  | 付费场景id |

#### 请求Body参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述               |
| ------ | ------ | -------- | -------- | ---------------------- |
| isLock | false  | String   | 是       | 付费场景的锁定状态更改 |

#### 成功响应示例

```javascript
{
	"status": 0,
	"message": "更新成功"
}
```
#### 路径参数错误示例

~~~javascript
{
    "status": 1,
    "message": "对象未找到"
}
~~~

## 4.用户注册

#### 接口URL

> http://103.151.217.190:3000/api/register

#### 请求方式

> POST

#### Content-Type

> json

#### 请求Body参数

| 参数名   | 示例值   | 参数类型 | 是否必填 | 参数描述 |
| -------- | -------- | -------- | -------- | -------- |
| username | username | String   | 是       | 用户名   |
| password | password | String   | 是       | 密码     |

#### 成功响应示例

```javascript
{
	"status": 0,
	"message": "请求成功！"
}
```

#### 用户名已存在示例

~~~javascript
{
    "status": 1,
    "message": "用户名已被占用！"
}
~~~

## 5.用户登录

```text
用户登录接口，如果用户名与密码校验成功，则返回包含accessToken和refreshToken的一个对象，有效时间分别为30分钟和7天；如果校验失败，则返回用户名或密码错误。
```

#### 接口URL

> http://103.151.217.190:3000/api/login

#### 请求方式

> POST

#### Content-Type

> json

#### 请求Body参数

| 参数名   | 示例值   | 参数类型 | 是否必填 | 参数描述 |
| -------- | -------- | -------- | -------- | -------- |
| username | username | String   | 是       | 用户名   |
| password | password | String   | 是       | 密码     |

#### 成功响应示例

```javascript
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjcsInVuYW1lIjoidXNlcm5hbWUiLCJpYXQiOjE2ODkwODUwNjMsImV4cCI6MTY4OTA4Njg2M30.Fus8TcGV26N2aX5uIrKE4m2dlc8hBPN3WFlXLGfJwq0",
	"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNjg5MDg1MDYzLCJleHAiOjE2ODk2ODk4NjN9.L_6fof4mV-dmzrO_9UOcIjvDfhPiEGBEugy4Dq7WuHU"
}
```
#### 校验信息失败示例

~~~javascript
{
	"status": 1,
    "message": "用户名或密码错误！"
}
~~~



## 6.生成新的accessToken

```text
当accessToken过期时，本接口就根据refreshToken重新生成一个accessToken。需要传入一个Authorization请求头，值为'Basic' + refreshToken的base64编码 + ':' 这三个部分组成的字符串。
```

#### 接口URL

> http://103.151.217.190:3000/api/refresh

#### 请求方式

> POST

#### 请求Header参数

| 参数名        | 示例值                                                       | 参数类型 | 是否必填 | 参数描述 |
| ------------- | ------------------------------------------------------------ | -------- | -------- | -------- |
| Authorization | Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFibUZ0WlNJNkluVnpaWEp1WVcxbElpd2lhV0YwSWpveE5qZzVNRGcxTURZekxDSmxlSEFpT2pFMk9EazJPRGs0TmpOOS5MXzZmb2Y0bVYtZG16ck9fOVVPY0lqdkRmaFBpRUdCRXVneTREcTdXdUhVOg== | String   | 是       | -        |

#### 成功响应示例

```javascript
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNjg5MDg2MDY5LCJleHAiOjE2ODkwODc4Njl9.C-YviRTbVfHFocoiUwJXNB_y5QoN9xZJDJ9_Ii92ntE"
}
```
#### token找不到示例
```javascript
{
    "status": 1,
    "errCode": 10001,
    "message": "refreshToken找不到"
}
```

## 7.更新用户场景解锁数据

#### 接口URL

> http://103.151.217.190:3000/api/updatescene

#### 请求方式

> POST

#### Content-Type

> json

#### 请求Body参数

| 参数名 | 示例值            | 参数类型 | 是否必填 | 参数描述                                        |
| ------ | ----------------- | -------- | -------- | ----------------------------------------------- |
| pay    | [true,false,true] | String   | 是       | 场景解锁数组字符串，true为未解锁，false为已解锁 |
| userid | 7                 | Number   | 是       | 用户id                                          |

#### 成功响应示例

```javascript
{
	"status": 0,
	"message": "更新成功",
	"data": [
		{
			"user_id": 7,
			"username": "username",
			"password": "password",
			"pay_scene": "[true,false,true]"
		}
	]
}
```

## 8.获取指定的用户信息

#### 接口URL

> http://103.151.217.190:3000/api/getuserinfo

#### 请求方式

> POST

#### Content-Type

> json

#### 请求Body参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |
| userid | 7      | Number   | 是       | 用户id   |

#### 成功响应示例

```javascript
{
	"status": 0,
	"message": "请求成功",
	"data": [
		{
			"user_id": 7,
			"username": "username",
			"password": "password",
			"pay_scene": "[true,false,true]"
		}
	]
}
```

## 9.验证accessToken

```text
本接口验证accessToken。需要传入一个Authorization请求头，值为'Basic' + accessToken的base64编码 + ':' 这三个部分组成的字符串。
```

#### 接口URL

> http://103.151.217.190:3000/api/verify

#### 请求方式

> POST

#### 请求Header参数

| 参数名        | 示例值                                                       | 参数类型 | 是否必填 | 参数描述 |
| ------------- | ------------------------------------------------------------ | -------- | -------- | -------- |
| Authorization | Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFibUZ0WlNJNkluVnpaWEp1WVcxbElpd2lhV0YwSWpveE5qZzVNRGcxTURZekxDSmxlSEFpT2pFMk9EazJPRGs0TmpOOS5MXzZmb2Y0bVYtZG16ck9fOVVPY0lqdkRmaFBpRUdCRXVneTREcTdXdUhVOg== | String   | 是       | -        |

#### 成功响应示例

```javascript
{
	"status": 0,
	"message": "token验证成功"
}
```

#### token不存在示例

```javascript
{
    "status": 1,
    "errCode": 10001,
    "message": "token不存在"
}
```

#### token已过期示例

```js
{
    "status": 1,
    "errCode": 10002,
    "message": "token已过期"
}
```

## 10.获取secretKey

```text
获取accessToken的secretKey用来解码accessToken以获取token中存储的用户名等信息
```

#### 接口URL

> http://103.151.217.190:3000/getkey

#### 请求方式

> GET

#### 成功响应示例

```javascript
{
	"key": "QdZfg1-=$!"
}
```

## 11.新增一条订单

```text
scenetype传递的参数值为"free" / "payment" / "mix"
```

#### 接口URL

> http://103.151.217.190:3000/api/order

#### 请求方式

> POST

#### Content-Type

> json

#### 请求Body参数

| 参数名    | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --------- | ------ | -------- | -------- | -------- |
| userid    | 7      | String   | 是       | 用户id   |
| sceneid   | 1      | Number   | 是       | 场景id   |
| scenetype | free   | String   | 是       | 场景类别 |

#### 成功响应示例

```javascript
{
	"status": 0,
	"message": "请求成功！"
}
```

## 12.获取指定用户的所有订单信息

#### 接口URL

> http://103.151.217.190:3000/api/getorder

#### 请求方式

> GET

#### 请求Query参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |
| userid | 7      | String   | 是       | 用户id   |

#### 成功响应示例

```javascript
{
	"status": 0,
	"message": "请求成功",
	"data": [
		{
			"order_id": 4,
			"user_id": "7",
			"scene_id": "1",
			"scene_type": "free"
		}
	]
}
```