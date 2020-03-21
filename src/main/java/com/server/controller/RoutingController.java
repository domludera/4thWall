package com.server.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class RoutingController{

    @RequestMapping(value={"/","/SignIn","SignInPage","SignUp"}, method=RequestMethod.GET)
    public String index() {
       return "index.html";
    }
}