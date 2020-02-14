package com.radixile.bank.advertisement.persistence.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.radixile.bank.advertisement.persistence.entities.Company;

@Repository
public interface CompanyRepository extends PagingAndSortingRepository<Company, Long> {
	public long countByName(String  Name);
 }