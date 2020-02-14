package com.radixile.bank.advertisement.persistence.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.persistence.Version;

@Entity
@Table(name = "users")
public class User implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Version
	private Long version;

	@Column(name = "username")
	private String username;

	@Column(name = "password")
	private String password;

	@Column(name = "email")
	private String email;

/*	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "cust_id")
	private Customer customer;
*/
	@OneToOne
	@JoinColumn(name = "role_id")
	private Role role;

	@OneToOne(cascade = CascadeType.ALL)
	private Employee employee;

	@Transient
	private String firstName;

	@Transient
	private String lastName;

	@Transient
	private String empNumber;

	@Transient
	private String bloodGroup;

	@Transient
	private String addressLine1;

	@Transient
	private String addressLine2;

	@Transient
	private String city;

	@Transient
	private String state;

	@Transient
	private String country;

	@Transient
	private String zipcode;

	@Transient
	private String phone1;

	@Transient
	private String phone2;

	@Transient
	private String email1;

	@Transient
	private String email2;

	@Temporal(TemporalType.DATE)
	@Transient
	private Date birthDate;

	@Transient
	private String lattitude;

	@Transient
	private String longitude;

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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

/*	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
*/
	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmpNumber() {
		return empNumber;
	}

	public void setEmpNumber(String empNumber) {
		this.empNumber = empNumber;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getAddressLine1() {
		return addressLine1;
	}

	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	public String getAddressLine2() {
		return addressLine2;
	}

	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public String getPhone1() {
		return phone1;
	}

	public void setPhone1(String phone1) {
		this.phone1 = phone1;
	}

	public String getPhone2() {
		return phone2;
	}

	public void setPhone2(String phone2) {
		this.phone2 = phone2;
	}

	public String getEmail1() {
		return email1;
	}

	public void setEmail1(String email1) {
		this.email1 = email1;
	}

	public String getEmail2() {
		return email2;
	}

	public void setEmail2(String email2) {
		this.email2 = email2;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getLattitude() {
		return lattitude;
	}

	public void setLattitude(String lattitude) {
		this.lattitude = lattitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public static User cloneFromEmployee(User user, Employee emp) {
		user.setFirstName(emp.getFirstName());
		user.setLastName(emp.getLastName());
		user.setAddressLine1(emp.getAddressLine1());
		user.setAddressLine2(emp.getAddressLine2());
		user.setBirthDate(emp.getBirthDate());
		user.setBloodGroup(emp.getBloodGroup());
		user.setCity(emp.getCity());
		user.setCountry(emp.getCountry());
		user.setEmail1(emp.getEmail1());
		user.setEmail2(emp.getEmail2());
		user.setEmpNumber(emp.getEmpNumber());
		user.setPhone1(emp.getPhone1());
		user.setPhone2(emp.getPhone2());
		user.setState(emp.getState());
		user.setZipcode(emp.getZipcode());
		return user;
	}

	/*public static User cloneFromCustomer(User user, Customer cust) {
		user.setFirstName(cust.getFirstName());
		user.setLastName(cust.getLastName());
		user.setAddressLine1(cust.getAddressLine1());
		user.setAddressLine2(cust.getAddressLine2());
		user.setCity(cust.getCity());
		user.setCountry(cust.getCountry());
		user.setEmail1(cust.getEmail1());
		user.setEmail2(cust.getEmail2());
		user.setPhone1(cust.getPhone1());
		user.setPhone2(cust.getPhone2());
		user.setState(cust.getState());
		user.setZipcode(cust.getZipcode());
		return user;
	}*/
}
