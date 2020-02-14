/*package com.radixile.bank.advertisement;

import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;
import java.util.Collections;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.radixile.bank.advertisement.api.beans.BranchContentResponse;

public class TestContentAPI {

	public static void main(String args[]) {
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		//Set BranchId and lastUpdated value as per DB
		headers.add("branchId", "1");
		headers.add("lastUpdated", "2018-01-01 00:00:00");
		
		HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

		//Update branch code as per DB in URL
		ResponseEntity<BranchContentResponse> response =  restTemplate.exchange("http://localhost:8888/bank/branch/content/89F3D3BFFDAB4B2", HttpMethod.GET, entity, BranchContentResponse.class);
		try {
			BranchContentResponse branchContent = response.getBody();
			System.out.println(branchContent.getContentDetails());
			ZipInputStream zipStream = new ZipInputStream(new ByteArrayInputStream((byte []) branchContent.getZipData()));
			ZipEntry entry = null;
			while ((entry = zipStream.getNextEntry()) != null) {

				String entryName = System.getProperty("user.home") + "/bank_api_response/"+entry.getName();

			    FileOutputStream out = new FileOutputStream(entryName);

			    byte[] byteBuff = new byte[4096];
			    int bytesRead = 0;
			    while ((bytesRead = zipStream.read(byteBuff)) != -1)
			    {
			        out.write(byteBuff, 0, bytesRead);
			    }

			    out.close();
			    zipStream.closeEntry();
			}
			zipStream.close(); 
		}catch(Exception e) {
			e.printStackTrace();
		}

    }
}*/