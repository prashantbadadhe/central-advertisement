package com.radixile.bank.advertisement.persistence.entities.projections;

import org.springframework.data.rest.core.config.Projection;

import com.radixile.bank.advertisement.persistence.entities.Branch;
import com.radixile.bank.advertisement.persistence.entities.Department;

@Projection(name = "departmentview" , types = {Department.class})
public interface DepartmentBranch {
	
	public Long getId();
	public String getName() ;
	public String getType() ;
 	public Branch getBranch();	


}
