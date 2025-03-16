using System;
using api.Extensions;
using api.Models;
using AutoMapper;
using Company.ClassLibrary1;

namespace api.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, UserDto>()
        .ForMember(d => d.Age, o => o.MapFrom(s => s.DateOfBirth.CalculateAge()));
    }
}
