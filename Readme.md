
## Installation and Testing

### With Docker

```
docker-compose up
```

```
http://localhost:3001/api/auth
http://localhost:4000/api/flight/11-01-2022/DXB/LHR/
http://localhost:4000/api/price/EK001

Date : MM-DD-YYYY
```


### Without Docker

```
npm install
npm run dev
```

```
http://localhost:3000/api/auth
http://localhost:3000/api/flight/11-01-2022/DXB/LHR/
http://localhost:3000/api/price/EK001


Date : MM-DD-YYYY
```


### Postman Result

```Json
{
  "APP_NAME": "ek_user",
  "PASSWORD": "e311g#987"
}
```
<img width="685" alt="auth_genarator" src="https://user-images.githubusercontent.com/24268967/195995415-2f8f2d7a-9221-4007-aa42-2c3b2b86efc3.png">

<img width="685" alt="flight-result" src="https://user-images.githubusercontent.com/24268967/195995420-5c6443a4-537c-48f3-a99a-05e779f4d9fe.png">

<img width="696" alt="price-result" src="https://user-images.githubusercontent.com/24268967/195995422-978004d8-64f2-4841-9936-e719466d2804.png">


### Varnish(Cache ser
vice)

- All Requests, except authorize call from Client to API service goes via Varnish
- Varnish will Cache all the response from API service depending on the cache-control(max-age) set on the response header.



### Flight Service

- Client will call API service to get the JWT token .
- API service will make  asynchronous   calls to 5 downstream services to get the Flight Data for the input provided .
- Flight Number is Returned  to Client.






![flight4](https://user-images.githubusercontent.com/24268967/195989367-66d64457-aad2-4cb4-bdbf-47b86102a6c9.png)



### Price Service

- Client will call API service to get the JWT token .
- API service will execute Complex Rule Engine [Json Rule Engine] to fetch the price for the input data.
- Since the Rule Engine Data , the Data is stored in Application memory (Singleton Object) .
- Price Data is returned to the Client



![pricing](https://user-images.githubusercontent.com/24268967/195988103-58cc5573-daf0-4aac-882d-c56e37a95cdd.png)




##  Service @ Scale


### High availably setup 

- Two AWS Region is considered 
- Each region , Two Availability Zone is Considered .
- Cluster Database is setup across each region .

### Akamai Edge Solution is Considered 


- Edge servers automatically drop network-layer DDoS attacks and protect the application layer from DDoS and application attacks. 
- Stop traffic from malicious actors based on their specific reputation score, which is derived from Akamai’s visibility into prior behavior of their IP addresses. 
- Automatically inspect API requests for malicious content and block attack tools based on device fingerprinting. 
- SSL/TLS encryption to prevent sensitive data exposure during transmission
- API Gateway validates API requests to ensure legitimate consumers can access APIs. 
- API responses can be served from cache to improve performance and reduce infrastructure and bandwidth costs. 
- Capture, retain, and deliver security information and events to your SIEM application in real time





<img width="1068" alt="fourth" src="https://user-images.githubusercontent.com/24268967/195988136-7ff4d1c1-13b8-45b2-9fb3-44f414da88fe.png">
