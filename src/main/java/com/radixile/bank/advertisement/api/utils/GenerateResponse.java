package com.radixile.bank.advertisement.api.utils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.commons.io.IOUtils;

import com.radixile.bank.advertisement.api.beans.BranchContentResponse;
import com.radixile.bank.advertisement.persistence.entities.BranchContent;

public class GenerateResponse {

	public BranchContentResponse getJSONResponse(List<BranchContent> branchContentList, BranchContentResponse response, String lastUpdated) {

		byte [] byteArray = null;
		boolean isFirstTimeRequest = false;
		boolean isImageSend = false;
		List<String> images=new ArrayList<>();
		if(lastUpdated == null || lastUpdated.equals(APIConstants.EMPTY_STR)) {
			isFirstTimeRequest = true;
		}
		try {
			ByteArrayOutputStream byteOutputStream = new ByteArrayOutputStream();
			ZipOutputStream zos = new ZipOutputStream(byteOutputStream);
			List<String> contentDetails = new ArrayList<String>();
			for (BranchContent branchContent : branchContentList) {
				images.add("load/files/"+branchContent.getBranchId()+"/"+branchContent.getContentName());
				//isImageSend = getImages(isFirstTimeRequest, isImageSend, images, contentDetails, branchContent);
				//byteArray = byteOutputStream.toByteArray();
				}
			response.setImages(images);
			response.setZipData(byteArray);
			response.setContentDetails(contentDetails);
			zos.close();
		} catch (FileNotFoundException e) {
			response.setStatus(APIConstants.errStatusCode);
			response.setMessage(APIConstants.FILE_ERROR);
			response.setExceptionMsg(e.getMessage());
		} catch (IOException e) {
			response.setStatus(APIConstants.errStatusCode);
			response.setMessage(APIConstants.FILE_ERROR);
			response.setExceptionMsg(e.getMessage());
		}catch (Exception e) {
			response.setStatus(APIConstants.errStatusCode);
			response.setMessage(APIConstants.FILE_ERROR);
			response.setExceptionMsg(e.getMessage());
		}
		return response;
	}

	private boolean getImages(boolean isFirstTimeRequest, boolean isImageSend, List<String> images,
			List<String> contentDetails, BranchContent branchContent) {
		if(isFirstTimeRequest || (branchContent.getCreatedAt().equals(branchContent.getUpdatedAt()) && branchContent.getContentStatus())) {
			isImageSend = true;
			contentDetails.add(generateInsertQuery(branchContent));
		}else if(branchContent.getUpdatedAt().after(branchContent.getCreatedAt()) && branchContent.getContentStatus()){
			if(branchContent.getUpdateType().equalsIgnoreCase(APIConstants.IMAGE)){
				isImageSend = true;
			}else {
				isImageSend = false;
			}
			contentDetails.add(generateUpdateQuery(branchContent));
		}else if(branchContent.getUpdatedAt().after(branchContent.getCreatedAt()) && !branchContent.getContentStatus()){
			isImageSend = false;
			contentDetails.add(generateDeleteQuery(branchContent));
		}
		if(isImageSend) {
			images.add("/load/files/"+branchContent.getBranchId()+"/"+branchContent.getContentName());
			//getImageStream(zos, branchContent);
		}
		return isImageSend;
	}

	private void getImageStream(ZipOutputStream zos, BranchContent branchContent)
			throws FileNotFoundException, IOException {
		File file = new File(branchContent.getContentPath());
		if (!file.isDirectory()) {
			FileInputStream fis = new FileInputStream(file);

			ZipEntry zipEntry = new ZipEntry(branchContent.getContentName());
			zos.putNextEntry(zipEntry);

			byte[] bytes = new byte[1024];
			int length;
			while ((length = fis.read(bytes)) >= 0) {
				zos.write(bytes, 0, length);
			}
			
			IOUtils.copy(fis, zos);
			zos.closeEntry();
			fis.close();
		}
	}
	
	private String generateDeleteQuery(BranchContent branchContent) {
		StringBuilder sb = new StringBuilder();
		sb.append(APIConstants.DELETE_START);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.WHERE);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.ID);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.EQUAL);
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(branchContent.getId());
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.AND);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.BRANCH_ID);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.EQUAL);
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(branchContent.getBranchId());
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(APIConstants.SEMI_COLON);
		return sb.toString();
	}

	private String generateUpdateQuery(BranchContent branchContent) {
		StringBuilder sb = new StringBuilder();
		sb.append(APIConstants.UPDATE_START);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.CONTENT_NAME);
		sb.append(APIConstants.EQUAL);
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(branchContent.getContentName());
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(APIConstants.COMMA);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.CONTENT_ORDER);
		sb.append(APIConstants.EQUAL);
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(branchContent.getContentOrder());
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(APIConstants.COMMA);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.CONTENT_TYPE);
		sb.append(APIConstants.EQUAL);
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(branchContent.getContentType());
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(APIConstants.COMMA);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.DURATION);
		sb.append(APIConstants.EQUAL);
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(branchContent.getDuration());
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.WHERE);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.ID);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.EQUAL);
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(branchContent.getId());
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.AND);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.BRANCH_ID);
		sb.append(APIConstants.SPACE);
		sb.append(APIConstants.EQUAL);
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(branchContent.getBranchId());
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(APIConstants.SEMI_COLON);
		return sb.toString();
	}

	private String generateInsertQuery(BranchContent branchContent) {
		StringBuilder sb = new StringBuilder();
		sb.append(APIConstants.INSERT_START);
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(branchContent.getId());
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(APIConstants.COMMA);
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(branchContent.getBranchId());
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(APIConstants.COMMA);
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(branchContent.getContentName());
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(APIConstants.COMMA);
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(branchContent.getContentOrder());
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(APIConstants.COMMA);
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(branchContent.getContentType());
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(APIConstants.COMMA);
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(branchContent.getDuration());
		sb.append(APIConstants.SINGEL_QOUTE);
		sb.append(APIConstants.INSERT_END);
		return sb.toString();
	}
}