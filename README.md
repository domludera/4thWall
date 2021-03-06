# 4th Wall - a VR IDE

Final Report: https://github.com/domludera/4thWall/blob/master/FinalReport4thWall.pdf

![4thwall](https://user-images.githubusercontent.com/31933091/118828636-6fc3cd00-b88b-11eb-9cd3-fb54a41ce462.png)
![4thwallmenu](https://user-images.githubusercontent.com/31933091/118828758-8c600500-b88b-11eb-9950-c75dbd7f38c2.png)

![4thwallconsole](https://user-images.githubusercontent.com/31933091/118828674-781c0800-b88b-11eb-85fb-7ff699faccd9.png)


### Problem: 
Developers often have insufficient monitor real estate. The lack of visual space for a productive workspace has led to purchases of clunky, overly-large monitors all in an effort to ultimately increase productivity during development on multi-resource software. These attempts at creating a setup that allows for a productive workflow has become costly and often fail to reach the objective: a simple, minimalist, efficient workspace. 

### Hypothesis: 
Virtual Reality headsets are portable devices and provide a virtual, infinite space that can operate as a limitless workspace. With a user friendly, individualized virtual setup, it will now be possible to operate in a minimalist, efficient workspace that can organize large software project development in a way that facilitates the setup of a multifaceted software development environment.  This infinite space contains space to create windows where the developers can open multiple project files, visuals and terminals for developers to work on. Furthermore, minimal hardware resources and tiers are needed to compile and test code since all of these compilations are done on another machine.

### User Population: 
This application is targeted for developers who mainly develop on laptops or who own small screens and wish to have a more immersive experience. Those developers are expected to either own a VR device or a smart phone capable of running Google Chrome enabled to support VR web programs.

### Prototype: 
We want to make use of emerging open-source VR technologies to create an immersive Integrated Development Environment (IDE). WebVR is a technology that makes use of virtual reality possible to experience through the browser. It significantly reduces the barrier entry to VR as it platform independent and can be run from any device that supports a compatible web browser, this includes Google Chrome, Mozilla Firefox. The code will compile through a cloud server, making it possible to develop any type of code, as long as the server supports it.

## Setup

This server is configured to work over TLS (ie. HTTPS).

You can generate your Java KeyStore (JKS) by running the following:

```keytool -genkey -keyalg RSA -alias medium -keystore medium.jks -storepass password -validity 365 -keysize 4096 -storetype pkcs12```

Then make sure to place it under ```src/main/resources/```

_For more information_
https://medium.com/swlh/how-to-secure-a-spring-boot-application-with-tls-176062895559
