package com.radixile.bank.advertisement.persistence.entities.projections;

import org.springframework.data.rest.core.config.Projection;

import com.radixile.bank.advertisement.persistence.entities.Employee;

@Projection(name = "employeename" , types = {Employee.class})
public interface EmployeeName {
 
	public Long getId();
	public String getFirstName();
	public String getLastName();
	public String getFullName();
}
