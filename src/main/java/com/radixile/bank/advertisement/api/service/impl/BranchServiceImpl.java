package com.radixile.bank.advertisement.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.radixile.bank.advertisement.api.service.BranchService;
import com.radixile.bank.advertisement.persistence.entities.Branch;
import com.radixile.bank.advertisement.persistence.repositories.BranchRepository;

@Service
public class BranchServiceImpl implements BranchService{

	@Autowired
	BranchRepository branchRepo;
	
	@Override
	public Branch findBranchByActivateCode(String activateCode) {
		Branch branch = branchRepo.findBranchByActivateCode(activateCode);
		return branch;
	}

	
	
}
