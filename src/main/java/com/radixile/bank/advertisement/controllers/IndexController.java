package com.radixile.bank.advertisement.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.radixile.bank.advertisement.beans.UserDetailBean;
import com.radixile.bank.advertisement.service.UserService;

@Controller
public class IndexController {
	@Autowired
	UserService userService;

 
/*	
	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public String errorPage(Model model, String error, String logout, Principal principal) {

		return "partials/register.html";
	}
	*/

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String appInit(Model model, String error, String logout, Principal principal) {
		if (error != null)
			model.addAttribute("error", "Your username and password is invalid.");

		if (logout != null)
			model.addAttribute("message", "You have been logged out successfully.");

		return "/loginpage.html";
	}

	/*
	 * @RequestMapping(value="/logout",method = RequestMethod.GET) public String
	 * appEnd(Principal principal) {
	 * 
	 * return "partials/logout.html"; }
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return "loginpage.html";// You can redirect wherever you want, but
								// generally it's a good practice to show login
								// screen again.
	}
	@RequestMapping(value = "/menuList", method = RequestMethod.GET)
	@ResponseBody
	public UserDetailBean getMenuBasedOnRole(Principal principalUser, Model model) {
		return userService.getUserDetails(principalUser);
	}

}
