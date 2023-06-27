package com.example.anphuc.serviceIml;

import com.example.anphuc.exception.EntityNotFoundException;
import com.example.anphuc.model.Category;
import com.example.anphuc.model.Product;
import com.example.anphuc.payload.request.ProductQueryParam;
import com.example.anphuc.payload.response.APIResponse;
import com.example.anphuc.repository.CategoryRepository;
import com.example.anphuc.repository.ProductRepository;
import com.example.anphuc.service.ProductService;
import com.example.anphuc.specification.ProductSpecification;
import com.example.anphuc.utils.ImageService;
import com.example.anphuc.utils.PageUtils;
import com.example.anphuc.utils.RequestParamsUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ImageService imageService;

    @Autowired
    RequestParamsUtils requestParamsUtils;

    @Autowired
    ProductSpecification productSpecification;

    @Override
    public APIResponse delete(Integer id) {
        Product product = productRepository.findById(id).orElseThrow(() -> {
            throw new EntityNotFoundException("Invalid Product Id!");
        });
        productRepository.delete(product);
        return new APIResponse("Delete Successful");
    }

    @Override
    public APIResponse save(String name, Integer price, MultipartFile file, Integer categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> {
            throw new EntityNotFoundException("Invalid Category Id!");
        });
        Product product = new Product(name, file.getOriginalFilename(), price, category);
        imageService.save(file, "product");
        return new APIResponse(productRepository.save(product));
    }

    @Override
    public APIResponse update(Integer id, String name, Integer price, MultipartFile file, Integer categoryId) {
        Product product = productRepository.findById(id).orElseThrow(() -> {
            throw new EntityNotFoundException("Invalid Product Id!");
        });
        product.setName(name);
        product.setPrice(price);
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> {
            throw new EntityNotFoundException("Invalid Category Id!");
        });
        product.setCategory(category);
        if (file != null && !file.isEmpty()) {
            product.setImage(file.getOriginalFilename());
            imageService.save(file, "product");
        } else {
            throw new EntityNotFoundException("Invalid File!");
        }
        productRepository.saveAndFlush(product);
        return new APIResponse(productRepository.findAll());
    }

    @Override
    public APIResponse filterProduct(ProductQueryParam productQueryParam) {
        Specification<Product> spec = productSpecification.getProductSpecification(productQueryParam);
        Pageable pageable = requestParamsUtils.getPageable(productQueryParam);
        Page<Product> response = productRepository.findAll(spec, pageable);
        return new APIResponse(PageUtils.toPageResponse(response));
    }
}
