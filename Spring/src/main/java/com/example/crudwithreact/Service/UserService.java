package com.example.crudwithreact.Service;

import com.example.crudwithreact.Exeption.UserNotFound;
import com.example.crudwithreact.Model.User;
import com.example.crudwithreact.Repository.UserRepo;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.apache.commons.io.FileUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.stylesheets.LinkStyle;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public List<User> GetAllUsers(){
        return userRepo.findAll();
    }

    public ResponseEntity<?> InsertUser(@Valid User user){
        userRepo.save(user);
        return ResponseEntity.ok(userRepo.findTopByOrderByIdDesc().getId());
    }

    public ResponseEntity<?> GetUserById(int id) throws IOException {
        Optional<User> user = userRepo.findById(id);
        if(user.isPresent()){
            Map<Object,Object> userdata=new HashMap<>();

            byte[] fileContent = FileUtils.readFileToByteArray(new File("./src/main/resources/images/"+user.get().getImage()));
            String encodedString = Base64.getEncoder().encodeToString(fileContent);
            userdata.put("image",encodedString);
            userdata.put("userdata",user.get());

            return new ResponseEntity<>(userdata, HttpStatus.OK);

        }else{
            throw  new UserNotFound("User Not Found ");
        }
    }

    public ResponseEntity<?> UpdateUser(User user, MultipartFile file){
        Optional<User> UserToUpdate=userRepo.findById(user.getId());
        if(UserToUpdate.isPresent()){
            User u = UserToUpdate.get();
            u.setUsername(user.getUsername());
            u.setEmail(user.getEmail());
            if(file==null){

            }else{
                String filename=new Date().getTime()+file.getOriginalFilename();
                String path="./src/main/resources/images/"+filename;
                try {
                    Files.copy(file.getInputStream() , Paths.get(path)) ;

                } catch (IOException e) {
                    return ResponseEntity.badRequest().body("file not upload") ;
                }
                try{
                    String deletepath="./src/main/resources/images/"+u.getImage();
                    Files.delete(Paths.get(deletepath));
                }catch (IOException e){
                    return ResponseEntity.badRequest().body(e);
                }
                u.setImage(filename);

            }

            userRepo.save(u);
            return ResponseEntity.ok("User Updated");
        }else{
            throw new UserNotFound("user Not found");
        }

    }

    public ResponseEntity<?> DeleteUser(int id) throws IOException {
        Optional<User> userTodelete=userRepo.findById(id);
        if(userTodelete.isPresent()){
            Files.delete(Paths.get("./src/main/resources/images/"+userTodelete.get().getImage()));
            userRepo.deleteById(userTodelete.get().getId());
            return ResponseEntity.ok("User was  Deleted");
        }else {
            throw new UserNotFound("User Not found");
        }


    }
}
