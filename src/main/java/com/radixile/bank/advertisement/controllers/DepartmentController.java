package com.radixile.bank.advertisement.controllers;

import java.io.IOException;
import java.util.Date;

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
import com.radixile.bank.advertisement.persistence.entities.Department;
import com.radixile.bank.advertisement.persistence.repositories.BranchRepository;
import com.radixile.bank.advertisement.persistence.repositories.DepartmentRepository;

@RestController
@RequestMapping(value = "/department", consumes = MediaType.APPLICATION_JSON_VALUE)
public class DepartmentController {


	private static final Logger logger = LoggerFactory.getLogger(DepartmentController.class);

	@Autowired
	private DepartmentRepository departmentRepo;
	
	@Autowired
	private BranchRepository branch;
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Department> createDepartment(@RequestBody String input) {
		ObjectMapper mapper = new ObjectMapper();
		Department department = null;
		try {
			department = mapper.readValue(input, Department.class);
			department.setBranch(branch.findOne(department.getBranch().getId()));
			department.setVersion(0L);
			department.setCreatedAt(new Date());
			department.setUpdatedAt(new Date());
			
			if (departmentRepo.save(department) != null) {
				return new ResponseEntity<>(HttpStatus.OK);
			}
		} catch (IOException e) {
			logger.error("Error while creating record", e.getMessage());
		}

		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Department> updateDepartment(@RequestBody String input) {

		ObjectMapper mapper = new ObjectMapper();
		Department department = null;
		Department saveDepartment = new Department();

		try {
			department = mapper.readValue(input, Department.class);
			saveDepartment = departmentRepo.findOne(department.getId());
			saveDepartment.setBranch(branch.findOne(department.getBranch().getId()));
			saveDepartment.setName(department.getName());
			saveDepartment.setType(department.getType());
			saveDepartment.setUpdatedAt(new Date());
			Long tempVersion = saveDepartment.getVersion();
			if(tempVersion==null){
				saveDepartment.setVersion(1L);
			}else{
				saveDepartment.setVersion(tempVersion + 1);
			}

			if (departmentRepo.save(saveDepartment) != null) {
				return new ResponseEntity<>(HttpStatus.OK);
			}
		} catch (IOException e) {
			logger.error("Error while updating record", e.getMessage());
		}catch (Exception e) {
			logger.error("Error while updating record", e.getMessage());
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

	}


}
