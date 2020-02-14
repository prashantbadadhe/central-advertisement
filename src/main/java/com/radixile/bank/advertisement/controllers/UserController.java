package com.radixile.bank.advertisement.controllers;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.radixile.bank.advertisement.persistence.entities.User;
import com.radixile.bank.advertisement.persistence.repositories.UserRepository;
import com.radixile.bank.advertisement.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserRepository userRepo;

	@Autowired
	UserService userService;

	@RequestMapping(method = RequestMethod.POST)
	
	public ResponseEntity<Boolean> createUser(@RequestBody String input) {

		ObjectMapper mapper = new ObjectMapper();
		User user = null;
		boolean isCreated=false;
		try {
			user = mapper.readValue(input, User.class);
			if (userRepo.findByUsername(user.getUsername()) != null) {
				return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
			}

			isCreated = userService.createUser(user);

		} catch (IOException e) {
			logger.error("Error while updating record", e.getMessage());
		} catch (Exception e) {
			logger.error("Error while updating record", e.getMessage());
		}
		if(isCreated){
		return new ResponseEntity<>(HttpStatus.CREATED);
		}
		return new ResponseEntity<Boolean>(HttpStatus.EXPECTATION_FAILED);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<User> updateUser(@RequestBody String input) {

		ObjectMapper mapper = new ObjectMapper();
		boolean isUpdated=false;

		try {
			User user = mapper.readValue(input, User.class);
			isUpdated=userService.updateUser(user);
			
		} catch (IOException e) {
			logger.error("Error while updating record", e.getMessage());
		} catch (Exception e) {
			logger.error("Error while updating record", e.getMessage());
		}

		if(isUpdated){
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
		return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
	}

	@RequestMapping(method = RequestMethod.GET)
	public Principal getUser(Principal user) {

		return user;
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public List<User> getUserList() {

		return userService.getUserList();
	}

}
