package com.radixile.bank.advertisement.persistence.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Version;
import javax.validation.constraints.Size;

@Entity
@Table(name = "branch_content")
public class BranchContent {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Version
	private Long version;

	@Column(name = "branch_id")
	private Long branchId;

	@Column(name = "bank_id")
	private Long bankId;

	@Column(name = "content_type")
	private String contentType;

	@Column(name = "content_name")
	private String contentName;

	@Column(name = "content_path")
	@Size(max = 500)
	private String contentPath;

	@Column(name = "content_order")
	private Long contentOrder;

	@Column(name = "content_status")
	private Boolean contentStatus;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at")
	private Date createdAt;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	private Date updatedAt;

	@Column(name = "createdBy")
	private String createdBy;

	@Column(name = "updatedBy")
	private String updatedBy;

	@Temporal(TemporalType.DATE)
	@Column(name = "content_schedule_start")
	private Date contentScheduleStart;

	@Temporal(TemporalType.DATE)
	@Column(name = "content_schedule_end")
	private Date contentScheduleEnd;

	@Column(name = "duration")
	private Integer duration;

	@Column(name = "updateType")
	private String updateType;

	@Column(name = "description")
	private String description;

	public String getUpdateType() {
		return updateType;
	}

	public void setUpdateType(String updateType) {
		this.updateType = updateType;
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getVersion() {
		return version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}

	public Long getBranchId() {
		return branchId;
	}

	public void setBranchId(Long branchId) {
		this.branchId = branchId;
	}

	public Long getBankId() {
		return bankId;
	}

	public void setBankId(Long bankId) {
		this.bankId = bankId;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public String getContentName() {
		return contentName;
	}

	public void setContentName(String contentName) {
		this.contentName = contentName;
	}

	public String getContentPath() {
		return contentPath;
	}

	public void setContentPath(String contentPath) {
		this.contentPath = contentPath;
	}

	public Long getContentOrder() {
		return contentOrder;
	}

	public void setContentOrder(Long contentOrder) {
		this.contentOrder = contentOrder;
	}

	public Boolean getContentStatus() {
		return contentStatus;
	}

	public void setContentStatus(Boolean contentStatus) {
		this.contentStatus = contentStatus;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getContentScheduleStart() {
		return contentScheduleStart;
	}

	public void setContentScheduleStart(Date contentScheduleStart) {
		this.contentScheduleStart = contentScheduleStart;
	}

	public Date getContentScheduleEnd() {
		return contentScheduleEnd;
	}

	public void setContentScheduleEnd(Date contentScheduleEnd) {
		this.contentScheduleEnd = contentScheduleEnd;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}