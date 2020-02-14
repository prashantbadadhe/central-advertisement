package com.radixile.bank.advertisement;
/*package com.radixile.inventory;

import java.util.ArrayList;
import java.util.List;

import com.radixile.inventory.persistence.entities.Branch;
import com.radixile.inventory.persistence.entities.Company;
import com.radixile.inventory.persistence.entities.Department;
import com.radixile.inventory.persistence.entities.Employee;

public class TestData {

	public void getCompanyData() {

		Company company = new Company();
		company.setName("Radixile Elevators");
		company.setAddressLine1("Sr. No. 36, Bharati Vidyapith");
		company.setCity("Pune");
		company.setState("Maharashtra");
		company.setCountry("India");
		company.setZipcode("411046");
		company.setEmail1("info@radixile.com");
		company.setEmail2("info1@radixile.com");
		company.setPhone1("9623788788");
		company.setPhone2("9623788788");

		List<Branch> branches = new ArrayList<Branch>();
		Branch br;
		for (int i = 1; i <= 3; i++) {
			br = new Branch();
			br.setName("Branch" + i);
			br.setAddressLine1("Branch Address" + i);
			br.setCity("Pune");
			br.setState("Maharashtra");
			br.setCountry("India");
			br.setZipcode("411046");
			br.setPhone1("9623788788");
			br.setPhone2("9623788788");
			br.setCompany(company);
			branches.add(br);
		}
		List<Department> departments = new ArrayList<Department>();
		Department dept;
		for (int i = 1; i <= 3; i++) {
			dept = new Department();
			dept.setName("Dept" + i);
			dept.setType("Dept Type" + i);
			dept.setBranch(branches.get(0));
			departments.add(dept);
		}
		for (int i = 1; i <= 3; i++) {
			dept = new Department();
			dept.setName("Dept" + i);
			dept.setType("Dept Type" + i);
			dept.setBranch(branches.get(1));
			departments.add(dept);
		}
		for (int i = 1; i <= 3; i++) {
			dept = new Department();
			dept.setName("Dept" + i);
			dept.setType("Dept Type" + i);
			dept.setBranch(branches.get(2));
			departments.add(dept);
		}

		List<Employee> employees = new ArrayList<Employee>();
		Employee emp;

		for (int i = 1; i <= 10; i++) {
			emp = new Employee();
			emp.setFirstName("Emp firstName" + i);
			emp.setLastName("Emp lastName" + i);
			emp.setAddressLine1("Emp Address" + i);
			emp.setBloodGroup("AB+");
			emp.setCity("Pune");
			emp.setState("Maharashtra");
			emp.setCountry("India");
			emp.setZipcode("411043");
			emp.setEmail1("emp" + i + "@radixile.com");
			emp.setEmpNumber("emp" + i);
			emp.setPhone1("1234567890");
			emp.setDepartment(departments.get(i-1));
			employees.add(emp);
		}

	}
}
*/