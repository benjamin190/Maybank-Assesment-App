package com.assesment.maybank.controller;

import com.assesment.maybank.model.TransactionModel;
import com.assesment.maybank.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = { "x-auth-token", "x-requested-with", "x-xsrf-token" })
public class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/all")
    public List<TransactionModel> getAllTransactions() {
        return transactionRepository.findAll();
    }

}
