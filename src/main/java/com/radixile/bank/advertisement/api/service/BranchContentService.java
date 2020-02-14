package com.radixile.bank.advertisement.api.service;

import java.util.Date;
import java.util.List;

import com.radixile.bank.advertisement.persistence.entities.BranchContent;

public interface BranchContentService {
	public List<BranchContent> findAllBranchContentByBranchIdAndContentStatus(Long branhcId, Boolean contentStatus);
	public List<BranchContent> findAllBranchContentByBranchIdAndUpdatedAtGreaterThanEqual(Long branhcId, Date updatedAt);
}
