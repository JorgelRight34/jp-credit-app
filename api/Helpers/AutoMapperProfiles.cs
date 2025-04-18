using System;
using api.DTOs;
using api.DTOs.AdjustmentNote;
using api.DTOs.Collateral;
using api.DTOs.FileUpload;
using api.DTOs.Loan;
using api.DTOs.Transaction;
using api.DTOs.User;
using api.Extensions;
using api.Models;
using AutoMapper;

namespace api.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        // AppUser
        CreateMap<AppUser, UserDto>()
        .ForMember(d => d.Age, o => o.MapFrom(s => s.DateOfBirth.CalculateAge()))
        .ForMember(d => d.Id, o => o.MapFrom(s => s.Id));
        CreateMap<RegisterDto, AppUser>();
        CreateMap<UpdateUserDto, AppUser>();

        // Collaterals
        CreateMap<CreateCollateralDto, Collateral>();
        CreateMap<Collateral, CollateralDto>();
        CreateMap<UpdateCollateralDto, Collateral>();

        // File uploads
        CreateMap<FileUpload, FileUploadDto>();

        // Transactions
        CreateMap<CreateTransactionDto, Transaction>();
        CreateMap<Transaction, TransactionDto>()
        .ForMember(d => d.Payer, o => o.MapFrom(s => s.Payer));

        // Loans
        CreateMap<CreateLoanDto, Loan>();
        CreateMap<Loan, LoanDto>()
        .ForMember(d => d.Client, o => o.MapFrom(s => s.Client));
        CreateMap<UpdateLoanDto, Loan>();

        // Adjusment notes
        CreateMap<CreateAdjustmentNoteDto, AdjustmentNote>();
        CreateMap<AdjustmentNote, AdjustmentNoteDto>();
        CreateMap<UpdateAdjustmentNoteDto, AdjustmentNote>();

        // Photo
        CreateMap<Photo, PhotoDto>()
        .ForMember(
            d => d.PublicId, o => o.MapFrom(s => s.PublicId != null ? s.PublicId.Replace("jp-credit-app/", "") : "")
        );
    }
}
