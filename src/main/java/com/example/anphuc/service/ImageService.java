package com.example.anphuc.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {
    private final Path rootDefault = Paths.get("src/main/resources/static/site/dist/img/DefaultImg");

    public void save(MultipartFile file) {
        try {
            if (!Files.exists(rootDefault)) {
                Files.createDirectory(rootDefault);
            }
            Files.copy(file.getInputStream(), this.rootDefault.resolve(file.getOriginalFilename()),
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private final Path root = Paths.get("src/main/resources/static/site/dist/img");

    public void save(MultipartFile file, String path) {
        Path filePath = root.resolve(path);
        try {
            if (!Files.exists(filePath)) {
                Files.createDirectory(filePath);
            }
            Files.copy(file.getInputStream(), filePath.resolve(file.getOriginalFilename()),
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
