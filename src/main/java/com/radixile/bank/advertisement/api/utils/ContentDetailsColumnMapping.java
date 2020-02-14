package com.radixile.bank.advertisement.api.utils;

import java.util.HashMap;
import java.util.Map;

public class ContentDetailsColumnMapping {

	public static Map<String, String> columnMapp = new HashMap<>();

	public static void addColumnMapping() {
		columnMapp.put("contentType", "content_type");
		columnMapp.put("contentName", "content_name");
		columnMapp.put("contentPath", "content_path");
		columnMapp.put("contentOrder", "content_order");
		columnMapp.put("contentStatus", "content_status");
		columnMapp.put("contentScheduleStart", "content_schedule_start");
		columnMapp.put("contentScheduleEnd", "content_schedule_end");
		columnMapp.put("duration", "duration");
		
		
	}
}
