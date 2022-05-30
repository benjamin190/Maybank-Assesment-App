package com.assesment.maybank.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "TRANSACTIONS")
@EntityListeners(AuditingEntityListener.class)
public class TransactionModel {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    @Column(name = "TRX_ID")
    private long id;

    @Column(name = "ACCOUNT_NUMBER", nullable = false)
    private long accountNumber;

    @Column(name = "TRX_AMOUNT", nullable = false)
    private double trxAmount;

    @Column(name = "DESCRIPTION", nullable = false)
    private String description;

    @Column(name = "TRX_DATE", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date trxDate;

    @Column(name = "TRX_TIME", nullable = false)
    @Temporal(TemporalType.TIME)
    private Date trxTime;

    @Column(name = "CUSTOMER_ID", nullable = false)
    private String customerId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(long accountNumber) {
        this.accountNumber = accountNumber;
    }

    public double getTrxAmount() {
        return trxAmount;
    }

    public void setTrxAmount(double trxAmount) {
        this.trxAmount = trxAmount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getTrxDate() {
        return trxDate;
    }

    public void setTrxDate(Date trxDate) {
        this.trxDate = trxDate;
    }

    public Date getTrxTime() {
        return trxTime;
    }

    public void setTrxTime(Date trxTime) {
        this.trxTime = trxTime;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    @Override
    public String toString() {
        return "Transaction [id=" + id +
                ", accountNumber=" + accountNumber +
                ", trxAmount=" + trxAmount +
                ", description=" + description +
                ", trxDate=" + trxDate +
                ", trxTime=" + trxTime +
                ", customerId=" + customerId +
                "]";
    }
}
