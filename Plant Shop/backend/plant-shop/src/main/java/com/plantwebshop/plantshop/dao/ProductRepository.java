package com.plantwebshop.plantshop.dao;

import com.plantwebshop.plantshop.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:3000/")
public interface ProductRepository extends JpaRepository<Product,Long> {


}
