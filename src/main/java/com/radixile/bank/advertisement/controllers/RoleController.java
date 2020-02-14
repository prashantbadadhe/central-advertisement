package com.radixile.bank.advertisement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.radixile.bank.advertisement.persistence.entities.Role;
import com.radixile.bank.advertisement.persistence.repositories.RoleRepository;

@RestController
@RequestMapping(value = "/role", produces = MediaType.APPLICATION_JSON_VALUE)
public class RoleController {

	@Autowired
	private RoleRepository roleRepo;

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Role> createRole(@RequestBody Role role) {
		if (roleRepo.save(role) != null) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

}
