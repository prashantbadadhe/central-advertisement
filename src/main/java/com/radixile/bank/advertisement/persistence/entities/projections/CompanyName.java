package com.radixile.bank.advertisement.persistence.entities.projections;

import org.springframework.data.rest.core.config.Projection;

import com.radixile.bank.advertisement.persistence.entities.Company;

@Projection(name = "companyname" , types = {Company.class})
public interface CompanyName {
 
	public Long getId();
	public String getName();
}
