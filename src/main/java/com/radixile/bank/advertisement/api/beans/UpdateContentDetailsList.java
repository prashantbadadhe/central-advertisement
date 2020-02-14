package com.radixile.bank.advertisement.api.beans;

import java.util.ArrayList;
import java.util.List;

public class UpdateContentDetailsList {

	List<UpdateContentDetails> contentDetails = new ArrayList<>();

	public List<UpdateContentDetails> getContentDetails() {
		return contentDetails;
	}

	public void setContentDetails(List<UpdateContentDetails> contentDetails) {
		this.contentDetails = contentDetails;
	}
	
	
}
