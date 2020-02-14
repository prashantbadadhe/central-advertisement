package com.radixile.bank.advertisement.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import com.radixile.bank.advertisement.persistence.entities.Branch;
import com.radixile.bank.advertisement.persistence.entities.BranchContent;
import com.radixile.bank.advertisement.persistence.entities.Company;
import com.radixile.bank.advertisement.persistence.entities.Department;
import com.radixile.bank.advertisement.persistence.entities.Employee;
import com.radixile.bank.advertisement.persistence.entities.Role;
import com.radixile.bank.advertisement.persistence.entities.User;

@Configuration
public class ExposeIdsConfig extends RepositoryRestConfigurerAdapter  {
  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    config.exposeIdsFor(Company.class,Branch.class,Role.class,User.class,Department.class,Employee.class,BranchContent.class);
    config.setBasePath("/api");
  }
   
}