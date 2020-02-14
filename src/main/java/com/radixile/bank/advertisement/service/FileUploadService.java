package com.radixile.bank.advertisement.service;

import java.text.ParseException;
import java.util.List;

import com.radixile.bank.advertisement.api.beans.UpdateContentDetails;
import com.radixile.bank.advertisement.beans.UploadForm;
import com.radixile.bank.advertisement.persistence.entities.BranchContent;


public interface FileUploadService {

	public void saveFileDetails(UploadForm form) throws ParseException;
	public List<BranchContent> getContentDetailsForBranch(String branch) ;
	public void updateContentDetails(List<UpdateContentDetails> contentDetails, String updateAll) throws ParseException;
}
