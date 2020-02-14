package com.radixile.bank.advertisement.persistence.entities.projections;

import org.springframework.data.rest.core.config.Projection;

import com.radixile.bank.advertisement.persistence.entities.Role;

@Projection(name = "rolename" , types = {Role.class})
public interface RoleName {
 
	public Long getId();
	public String getName();
}
