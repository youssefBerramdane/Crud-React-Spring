package com.example.crudwithreact.Controller;

import com.example.crudwithreact.Model.User;
import com.example.crudwithreact.Service.UserService;
import jakarta.validation.constraints.Min;
import org.hibernate.validator.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")

@Validated
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/users")
    public List<User> GetAllUsers(){
        return userService.GetAllUsers();
    }

    @PostMapping("/insert")
    public ResponseEntity<?> InsertUser(@RequestParam("username")  String username, @RequestParam("email")  String email, @RequestParam("file") MultipartFile file){

        String filename=new Date().getTime()+file.getOriginalFilename();
        String path="./src/main/resources/images/"+filename;
        try {
            
            Files.copy(file.getInputStream() , Paths.get(path)) ;
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("file not upload") ;
        }

        return userService.InsertUser(new User(username,email,filename));

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> UpdateUser(@PathVariable int id,@RequestParam("username") String username, @RequestParam("email") String email, @RequestParam(name = "file" ,required=false) MultipartFile file){
        User user=new User();
        user.setId(id);
        user.setEmail(email);
        user.setUsername(username);
        return userService.UpdateUser(user,file);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> GetUserByid(@PathVariable int id) throws IOException {
        return userService.GetUserById(id);
    }

    @DeleteMapping("/deleteuser/{id}")
    public ResponseEntity<?> DeleteUser(@PathVariable int id) throws IOException {
        return userService.DeleteUser(id);
    }

}
