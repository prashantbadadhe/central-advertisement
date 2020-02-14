package com.radixile.bank.advertisement.persistence.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.radixile.bank.advertisement.persistence.entities.Department;

@Repository
public interface DepartmentRepository extends PagingAndSortingRepository<Department, Long> {
	public long countByName(String  Name);
}