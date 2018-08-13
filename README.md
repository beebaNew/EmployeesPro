
#To create docker image 

###Prerequisites
 Docker must be installed and must be runnning properly

### Step 1

  Clone or download Repository to your local machine

```
 git clone https://github.com/beebaNew/EmployeesPro.git
```
   
### Step 2

On command prompt move to the directory where you have  downloaded files 

### step 3 

Now Run following command to build image

    
```
docker build -t "beebe/prj:1" ./
```

### step 4

check available images by using command

```
docker images
```



#Deploy and Start frontEnd

### Step 1

run following command to start "beeba/prj:1" image


```
docker run  -d -p 8081:8081 "beeba/prj:1" 
```

### step 2

check whether container started successfully  using

```
docker ps
```

### Step 3

Start Front End with following command
```
docker exec -container name or id   java -jar EmployeeApp.jar    
```

### step 4

Now Open Browser and put URL

localhost:8081
