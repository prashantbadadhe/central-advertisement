package com.radixile.bank.advertisement.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.radixile.bank.advertisement.beans.UserDetailBean;
import com.radixile.bank.advertisement.service.UserService;

@Controller

public class LandingController {

	@Autowired
	UserService userService;

	@RequestMapping(value = "/dashboard", method = RequestMethod.GET)
	public String dashboard(Model model, Principal principal) {
		UserDetailBean userDetailBean = userService.getUserDetails(principal);
		String redirectUrl = "";
		if(userDetailBean!=null && userDetailBean.getRoleName()!=null){
			redirectUrl = "partials/dashboard.html";
		/*if (userDetailBean.getRoleName().equalsIgnoreCase("admin")) {
			redirectUrl = "partials/dashboard.html";
		}else if (userDetailBean.getRoleName().equalsIgnoreCase("client")) {
			redirectUrl = "partials/aboutus.html";
		}else{
			redirectUrl = "partials/project.html";
		}*/
		}else{
			redirectUrl = "/loginpage.html";
		}
		return redirectUrl;
	}

}
