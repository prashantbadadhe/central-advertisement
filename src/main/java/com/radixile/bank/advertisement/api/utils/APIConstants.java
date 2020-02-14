package com.radixile.bank.advertisement.api.utils;

public class APIConstants {

	public static final int errStatusCode = 1;
	public static final int successStatusCode = 0;
	public static final String branchAlreadyExist = "Branch is already Active";
	public static final String branchSuccessfullyCreated = "Branch activated successfully";
	public static final String failBranchActivate = "Unable to activate Branch";
	public static final String branchNotAvailable = "Branch is not available";
	public static final String unableToGetContent = "Unable to get content";
	public static final String EMPTY_STR = "";
	public static final String SUCCESS = "Success";
	public static final String INSERT_START = "INSERT INTO branch_content (id, branch_id, content_name, content_order, content_type, duration) values(";
	public static final String INSERT_END = ");";
	public static final String SINGEL_QOUTE = "'";
	public static final String COMMA = ",";
	public static final String IMAGE = "image";
	public static final String FILE_ERROR = "Unable to fetch images from repository";
	public static final String UPDATE_START = "UPDATE branch_content SET";
	public static final String CONTENT_NAME = "content_name";
	public static final String ID = "id";
	public static final String BRANCH_ID = "branch_id";
	public static final String CONTENT_ORDER = "content_order";
	public static final String CONTENT_TYPE = "content_type";
	public static final String DURATION = "duration";
	public static final String WHERE = "WHERE";
	public static final String EQUAL = "=";
	public static final String DELETE_START = "DELETE FROM branch_content";
	public static final String SPACE = " ";
	public static final String AND = "AND";
	public static final String SEMI_COLON = ";";
	public static final String noContentAvailable = "No Content Available";
}
