package com.radixile.bank.advertisement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
//import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableAutoConfiguration
@ComponentScan("com.radixile.bank.advertisement")
@EnableJpaRepositories
 @Import(RepositoryRestMvcConfiguration.class)
@EnableTransactionManagement
public class AppStart {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
    public static void main(String[] args) {
    	
    	System.setProperty("spring.devtools.restart.enabled", "false");
    	new AppStart().logger.info("Application Started");
         SpringApplication.run(AppStart.class, args);
    }
    

}
