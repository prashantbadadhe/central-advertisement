package com.radixile.bank.advertisement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.radixile.bank.advertisement.persistence.entities.Company;
import com.radixile.bank.advertisement.persistence.repositories.CompanyRepository;

@RestController
 @RequestMapping(value ="/company" , produces = MediaType. APPLICATION_JSON_VALUE)
public class CompanyController {
 
	@Autowired
 private CompanyRepository companyRepo;
 
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Company> createCompany(@RequestBody Company company) {
     if (companyRepo.save(company) != null) {
           return new ResponseEntity<>(HttpStatus.OK);
        } else {
           return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
