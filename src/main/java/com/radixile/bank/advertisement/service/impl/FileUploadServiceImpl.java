package com.radixile.bank.advertisement.service.impl;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.radixile.bank.advertisement.api.beans.UpdateContentDetails;
import com.radixile.bank.advertisement.api.utils.ContentDetailsColumnMapping;
import com.radixile.bank.advertisement.beans.UploadForm;
import com.radixile.bank.advertisement.persistence.entities.Branch;
import com.radixile.bank.advertisement.persistence.entities.BranchContent;
import com.radixile.bank.advertisement.persistence.repositories.BranchContentRepository;
import com.radixile.bank.advertisement.persistence.repositories.BranchRepository;
import com.radixile.bank.advertisement.service.FileUploadService;

@Service
public class FileUploadServiceImpl implements FileUploadService {
	private static String UPLOAD_DIR = System.getProperty("user.home") + "/Bank/images";

	@Autowired
	BranchContentRepository detailsRepository;

	@Autowired
	BranchContentRepository contentRepository;

	@Autowired
	EntityManager entityManager;

	@Autowired
	BranchRepository branchRepository;

	@Override
	public void saveFileDetails(UploadForm form) throws ParseException {
		BranchContent content = null;
		List<BranchContent> contentDetails = new ArrayList<>();
		LocalDateTime now = LocalDateTime.now();
		Timestamp time = Timestamp.valueOf(now);
		// Principal user = (Principal)
		// SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		DateFormat format = new SimpleDateFormat("dd-MM-yyyy", Locale.ENGLISH);
		Long defaultOrder = detailsRepository.getLastContestOrder(Long.parseLong(form.getBranch()));

		if (defaultOrder == null) {
			defaultOrder = 1l;
		}
		List<Branch> branches = (List<Branch>) branchRepository.findAll();

		for (MultipartFile file : form.getFiles()) {
			defaultOrder = defaultOrder + 1;
			if (form.getBranch().equals("0")) {
				for (Branch branch : branches) {
					createPersistenceContent(form, contentDetails, time, format, defaultOrder, file, branch.getId());

				}
			} else {
				createPersistenceContent(form, contentDetails, time, format, defaultOrder, file,
						Long.parseLong(form.getBranch()));
			}
		}

		detailsRepository.save(contentDetails);

	}

	private Long createPersistenceContent(UploadForm form, List<BranchContent> contentDetails, Timestamp time,
			DateFormat format, Long defaultOrder, MultipartFile file, Long branchId) throws ParseException {
		BranchContent content;
		content = new BranchContent();
		content.setContentName(file.getOriginalFilename());
		content.setContentStatus(true);
		// content.setContentPath(UPLOAD_DIR + "/" + form.getBranch() + "/" +
		// file.getOriginalFilename());
		content.setContentPath(UPLOAD_DIR + "/" + file.getOriginalFilename());
		content.setCreatedAt(time);
		content.setCreatedBy("SYSTEM");
		content.setUpdatedAt(time);
		content.setUpdatedBy("SYSTEM");
		content.setContentScheduleStart(format.parse(form.getStartDate()));
		content.setContentScheduleEnd(format.parse(form.getEndDate()));
		content.setContentType(file.getContentType());
		content.setBranchId(branchId);
		content.setContentOrder(defaultOrder);
		content.setDuration(Integer.parseInt(form.getDuration()));
		content.setDescription(form.getDescription());
		contentDetails.add(content);
		return defaultOrder;
	}

	@Override
	public List<BranchContent> getContentDetailsForBranch(String branch) {
		List<BranchContent> branchContents = null;
		if (branch.equals("0")) {
			branchContents = (List<BranchContent>) contentRepository.findAll();
		} else {
			branchContents = contentRepository.findAllBranchContentByBranchIdAndContentStatusOrderByContentOrderAsc(Long.parseLong(branch),true);

		}
		return branchContents;
	}

	@Override
	@Transactional
	public void updateContentDetails(List<UpdateContentDetails> contentDetails, String updateAll) {
		ContentDetailsColumnMapping.addColumnMapping();
		entityManager.joinTransaction();
		Set<String> uniqueIds = new HashSet<>();
		for (UpdateContentDetails content : contentDetails) {
			uniqueIds.add(content.getId());
		}
		for (String id : uniqueIds) {
			createDynamicUpdateQuery(contentDetails, id, updateAll);
		}
	}

	private void createDynamicUpdateQuery(List<UpdateContentDetails> contentDetails, String id, String updateAll) {
		StringBuilder updateQuery = new StringBuilder("UPDATE BRANCH_CONTENT SET ");
		String and = " ";
		String contentName = null;
		for (UpdateContentDetails content : contentDetails) {
			if (id.equals(content.getId())) {
				String mappedColumn = ContentDetailsColumnMapping.columnMapp.get(content.getColumn());
				if (!updateQuery.toString().contains(mappedColumn)) {
					updateQuery.append(and).append(mappedColumn)
							.append("=");

					if (content.getColumn().equals("contentOrder") || content.getColumn().equals("contentStatus")
							|| content.getColumn().equals("duration")) {
						updateQuery.append(content.getData());
					} else {
						updateQuery.append("'" + content.getData() + "'");
					}
					and = " , ";
				}
			}
			contentName = content.getContentName();
		}
		updateQuery.append(" , updated_at  = current_date ,  updated_by = 'SYSTEM'");
		if (updateAll.equals("false")) {
			updateQuery.append(" WHERE ID = " + Long.parseLong(id));
		}else {
			updateQuery.append(" WHERE content_name = '" + contentName+"'");
		}

		Query query = entityManager.createNativeQuery(updateQuery.toString());
		query.executeUpdate();
	}

}
