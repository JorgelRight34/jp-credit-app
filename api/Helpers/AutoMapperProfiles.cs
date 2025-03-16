using System;
using api.DTOs.Collateral;
using api.DTOs.LoanOfficer;
using api.DTOs.User;
using api.Extensions;
using api.Models;
using AutoMapper;

namespace api.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, UserDto>()
        .ForMember(d => d.Age, o => o.MapFrom(s => s.DateOfBirth.CalculateAge()))
        .ForMember(d => d.Id, o => o.MapFrom(s => s.Id));

        CreateMap<RegisterDto, AppUser>();

        CreateMap<CreateCollateralDto, Collateral>()
        .ForMember(d => d.AppUserId, o => o.MapFrom(s => s.ClientId));

        CreateMap<Collateral, CollateralDto>()
        .ForMember(d => d.ClientId, o => o.MapFrom(s => s.AppUserId));

        CreateMap<CreateLoanOfficerDto, LoanOfficer>();
        CreateMap<LoanOfficer, LoanOfficerDto>();
    }
}
