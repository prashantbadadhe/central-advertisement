package com.radixile.bank.advertisement.persistence.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.radixile.bank.advertisement.persistence.entities.Employee;

@Repository
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long> {
	public long countByFirstName(String firstName);
}