package com.example.rentease_backend.controller;

import com.example.rentease_backend.entity.Property;
import com.example.rentease_backend.repository.PropertyRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

    private final PropertyRepository propertyRepository;

    public PropertyController(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    @PostMapping
    public Property createProperty(@RequestBody Property property) {
        return propertyRepository.save(property);
    }

    @GetMapping("/{id}")
    public Property getPropertyById(@PathVariable Long id) {
        return propertyRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Property updateProperty(@PathVariable Long id, @RequestBody Property propertyDetails) {
        return propertyRepository.findById(id).map(property -> {
            property.setTitle(propertyDetails.getTitle());
            property.setDescription(propertyDetails.getDescription());
            property.setAddress(propertyDetails.getAddress());
            property.setCity(propertyDetails.getCity());
            property.setRent(propertyDetails.getRent());
            // naye fields bhi update karo:
            property.setPropertyType(propertyDetails.getPropertyType());
            property.setBhk(propertyDetails.getBhk());
            property.setAreaSqFt(propertyDetails.getAreaSqFt());
            property.setFurnished(propertyDetails.getFurnished());
            return propertyRepository.save(property);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteProperty(@PathVariable Long id) {
        propertyRepository.deleteById(id);
    }

    // GET /api/properties/city/Indore
    @GetMapping("/city/{city}")
    public List<Property> getByCity(@PathVariable String city) {
        return propertyRepository.findByCity(city);
    }

    // GET /api/properties/max-rent/15000
    @GetMapping("/max-rent/{rent}")
    public List<Property> getByMaxRent(@PathVariable Double rent) {
        return propertyRepository.findByRentLessThanEqual(rent);
    }

    // GET /api/properties/search?city=Indore&type=FLAT
    @GetMapping("/search")
    public List<Property> searchByCityAndType(@RequestParam String city,
                                              @RequestParam String type) {
        return propertyRepository.findByCityAndPropertyType(city, type);
    }
}
