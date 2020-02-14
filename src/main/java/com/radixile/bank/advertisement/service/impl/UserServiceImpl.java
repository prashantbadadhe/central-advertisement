package com.radixile.bank.advertisement.service.impl;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.radixile.bank.advertisement.beans.UserDetailBean;
import com.radixile.bank.advertisement.persistence.entities.Employee;
import com.radixile.bank.advertisement.persistence.entities.User;
import com.radixile.bank.advertisement.persistence.repositories.EmployeeRepository;
import com.radixile.bank.advertisement.persistence.repositories.RoleRepository;
import com.radixile.bank.advertisement.persistence.repositories.UserRepository;
import com.radixile.bank.advertisement.security.PasswordCrypto;
import com.radixile.bank.advertisement.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	UserRepository userRepo;

	@Autowired
	EmployeeRepository empRepo;

	@Autowired
	RoleRepository roleRepo;

	@Autowired
	PasswordCrypto passwordCrypto;

	@Override
	@Transactional
	public boolean createUser(User user) {
		User saveUser = new User();
		boolean isCreated = false;
		try {
			saveUser.setRole(roleRepo.findOne(user.getRole().getId()));
			saveUser.setUsername(user.getUsername());
			saveUser.setPassword(passwordCrypto.encrypt(user.getPassword()));
			saveUser.setEmail(user.getEmail());
			Long tempVersion = saveUser.getVersion();
			Employee emp = new Employee();
			emp = Employee.cloneFromUser(emp, user);
			saveUser.setEmployee(emp);
	 
			if (tempVersion == null) {
				saveUser.setVersion(1L);
			} else {
				saveUser.setVersion(tempVersion + 1);
			}
			if (userRepo.save(saveUser) != null) {
				isCreated = true;
			}

		} catch (Exception e) {
			logger.error("Error while Creating record", e.getMessage());
		}

		return isCreated;
	}

	@Override
	public boolean updateUser(User user) {
		boolean isUpdated = false;

		try {
			User saveUser = userRepo.findOne(user.getId());
			saveUser.setRole(roleRepo.findOne(user.getRole().getId()));
			saveUser.setUsername(user.getUsername());
			saveUser.setEmail(user.getEmail());
			saveUser.setPassword(passwordCrypto.encrypt(user.getPassword()));
			saveUser.setEmployee(Employee.cloneFromUser(saveUser.getEmployee(), user));

			 

			Long tempVersion = saveUser.getVersion();
			if (tempVersion == null) {
				saveUser.setVersion(1L);
			} else {
				saveUser.setVersion(tempVersion + 1);
			}
			if (userRepo.save(saveUser) != null) {
				isUpdated = true;
			}
		} catch (Exception e) {
			logger.error("Error while updating record", e.getMessage());
		}

		return isUpdated;
	}

	@Override
	public List<User> getUserList() {

		List<User> result = new ArrayList<>();
		List<User> userList = (List<User>) userRepo.findAll();
		for (User user : userList) {
			Employee emp = user.getEmployee();
			result.add(User.cloneFromEmployee(user, emp));
			}
		return result;
	}

	@Override
	public UserDetailBean getUserDetails(Principal principalUser) {
		UserDetailBean userDetailBean = new UserDetailBean();
		User userEntity = userRepo.findByUsername(principalUser.getName());
if(userEntity!=null){
		userDetailBean.setUserId(userEntity.getId());
		userDetailBean.setUserName(userEntity.getUsername());
		userDetailBean.setEmail(userEntity.getEmail());
		userDetailBean.setRoleId(userEntity.getRole().getId());
		userDetailBean.setRoleName(userEntity.getRole().getName());
		if (userEntity.getEmployee() != null) {
			userDetailBean.setFirstName(userEntity.getEmployee().getFirstName());
			userDetailBean.setLastName(userEntity.getEmployee().getLastName());
			userDetailBean.setIsEmployee("true");
		}
	 
		userDetailBean.setAuthenticated("true");
}else{
	userDetailBean.setAuthenticated("false");
}
	
		return userDetailBean;
	}
}
