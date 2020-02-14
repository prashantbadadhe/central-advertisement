package com.radixile.bank.advertisement.persistence.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.radixile.bank.advertisement.persistence.entities.BranchContent;

@Repository
public interface BranchContentRepository extends PagingAndSortingRepository<BranchContent, Long> {
	public List<BranchContent> findAllBranchContentByBranchIdAndContentStatusOrderByContentOrderAsc(Long branhcId, Boolean contentStatus);
	
	@Query("Select bc from BranchContent bc where bc.branchId=?1 and (bc.updatedAt > ?2 or bc.createdAt > ?2) ")
	public List<BranchContent> findAllBranchContentByBranchIdAndUpdatedAtGreaterThanEqual(Long branhcId, Date updatedAt);
	
	@Query("Select max(bc.contentOrder) from BranchContent bc where bc.branchId=?1")
	public Long getLastContestOrder(Long branchId);
}