package com.radixile.bank.advertisement.service;

import java.security.Principal;
import java.util.List;

import com.radixile.bank.advertisement.beans.UserDetailBean;
import com.radixile.bank.advertisement.persistence.entities.User;

public interface UserService {

	public boolean createUser(User user);

	public boolean updateUser(User user);

	public List<User> getUserList();

	public UserDetailBean getUserDetails(Principal principalUser);

}
