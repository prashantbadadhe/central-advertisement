package com.radixile.bank.advertisement.api.controller;

import java.io.File;
import java.net.MalformedURLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.radixile.bank.advertisement.api.beans.BranchActiveResponse;
import com.radixile.bank.advertisement.api.beans.BranchContentResponse;
import com.radixile.bank.advertisement.api.service.BranchContentService;
import com.radixile.bank.advertisement.api.service.BranchService;
import com.radixile.bank.advertisement.api.utils.APIConstants;
import com.radixile.bank.advertisement.api.utils.GenerateResponse;
import com.radixile.bank.advertisement.persistence.entities.Branch;
import com.radixile.bank.advertisement.persistence.entities.BranchContent;
import com.radixile.bank.advertisement.persistence.repositories.BranchContentRepository;
import com.radixile.bank.advertisement.persistence.repositories.BranchRepository;

@RestController
public class BankAdvertisementController {
	
	@Autowired
	BranchRepository branchRepo;
	
	@Autowired
	BranchService branchService;
	
	@Autowired
	BranchContentRepository branchContentRepo;
	
	@Autowired
	BranchContentService branchContentService;
	
	@RequestMapping("bank/branch/activate")
    public BranchActiveResponse activateBranch(@RequestParam("branchCode") String branchCode) {
		BranchActiveResponse response = new BranchActiveResponse();
		try {
			Branch branch = branchRepo.findBranchByActivateCode(branchCode);
			if(branch != null) {
				branch.setStatus(false);
				if(branch.isStatus()) {
					response.setStatus(APIConstants.errStatusCode);
					response.setMessage(APIConstants.branchAlreadyExist);
				}else {
					branch.setUpdatedAt(new Date());
					branch.setStatus(true);
					if(branchRepo.save(branch)  != null) {
						response.setStatus(APIConstants.successStatusCode);
						response.setBranchId(String.valueOf(branch.getId()));
						response.setMessage(APIConstants.branchSuccessfullyCreated);
					}else {
						response.setStatus(APIConstants.errStatusCode);
						response.setMessage(APIConstants.failBranchActivate);				
					}
				}			
			}else {
				response.setStatus(APIConstants.errStatusCode);
				response.setMessage(APIConstants.branchNotAvailable);
			}			
		}catch (Exception e) {
			response.setStatus(APIConstants.errStatusCode);
			response.setMessage(APIConstants.failBranchActivate);
			response.setExceptionMsg(e.getMessage());
		}
        return response;
    }
	
	
	@RequestMapping("bank/branch/content")
    public  ResponseEntity<BranchContentResponse> getBranchContent(@RequestParam("branchCode") String branchCode,@RequestParam("branchId") String branchId){
		BranchContentResponse response = new BranchContentResponse();
		try {
			HttpHeaders headers = new HttpHeaders();			
			headers.setContentType(MediaType.parseMediaType("application/json"));
			headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
			Branch branch = branchRepo.findBranchByActivateCode(branchCode);
			Long branchID = Long.valueOf(branchId);
			String lastUpdated="2018-01-01 23:01:01";			
			SimpleDateFormat formatter =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			if(branch.isStatus() && branchID == branch.getId()) {
				List<BranchContent> branchContentList = null;
				//Fetch all image names of branch
				branchContentList = branchContentRepo.findAllBranchContentByBranchIdAndContentStatusOrderByContentOrderAsc(branchID, Boolean.TRUE);

				//Fetch only updated images (Commented this code bcz change in implementation side on android)
				/*if(lastUpdated == null || lastUpdated.equals(APIConstants.EMPTY_STR)) {
					branchContentList = branchContentRepo.findAllBranchContentByBranchIdAndContentStatusOrderByContentOrderAsc(branchID, Boolean.TRUE);
				}else {
					Date lastUpdateDate =formatter.parse(lastUpdated);
					branchContentList = branchContentRepo.findAllBranchContentByBranchIdAndUpdatedAtGreaterThanEqual(branchID, lastUpdateDate);
				}*/

				if(branchContentList != null && branchContentList.size() > 0) {
					GenerateResponse fileOperations = new GenerateResponse();
					BranchContent brc=branchContentList.get(0);
					if(brc!=null && brc.getDescription()!=null){
						response.setDescription(" <body><marquee><h1><b><i><u>"+brc.getDescription()+"</marquee></body>");						
					}
						
					response = fileOperations.getJSONResponse(branchContentList, response, lastUpdated);
					if(response.getContentDetails() != null && response.getContentDetails().size() > 0) {
						response.setMessage(APIConstants.SUCCESS);
						response.setStatus(APIConstants.successStatusCode);  
						String lastUpdateDateString = formatter.format(new Date());
						response.setLastUpdated(lastUpdateDateString);
					}
					return new ResponseEntity<BranchContentResponse>(response, headers, HttpStatus.OK); 
				}else {
					String lastUpdateDateString = formatter.format(new Date());
 					response.setLastUpdated(lastUpdateDateString);
					response.setStatus(APIConstants.successStatusCode);
					response.setMessage(APIConstants.noContentAvailable);
					return new ResponseEntity<BranchContentResponse>(response, headers, HttpStatus.OK); 
				}
			}else {
				response.setStatus(APIConstants.errStatusCode);
				response.setMessage(APIConstants.branchNotAvailable);
			}		
		}catch(Exception e) {
			response.setStatus(APIConstants.errStatusCode);
			response.setMessage(APIConstants.unableToGetContent);
			response.setExceptionMsg(e.getMessage());
		}
	
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST); 
	}	
	
	private static String UPLOAD_DIR = System.getProperty("user.home") + "/Bank/images";
	
	@GetMapping("/bank/branch/load/files/{branch}/{filename:.+}")
	public ResponseEntity<Resource> getFile(@PathVariable String filename, @PathVariable String branch) throws MalformedURLException {
		File file = new File(UPLOAD_DIR + "/" + branch + "/" + filename);
		if (!file.exists()) {
			throw new RuntimeException("File not found");
		}
		Resource resource = new UrlResource(file.toURI());
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"").body(resource);
	}
}
