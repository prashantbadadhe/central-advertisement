package com.radixile.bank.advertisement.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.radixile.bank.advertisement.persistence.entities.Role;
import com.radixile.bank.advertisement.persistence.repositories.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Transactional(readOnly = true)
	@Override
	public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {

		com.radixile.bank.advertisement.persistence.entities.User user = userRepository.findByUsername(username);
		if (user != null) {
			List<GrantedAuthority> authorities = buildUserAuthority(user.getRole());
			return buildUserForAuthentication(user, authorities);
		}
		throw new UsernameNotFoundException("User name or password is wrong !!!");

	}

	private User buildUserForAuthentication(com.radixile.bank.advertisement.persistence.entities.User user,
			List<GrantedAuthority> authorities) {
		return new User(user.getUsername(), user.getPassword(), authorities);
	}

	private List<GrantedAuthority> buildUserAuthority(Role role) {
		Set<Role> userRoles = new HashSet<>();
		userRoles.add(role);
		Set<GrantedAuthority> setAuths = new HashSet<>();
		// Build user's authorities
		setAuths.addAll(userRoles.stream().map(userRole -> new SimpleGrantedAuthority(userRole.getName()))
				.collect(Collectors.toList()));
		return new ArrayList<>(setAuths);
	}
}