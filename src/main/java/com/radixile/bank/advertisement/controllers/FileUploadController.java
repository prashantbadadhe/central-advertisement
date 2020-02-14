package com.radixile.bank.advertisement.controllers;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.util.Arrays;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.radixile.bank.advertisement.api.beans.UpdateContentDetails;
import com.radixile.bank.advertisement.beans.UploadForm;
import com.radixile.bank.advertisement.persistence.entities.Branch;
import com.radixile.bank.advertisement.persistence.entities.BranchContent;
import com.radixile.bank.advertisement.persistence.repositories.BranchRepository;
import com.radixile.bank.advertisement.service.FileUploadService;

@RestController
public class FileUploadController {

	@Autowired
	FileUploadService fileUploadService;
	@Autowired
	BranchRepository repository;
	
	private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);
	private static String UPLOAD_DIR = System.getProperty("user.home") + "/Bank/images";

 	@RequestMapping(value = "/upload/mulitplefiles", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)

	public ResponseEntity<?> uploadFileMulti(@ModelAttribute UploadForm form) {
		logger.info("File upload started" + System.currentTimeMillis());
		String result = null;
		try {
			fileUploadService.saveFileDetails(form);
			result = this.saveUploadedFiles(form);
		}
		catch (IOException | ParseException e) {
			e.printStackTrace();
			return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		logger.info("File upload Ends" + System.currentTimeMillis());
		return new ResponseEntity<String>("Uploaded to: " + result, HttpStatus.OK);
	}

	private String saveUploadedFiles(UploadForm form) throws IOException {
		StringBuilder sb = new StringBuilder();
		if(!form.getBranch().equals("0")) {
			File uploadDir = new File(UPLOAD_DIR + "/" + form.getBranch());
	 		uploadDir.mkdirs();
 			String uploadFilePath = null;
 			String commonUploadFilePath  = null;
			for (MultipartFile file : form.getFiles()) {
				if (file.isEmpty()) {
					continue;
				}
				uploadFilePath = UPLOAD_DIR + "/" + form.getBranch() + "/" + file.getOriginalFilename();
				commonUploadFilePath = UPLOAD_DIR +"/" + file.getOriginalFilename();
				byte[] bytes = file.getBytes();
				Path path = Paths.get(uploadFilePath);
				Files.write(path, bytes);
				Path commonPath = Paths.get(commonUploadFilePath);
				Files.write(commonPath, bytes);
				sb.append(uploadFilePath).append(", ");
			}
		}else {
			
			List<Branch> branchs =   (List<Branch>) repository.findAll();
			String uploadFilePath = null;
			String commonUploadFilePath  = null;
			for (Branch branch : branchs) {
				File uploadDir = new File(UPLOAD_DIR + "/" + branch.getId());
		 		uploadDir.mkdirs();
		 		for (MultipartFile file : form.getFiles()) {
					if (file.isEmpty()) {
						continue;
					}
					uploadFilePath = UPLOAD_DIR + "/" + branch.getId() + "/" + file.getOriginalFilename();
					commonUploadFilePath = UPLOAD_DIR +"/" + file.getOriginalFilename();
					byte[] bytes = file.getBytes();
					Path path = Paths.get(uploadFilePath);
					Files.write(path, bytes);
					Path commonPath = Paths.get(commonUploadFilePath);
					Files.write(commonPath, bytes);
					sb.append(uploadFilePath).append(", ");
					sb.append(commonUploadFilePath).append(", ");
		 		}
			}
		}
		 
		return sb.toString();
	}

	@GetMapping("/load/getAllFiles/{branch}")
	public List<BranchContent> getListFiles(@PathVariable(value = "branch") String branch) {
		List<BranchContent> list  = fileUploadService.getContentDetailsForBranch(branch);
		if(branch.equals("0")){
 			for (BranchContent branchContent : list) {
			String content = branchContent.getContentName();
				branchContent.setContentName("/load/files/"+ content.trim());
			}
		}else {
 			for (BranchContent branchContent : list) {
			String content = branchContent.getContentName();
				branchContent.setContentName("/load/files/" + branch + "/" + content.trim());
			}
		}
 	 
		return list;
	}

	@GetMapping("/load/files/{branch}/{filename:.+}")
	public ResponseEntity<Resource> getFile(@PathVariable String filename, @PathVariable String branch) throws MalformedURLException {
		File file = new File(UPLOAD_DIR + "/" + branch + "/" + filename);
		if (!file.exists()) {
			throw new RuntimeException("File not found");
		}
		Resource resource = new UrlResource(file.toURI());
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"").body(resource);
	}
	@GetMapping("/load/files/{filename:.+}")
	public ResponseEntity<Resource> getFile(@PathVariable String filename) throws MalformedURLException {
		File file = new File(UPLOAD_DIR + "/"+ filename);
		if (!file.exists()) {
			throw new RuntimeException("File not found");
		}
		Resource resource = new UrlResource(file.toURI());
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"").body(resource);
	}
	@PutMapping("/update/contentDetails/{updateAll}")
	public ResponseEntity<?> updateContentDetails(@RequestBody String contentDetails, @PathVariable String updateAll) {
		logger.info("Update started" + System.currentTimeMillis());
 		try {
 			ObjectMapper objectMapper = new ObjectMapper();
 			UpdateContentDetails[] contentDetail =	objectMapper.readValue(contentDetails, UpdateContentDetails[].class);
 			List<UpdateContentDetails> contentDetailsList = Arrays.asList(contentDetail);
 			fileUploadService.updateContentDetails(contentDetailsList,updateAll);
 		}
		catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		logger.info("File upload Ends" + System.currentTimeMillis());
		return new ResponseEntity<String>("Update to: {'Message':'Success' }" , HttpStatus.OK);
	}
	
}