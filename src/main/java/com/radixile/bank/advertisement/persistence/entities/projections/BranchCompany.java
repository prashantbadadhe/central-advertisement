package com.radixile.bank.advertisement.persistence.entities.projections;

import org.springframework.data.rest.core.config.Projection;

import com.radixile.bank.advertisement.persistence.entities.Branch;
import com.radixile.bank.advertisement.persistence.entities.Company;

@Projection(name = "branchview" , types = {Branch.class})
public interface BranchCompany {

	public Long getId();
	public String getActivateCode();
	public String getName() ;
	public String getAddressLine1() ;
 	public String getAddressLine2() ; 
	public String getCity() ;
	public String getState();
	public String getCountry();
	public String getZipcode();
	public String getPhone1() ;
	public String getEmail1() ;
	public Company getCompany();	
}
