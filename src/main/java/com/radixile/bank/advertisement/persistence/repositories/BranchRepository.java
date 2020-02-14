package com.radixile.bank.advertisement.persistence.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.radixile.bank.advertisement.persistence.entities.Branch;

@Repository
public interface BranchRepository extends PagingAndSortingRepository<Branch, Long> {
	public long countByName(String  Name);
	public Branch findBranchByActivateCode(String activateCode);

}