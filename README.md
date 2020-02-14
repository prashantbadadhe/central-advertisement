# BankAdvertismentapp

## BankAdvertisement API

---

### 1. Branch Activate API

**Admin User will provide length of 15 alphanumeric branch code to use this API. This API will activate branch. This API should be call only once to activate branch. If you call this API second time then it will not allow you to proceed further. You should always need new branch code to get success response.**

##### API URL  : http://ip:port/bank/branch/activate/(branchcode) 

```
e.g http://localhost:8888/bank/branch/activate/89F3D3BFFDAB4B2 
89F3D3BFFDAB4B2 is branch code here which Admin will provide  
```
**Success Response**

```
{
  "status" : 0,
  "message" : "Branch activated successfully",
  "branchId" : "2",
  "exceptionMsg" : null
}
```

* You will get `status` as `0` for success response and `branchId` in success response this `branchId` you have to pass for second API call as header parameter

**Failure Response**


* If branch code is coming wrong in request then below response will be return
* You will get `status` as `1` for all failure response and `exceptionMsg` in case of any exception

```
{
  "status" : 1,
  "message" : "Branch is not available",
  "branchId" : null,
  "exceptionMsg" : null
}
```

* Find below response sample in case of Exception

```
{
  "status" : 1,
  "message" : "Unable to activate Branch",
  "branchId" : null,
  "exceptionMsg" : "DAO Exception"
}
```

---
### 2. Get Branch Content API

** This API will return list of Insert/Update/Delete SQL queries on the basis of lastUpdated header field and return images in .zip byte array format**

##### API URL  : http://ip:port/bank/branch/activate/(branchcode) 

```
e.g http://localhost:8888/bank/branch/content/89F3D3BFFDAB4B2 
89F3D3BFFDAB4B2 is branch code which was sent in first API request  
```

* Request Header details as per below. In first call `lastUpdated` value must be `null` or `""`. We will return `lastUpdated` date & time in response and in next call you have to send same `lastUpdated` date & time in header as per below mentioned format.

```
branchId : "2" 
lastUpdated : "2018-01-01 23:01:01" 
```

**Success Response**

{
    "status": 0,
    "message": "Success",
    "exceptionMsg": null,
    "lastUpdated": "2018-07-24 23:28:05",
    "contentDetails": [
        "INSERT INTO branch_content (id, branch_id, content_name, content_order, content_type, duration) values('1','1','1.jpg','1','image/jpeg','null');"
    ],
    "zipData": "",
    "images": [
        "/load/files/1/1.jpg"
    ]
}

```
{
  "status" : 0,
  "message" : "Success",
  "exceptionMsg" : null,
  "lastUpdated" : "2018-07-14 10:02:19",
  "contentDetails" : [ "UPDATE branch_content SET content_name='IMG_0248.JPG', content_order='1', content_type='image', duration='1' WHERE id ='1' AND branch_id ='1';", 
  "DELETE FROM branch_content WHERE id ='3' AND branch_id ='1';", 
  "INSERT INTO branch_content (id, branch_id, content_name, content_order, content_type, duration) values('4','1','IMG_0693.JPG','4','image','4');" ],
  "zipData" : "UEsDBBQACAgIAElQ7kwAAAAAAAAAAAAAAAAMAAAASU1HXzAyNzYuSlBH1LplUFxdty3cSHAJ7pJAQnB3CxA8QIDg7tK4Nh4guEOA4A5BG3d3J7i7BWnoxp3L85znfd9zq07d+u73746qVXtU95xzz7Hm2muvXTWfF543WUglQVbmAICCAoABAACgANDgsAHwLwzpZQTDvf6bo7"
}
```

* You will get `status` as `0` for success response and `contentDetails` is list which has SQL queries to maintain table at android side. `zipData` will return image data in zip format which has to store at android. We will be sending images only insert and update case. 

** Success Response in caes of there is no content has to update at android **

```
{
  "status" : 0,
  "message" : "No Content Available",
  "exceptionMsg" : null,
  "lastUpdated" : "2018-07-14 10:23:04",
  "contentDetails" : null,
  "zipData" : null
}
```

* If `contentDetails` list is `null` and `zipData` is `null` then only `lastUpdated` date & time has to updated at android. 


**Failure Response**


* If branch code or any header details are coming wrong in request then below response will be return
* You will get `HttpStatus` as `400` and `status` as `1` for all failure response and `exceptionMsg` in case of any exception 

```
{
  "status" : 1,
  "message" : "Branch is not available",
  "exceptionMsg" : null,
  "lastUpdated" : null,
  "contentDetails" : null,
  "zipData" : null
}
```

* Find below response sample in case of DB Exception 

```
{
  "status" : 1,
  "message" : "Unable to get content",
  "exceptionMsg" : null,
  "lastUpdated" : null,
  "contentDetails" : null,
  "zipData" : null
}
```
* Find below response sample in case of Image not available on repository File/IO exception 

```
{
  "status" : 1,
  "message" : "Unable to fetch images from repository",
  "exceptionMsg" : "C:\\Users\\rjain3\\Desktop\\Arnav\\IMG_0693.JPG (The system cannot find the file specified)",
  "lastUpdated" : null,
  "contentDetails" : null,
  "zipData" : null
}
```
---