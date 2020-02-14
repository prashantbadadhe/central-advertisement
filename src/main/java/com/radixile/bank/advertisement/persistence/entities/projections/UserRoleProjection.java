package com.radixile.bank.advertisement.persistence.entities.projections;

import org.springframework.data.rest.core.config.Projection;

import com.radixile.bank.advertisement.persistence.entities.Employee;
import com.radixile.bank.advertisement.persistence.entities.Role;
import com.radixile.bank.advertisement.persistence.entities.User;

@Projection(name = "userview" , types = {User.class})
public interface UserRoleProjection {

	public Long getId();
	public String getUsername() ;
	public String getPassword() ;
	public String getEmail() ;
	public Role getRole();
 	public Employee getEmployee();
}
