package com.radixile.bank.advertisement.api.beans;

import java.util.List;

public class BranchContentResponse {

	private int status;
	private String message;
	private String exceptionMsg;
	private String lastUpdated;
	private List<String> contentDetails;
	private byte[] zipData;
	private List<String> images;
	private String description;

	public String getExceptionMsg() {
		return exceptionMsg;
	}

	public void setExceptionMsg(String exceptionMsg) {
		this.exceptionMsg = exceptionMsg;
	}

	public String getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(String lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	public List<String> getContentDetails() {
		return contentDetails;
	}

	public void setContentDetails(List<String> contentDetails) {
		this.contentDetails = contentDetails;
	}

	public byte[] getZipData() {
		return zipData;
	}

	public void setZipData(byte[] zipData) {
		this.zipData = zipData;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
