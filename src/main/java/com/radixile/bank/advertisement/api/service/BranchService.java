package com.radixile.bank.advertisement.api.service;

import com.radixile.bank.advertisement.persistence.entities.Branch;

public interface BranchService {
	public Branch findBranchByActivateCode(String activateCode);
}
