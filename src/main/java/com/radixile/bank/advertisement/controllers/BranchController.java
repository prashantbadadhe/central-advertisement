package com.radixile.bank.advertisement.controllers;

import java.io.IOException;
import java.util.Date;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.radixile.bank.advertisement.persistence.entities.Branch;
import com.radixile.bank.advertisement.persistence.repositories.BranchRepository;
import com.radixile.bank.advertisement.persistence.repositories.CompanyRepository;

@RestController
@RequestMapping(value = "/branch", consumes = MediaType.APPLICATION_JSON_VALUE)
public class BranchController {

	private static final Logger logger = LoggerFactory.getLogger(BranchController.class);

	@Autowired
	private BranchRepository branchRepo;
	@Autowired
	private CompanyRepository company;

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Branch> createBranch(@RequestBody String input) {
		ObjectMapper mapper = new ObjectMapper();
		Branch branch = null;
		try {
			branch = mapper.readValue(input, Branch.class);
			branch.setCompany(company.findOne(branch.getCompany().getId()));
			branch.setActivateCode(UUID.randomUUID().toString().replaceAll("-", "").toUpperCase().substring(0, 15));
			branch.setStatus(false);
			branch.setCreatedAt(new Date());
			branch.setUpdatedAt(new Date());
			branch.setVersion(0L);
			if (branchRepo.save(branch) != null) {
				return new ResponseEntity<>(HttpStatus.OK);
			}
		} catch (IOException e) {
			logger.error("Error while creating record", e.getMessage());
		}

		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

	}
	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Branch> updateBranch(@RequestBody String input) {

		ObjectMapper mapper = new ObjectMapper();
		Branch branch = null;
		Branch saveBranch = new Branch();

		try {
			branch = mapper.readValue(input, Branch.class);
			saveBranch = branchRepo.findOne(branch.getId());
			saveBranch.setCompany(company.findOne(branch.getCompany().getId()));
			saveBranch.setAddressLine1(branch.getAddressLine1());
			saveBranch.setAddressLine2(branch.getAddressLine2());
			saveBranch.setCity(branch.getCity());
			saveBranch.setCountry(branch.getCountry());
			saveBranch.setEmail1(branch.getEmail1());

			saveBranch.setName(branch.getName());
			saveBranch.setPhone1(branch.getPhone1());
			saveBranch.setState(branch.getState());
			Long tempVersion = saveBranch.getVersion();
			branch.setUpdatedAt(new Date());
			if (tempVersion == null) {
				saveBranch.setVersion(1L);
			} else {
				saveBranch.setVersion(tempVersion + 1);
			}
			saveBranch.setZipcode(branch.getZipcode());
			if (branchRepo.save(saveBranch) != null) {
				return new ResponseEntity<>(HttpStatus.OK);
			}
		} catch (IOException e) {
			logger.error("Error while updating record", e.getMessage());
		} catch (Exception e) {
			logger.error("Error while updating record", e.getMessage());
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

	}
	
	@RequestMapping(value = "/updateActivationCode", method = RequestMethod.PUT)
	public ResponseEntity<Branch> updateBranchCode(@RequestBody String input) {
		Branch saveBranch = new Branch();
		try {
			saveBranch = branchRepo.findOne(Long.parseLong(input));
			String activationCode = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase().substring(0, 15); 
			saveBranch.setActivateCode(activationCode);
			Long tempVersion = saveBranch.getVersion();
			if (tempVersion == null) {
				saveBranch.setVersion(1L);
			} else {
				saveBranch.setVersion(tempVersion + 1);
			}
			if (branchRepo.save(saveBranch) != null) {
				return new ResponseEntity<Branch>(saveBranch,HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.error("Error while updating record", e.getMessage());
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
}
