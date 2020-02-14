package com.radixile.bank.advertisement.api.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.radixile.bank.advertisement.api.service.BranchContentService;
import com.radixile.bank.advertisement.persistence.entities.BranchContent;
import com.radixile.bank.advertisement.persistence.repositories.BranchContentRepository;

@Service
public class BranchContentServiceImpl implements BranchContentService {

	@Autowired
	BranchContentRepository branchContentRepo;
	
	@Override
	public List<BranchContent> findAllBranchContentByBranchIdAndContentStatus(Long branhcId, Boolean contentStatus) {
		return branchContentRepo.findAllBranchContentByBranchIdAndContentStatusOrderByContentOrderAsc(branhcId, contentStatus);
	}
	
	@Override
	public List<BranchContent> findAllBranchContentByBranchIdAndUpdatedAtGreaterThanEqual(Long branhcId, Date updatedAt){
		return branchContentRepo.findAllBranchContentByBranchIdAndUpdatedAtGreaterThanEqual(branhcId, updatedAt);
	}

}
