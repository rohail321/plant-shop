package com.plantwebshop.plantshop.config;

import com.plantwebshop.plantshop.model.Product;
import com.plantwebshop.plantshop.model.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class RestAPIConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
        HttpMethod[] theUnsupportedMethods={HttpMethod.POST,HttpMethod.PUT,HttpMethod.DELETE};

        config.getExposureConfiguration().forDomainType(Product.class).withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedMethods)).withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedMethods));

        config.getExposureConfiguration().forDomainType(ProductCategory.class).withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedMethods)).withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedMethods));


    }
}
